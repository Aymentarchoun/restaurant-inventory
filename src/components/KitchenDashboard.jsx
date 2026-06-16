import { useState, useMemo } from 'react'
import LocationToggle from './LocationToggle'
import IngredientCard from './IngredientCard'

const STAFF_NAMES = [
  'Nijam','Ikram','Sanaullah','Ahad','Habib',
  'Yassir','Majid','Mola','Jabid','Umair','Aymen',
]

export default function KitchenDashboard({ ingredients, loading, onSubmit }) {
  const [location,   setLocation]   = useState('Maamoura Kitchen')
  const [staffName,  setStaffName]  = useState('')
  const [entries,    setEntries]    = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [toast,      setToast]      = useState(null)

  // Items for active location, grouped by category
  const grouped = useMemo(() => {
    const list = ingredients.filter(i => i.location === location)
    const map = {}
    list.forEach(item => {
      const cat = item.category || 'Other'
      if (!map[cat]) map[cat] = []
      map[cat].push(item)
    })
    // sort items within each group by name
    Object.values(map).forEach(arr => arr.sort((a,b) => a.name.localeCompare(b.name)))
    return Object.entries(map).sort(([a],[b]) => a.localeCompare(b))
  }, [ingredients, location])

  const lowCount = useMemo(
    () => ingredients.filter(i => i.location === location && i.current_qty <= i.min_limit).length,
    [ingredients, location]
  )

  const totalEntered = Object.values(entries).filter(v => v > 0).length

  const handleEntry = (id, qty) => setEntries(prev => ({ ...prev, [id]: qty }))

  const handleSubmit = async () => {
    if (!staffName) { showToast('Please select your name before submitting.', 'error'); return }
    const logs = Object.entries(entries)
      .filter(([, qty]) => qty > 0)
      .map(([ingredient_id, qty_deducted]) => ({ ingredient_id, qty_deducted, location }))
    if (logs.length === 0) { showToast('No usage entered. Add quantities first.', 'error'); return }

    setSubmitting(true)
    const result = await onSubmit(logs, staffName)
    setSubmitting(false)

    if (result?.success) {
      setEntries({})
      showToast(`✓ ${logs.length} item${logs.length > 1 ? 's' : ''} submitted!`, 'success')
    } else {
      showToast(result?.error || 'Submission failed. Try again.', 'error')
    }
  }

  const showToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Daily Usage Log</h1>
              <p className="text-xs text-gray-400">
                Kitchen Staff · {new Date().toLocaleDateString('en-GB', { weekday:'short', day:'numeric', month:'short' })}
              </p>
            </div>
            {lowCount > 0 && (
              <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 rounded-xl px-3 py-1.5">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-red-600">{lowCount} LOW</span>
              </div>
            )}
          </div>
          <LocationToggle value={location} onChange={loc => { setLocation(loc); setEntries({}) }} />
        </div>
      </div>

      {/* Staff selector */}
      <div className="px-4 pt-4">
        <select
          value={staffName}
          onChange={e => setStaffName(e.target.value)}
          className={[
            'w-full h-11 px-4 rounded-xl border-2 bg-white text-sm font-semibold outline-none transition-colors appearance-none',
            staffName ? 'border-orange-400 text-gray-800' : 'border-gray-200 text-gray-400',
          ].join(' ')}
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat:'no-repeat', backgroundPosition:'right 14px center' }}
        >
          <option value="">Select your name…</option>
          {STAFF_NAMES.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      {/* Ingredient list grouped by category */}
      <div className="px-4 pt-4 pb-32 space-y-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-gray-200 animate-pulse" />
          ))
        ) : grouped.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-2">📦</p>
            <p className="font-medium">No ingredients found</p>
          </div>
        ) : (
          grouped.map(([cat, items]) => (
            <div key={cat}>
              {/* Category header */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{cat}</span>
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">{items.length}</span>
              </div>
              <div className="space-y-3">
                {items.map(ingredient => (
                  <IngredientCard
                    key={ingredient.id}
                    ingredient={ingredient}
                    value={entries[ingredient.id] || 0}
                    onChange={qty => handleEntry(ingredient.id, qty)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className={[
            'w-full h-14 rounded-2xl text-base font-bold transition-all duration-200 flex items-center justify-center gap-2',
            submitting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-500 text-white active:scale-95 shadow-lg shadow-orange-200',
          ].join(' ')}
        >
          {submitting ? (
            <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Submitting…</>
          ) : (
            <>✓ Confirm Daily Usage{totalEntered > 0 && (
              <span className="bg-white text-orange-600 text-xs font-black px-2 py-0.5 rounded-full">{totalEntered}</span>
            )}</>
          )}
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className={[
          'fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold max-w-xs text-center',
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white',
        ].join(' ')}>
          {toast.msg}
        </div>
      )}
    </div>
  )
}
