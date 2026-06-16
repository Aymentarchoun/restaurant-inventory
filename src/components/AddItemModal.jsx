import { useState } from 'react'

const UNITS = ['kg', 'L', 'pcs', 'bags', 'g', 'ml', 'boxes']
const LOCATIONS = ['Maamoura Kitchen', 'Sheraton Shop']

export default function AddItemModal({ categories, onConfirm, onClose, onAddCategory }) {
  const [tab, setTab] = useState('item')   // 'item' | 'category'

  // Item form
  const [name,     setName]     = useState('')
  const [category, setCategory] = useState(categories[0] ?? '')
  const [newCat,   setNewCat]   = useState('')
  const [location, setLocation] = useState('Maamoura Kitchen')
  const [unit,     setUnit]     = useState('kg')
  const [minLimit, setMinLimit] = useState('')
  const [curQty,   setCurQty]   = useState('')
  const [bulkUnit, setBulkUnit] = useState('')
  const [bulkQty,  setBulkQty]  = useState('')
  const [loading,  setLoading]  = useState(false)
  const [err,      setErr]      = useState('')

  // Category form
  const [catName,    setCatName]    = useState('')
  const [catLoading, setCatLoading] = useState(false)
  const [catErr,     setCatErr]     = useState('')
  const [catOk,      setCatOk]      = useState(false)

  const effectiveCategory = category === '__new__' ? newCat.trim() : category

  const handleAddItem = async () => {
    if (!name.trim()) return setErr('Name is required')
    if (!effectiveCategory) return setErr('Category is required')
    if (!minLimit || isNaN(parseFloat(minLimit))) return setErr('Min limit is required')
    setErr(''); setLoading(true)
    const result = await onConfirm({
      name: name.trim(),
      category: effectiveCategory,
      location,
      unit,
      current_qty: parseFloat(curQty) || 0,
      min_limit: parseFloat(minLimit),
      bulk_unit: bulkUnit.trim() || null,
      bulk_qty: parseFloat(bulkQty) || 1,
    })
    setLoading(false)
    if (result?.success) onClose()
    else setErr(result?.error ?? 'Failed to add item')
  }

  const handleAddCategory = async () => {
    if (!catName.trim()) return setCatErr('Name is required')
    setCatErr(''); setCatLoading(true)
    const result = await onAddCategory(catName.trim())
    setCatLoading(false)
    if (result?.success) { setCatOk(true); setCatName(''); setTimeout(() => setCatOk(false), 2000) }
    else setCatErr(result?.error ?? 'Failed')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.45)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <h2 className="text-base font-bold text-gray-900">Add to Inventory</h2>
          <button onClick={onClose} className="text-gray-300 hover:text-gray-500 text-xl">✕</button>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 mx-5 rounded-xl p-1 gap-1 mb-4">
          {[['item','New Item'],['category','New Category']].map(([k,l]) => (
            <button key={k} onClick={() => setTab(k)}
              className={['flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all',
                tab===k ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500'].join(' ')}>
              {l}
            </button>
          ))}
        </div>

        {/* ── ADD ITEM ── */}
        {tab === 'item' && (
          <div className="px-5 pb-5 space-y-3">
            {/* Name */}
            <div>
              <label className="label-xs">Item Name</label>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Mozzarella"
                className="field" />
            </div>

            {/* Category */}
            <div>
              <label className="label-xs">Category</label>
              <select value={category} onChange={e=>setCategory(e.target.value)} className="field">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                <option value="__new__">+ New category…</option>
              </select>
            </div>
            {category === '__new__' && (
              <input value={newCat} onChange={e=>setNewCat(e.target.value)} placeholder="Category name"
                className="field" />
            )}

            {/* Location */}
            <div>
              <label className="label-xs">Location</label>
              <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
                {LOCATIONS.map(loc => (
                  <button key={loc} onClick={()=>setLocation(loc)}
                    className={['flex-1 py-2 text-xs font-semibold rounded-lg transition-all',
                      location===loc ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500'].join(' ')}>
                    {loc==='Maamoura Kitchen' ? '🍽️ Maamoura' : '🏨 Sheraton'}
                  </button>
                ))}
              </div>
            </div>

            {/* Unit + Qty row */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="label-xs">Unit</label>
                <select value={unit} onChange={e=>setUnit(e.target.value)} className="field">
                  {UNITS.map(u=><option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              <div>
                <label className="label-xs">Current Qty</label>
                <input type="number" min="0" step="0.01" value={curQty} onChange={e=>setCurQty(e.target.value)}
                  placeholder="0" className="field" />
              </div>
              <div>
                <label className="label-xs">Min Limit *</label>
                <input type="number" min="0" step="0.01" value={minLimit} onChange={e=>setMinLimit(e.target.value)}
                  placeholder="0" className="field" />
              </div>
            </div>

            {/* Bulk unit */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="label-xs">Bulk Label <span className="text-gray-300">(optional)</span></label>
                <input value={bulkUnit} onChange={e=>setBulkUnit(e.target.value)} placeholder="e.g. Bag (5kg)"
                  className="field" />
              </div>
              <div>
                <label className="label-xs">Bulk Qty</label>
                <input type="number" min="0.01" step="0.01" value={bulkQty} onChange={e=>setBulkQty(e.target.value)}
                  placeholder="1" className="field" />
              </div>
            </div>

            {err && <p className="text-red-500 text-xs font-semibold">{err}</p>}

            <div className="flex gap-3 pt-1">
              <button onClick={onClose}
                className="flex-1 h-11 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleAddItem} disabled={loading}
                className="flex-1 h-11 rounded-xl bg-orange-500 text-white font-bold text-sm disabled:opacity-40 hover:bg-orange-600 active:scale-95 transition-all">
                {loading ? 'Adding…' : '+ Add Item'}
              </button>
            </div>
          </div>
        )}

        {/* ── ADD CATEGORY ── */}
        {tab === 'category' && (
          <div className="px-5 pb-5 space-y-3">
            <div>
              <label className="label-xs">Category Name</label>
              <input value={catName} onChange={e=>{setCatName(e.target.value);setCatErr('')}}
                onKeyDown={e=>e.key==='Enter'&&handleAddCategory()}
                placeholder="e.g. Seafood" className="field" autoFocus />
            </div>

            {/* Existing list */}
            <div>
              <label className="label-xs">Existing Categories</label>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {categories.map(c => (
                  <span key={c} className="bg-orange-50 text-orange-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-orange-200">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {catErr && <p className="text-red-500 text-xs font-semibold">{catErr}</p>}
            {catOk  && <p className="text-green-600 text-xs font-semibold">✓ Category added!</p>}

            <div className="flex gap-3 pt-1">
              <button onClick={onClose}
                className="flex-1 h-11 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
                Close
              </button>
              <button onClick={handleAddCategory} disabled={catLoading}
                className="flex-1 h-11 rounded-xl bg-orange-500 text-white font-bold text-sm disabled:opacity-40 hover:bg-orange-600 active:scale-95 transition-all">
                {catLoading ? 'Adding…' : '+ Add Category'}
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .label-xs{display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin-bottom:5px}
        .field{width:100%;height:40px;padding:0 12px;border:2px solid #e5e7eb;border-radius:10px;font-size:13px;font-weight:500;color:#111827;background:#f9fafb;outline:none;transition:border-color .15s}
        .field:focus{border-color:#f97316}
        select.field{cursor:pointer}
      `}</style>
    </div>
  )
}
