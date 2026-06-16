import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { mockIngredients, mockCategories, mockUsageLogs, applyMockLogs, applyMockStockUpdate } from '../lib/mockData'

const API_URL      = import.meta.env.VITE_API_URL
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL

const MODE = API_URL ? 'api' : SUPABASE_URL ? 'supabase' : 'demo'

async function apiFetch(path, options = {}) {
  const res = await fetch(API_URL + path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`)
  return json
}

export function useIngredients() {
  const [ingredients, setIngredients] = useState([])
  const [categories,  setCategories]  = useState([])
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState(null)

  const fetchIngredients = useCallback(async () => {
    if (MODE === 'demo') {
      setIngredients([...mockIngredients])
      setCategories([...mockCategories])
      setLoading(false)
      return
    }

    if (MODE === 'api') {
      try {
        setLoading(true)
        const [ing, cats] = await Promise.all([
          apiFetch('/ingredients.php'),
          apiFetch('/categories.php'),
        ])
        setIngredients(ing)
        setCategories(cats)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
      return
    }

    // supabase
    try {
      setLoading(true)
      const [{ data: ing, error: e1 }, { data: cats }] = await Promise.all([
        supabase.from('ingredients').select('*').order('category').order('name'),
        supabase.from('categories').select('name').order('name'),
      ])
      if (e1) throw e1
      setIngredients(ing)
      setCategories((cats ?? []).map(c => c.name))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchIngredients() }, [fetchIngredients])

  const submitUsageLogs = useCallback(async (logs, staffName) => {
    if (MODE === 'demo') {
      applyMockLogs(logs.map(({ ingredient_id, qty_deducted, location }) => ({
        ingredient_id, qty_deducted, staff_name: staffName, location,
      })))
      setIngredients([...mockIngredients])
      return { success: true }
    }

    if (MODE === 'api') {
      try {
        await apiFetch('/usage_logs.php', {
          method: 'POST',
          body: JSON.stringify({ logs, staff_name: staffName }),
        })
        await fetchIngredients()
        return { success: true }
      } catch (err) {
        return { success: false, error: err.message }
      }
    }

    try {
      const { error } = await supabase.from('usage_logs').insert(
        logs.map(({ ingredient_id, qty_deducted, location }) => ({
          ingredient_id, qty_deducted, staff_name: staffName, location,
        }))
      )
      if (error) throw error
      await fetchIngredients()
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }, [fetchIngredients])

  const updateStock = useCallback(async (ingredientId, qty, mode = 'add') => {
    if (MODE === 'demo') {
      applyMockStockUpdate(ingredientId, qty, mode)
      setIngredients([...mockIngredients])
      return { success: true }
    }

    if (MODE === 'api') {
      try {
        await apiFetch('/ingredients.php', {
          method: 'PUT',
          body: JSON.stringify({ id: ingredientId, qty, mode }),
        })
        await fetchIngredients()
        return { success: true }
      } catch (err) {
        return { success: false, error: err.message }
      }
    }

    try {
      const item = ingredients.find(i => i.id === ingredientId)
      const newQty = mode === 'add' ? (item?.current_qty ?? 0) + qty : qty
      const { error } = await supabase
        .from('ingredients').update({ current_qty: Math.max(0, newQty) }).eq('id', ingredientId)
      if (error) throw error
      await fetchIngredients()
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }, [ingredients, fetchIngredients])

  const addIngredient = useCallback(async (data) => {
    if (MODE === 'demo') {
      const newItem = { ...data, id: String(Date.now()) }
      mockIngredients.push(newItem)
      if (data.category && !mockCategories.includes(data.category)) mockCategories.push(data.category)
      setIngredients([...mockIngredients])
      setCategories([...mockCategories])
      return { success: true, data: newItem }
    }

    if (MODE === 'api') {
      try {
        const result = await apiFetch('/ingredients.php', {
          method: 'POST',
          body: JSON.stringify(data),
        })
        await fetchIngredients()
        return { success: true, data: result.data }
      } catch (err) {
        return { success: false, error: err.message }
      }
    }

    try {
      const { data: row, error } = await supabase
        .from('ingredients').insert(data).select().single()
      if (error) throw error
      if (data.category) {
        await supabase.from('categories').upsert({ name: data.category }, { onConflict: 'name', ignoreDuplicates: true })
      }
      await fetchIngredients()
      return { success: true, data: row }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }, [fetchIngredients])

  const addCategory = useCallback(async (name) => {
    const trimmed = name.trim()
    if (!trimmed) return { success: false, error: 'Name required' }

    if (MODE === 'demo') {
      if (!mockCategories.includes(trimmed)) mockCategories.push(trimmed)
      setCategories([...mockCategories])
      return { success: true }
    }

    if (MODE === 'api') {
      try {
        await apiFetch('/categories.php', {
          method: 'POST',
          body: JSON.stringify({ name: trimmed }),
        })
        await fetchIngredients()
        return { success: true }
      } catch (err) {
        return { success: false, error: err.message }
      }
    }

    try {
      const { error } = await supabase.from('categories').insert({ name: trimmed })
      if (error) throw error
      await fetchIngredients()
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }, [fetchIngredients])

  const fetchLogs = useCallback(async (fromDate, toDate) => {
    const from = new Date(fromDate); from.setHours(0, 0, 0, 0)
    const to   = new Date(toDate);   to.setHours(23, 59, 59, 999)

    if (MODE === 'demo') {
      const filtered = mockUsageLogs.filter(l => {
        const t = new Date(l.timestamp)
        return t >= from && t <= to
      })
      return { success: true, data: filtered.map(l => ({
        ...l,
        ingredient_name: mockIngredients.find(i => i.id === l.ingredient_id)?.name ?? l.ingredient_id,
        unit:            mockIngredients.find(i => i.id === l.ingredient_id)?.unit ?? '',
      }))}
    }

    if (MODE === 'api') {
      try {
        const result = await apiFetch(`/usage_logs.php?from=${fromDate}&to=${toDate}`)
        return { success: true, data: result.data }
      } catch (err) {
        return { success: false, error: err.message }
      }
    }

    try {
      const { data, error } = await supabase
        .from('usage_logs').select('*, ingredients(name, unit)')
        .gte('timestamp', from.toISOString()).lte('timestamp', to.toISOString())
        .order('staff_name').order('timestamp')
      if (error) throw error
      return { success: true, data: data.map(l => ({
        ...l,
        ingredient_name: l.ingredients?.name ?? '',
        unit:            l.ingredients?.unit ?? '',
      }))}
    } catch (err) {
      return { success: false, error: err.message }
    }
  }, [])

  return { ingredients, categories, loading, error, refetch: fetchIngredients, submitUsageLogs, updateStock, addIngredient, addCategory, fetchLogs }
}
