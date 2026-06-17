import { useState, useMemo } from 'react'
import UpdateStockModal from './UpdateStockModal'
import ThermalPrint from './ThermalPrint'
import ExportModal from './ExportModal'
import AddItemModal from './AddItemModal'

const LOCATIONS = ['All', 'Maamoura Kitchen', 'Sheraton Shop']

function StockBar({ current, min }) {
  const pct = min === 0 ? 100 : Math.min(100, (current / (min * 2)) * 100)
  const isLow = current <= min
  return (
    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
      <div className={`h-1.5 rounded-full transition-all ${isLow ? 'bg-red-500' : 'bg-emerald-500'}`}
        style={{ width: `${pct}%` }} />
    </div>
  )
}

function LowStockToggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={[
        'flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 font-semibold text-sm transition-all duration-200',
        value
          ? 'bg-red-500 border-red-500 text-white shadow-md shadow-red-200'
          : 'bg-white border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600',
      ].join(' ')}
    >
      <div className={['relative w-10 h-5 rounded-full transition-colors duration-200',
        value ? 'bg-white/30' : 'bg-gray-200'].join(' ')}>
        <div className={['absolute top-0.5 w-4 h-4 rounded-full shadow transition-transform duration-200',
          value ? 'translate-x-5 bg-white' : 'translate-x-0.5 bg-white'].join(' ')} />
      </div>
      SHOW LOW STOCK ITEMS ONLY
    </button>
  )
}

function CategoryHeader({ name, count, lowCount, collapsed, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full grid grid-cols-12 px-5 py-2 bg-gray-50 hover:bg-gray-100 border-y border-gray-200 transition-colors text-left"
    >
      <div className="col-span-12 flex items-center gap-2">
        <span className="flex items-center justify-center w-5 h-5 rounded-md bg-white border border-gray-300 text-gray-600 font-black text-sm leading-none shrink-0">
          {collapsed ? '+' : '−'}
        </span>
        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{name}</span>
        <div className="flex-1 h-px bg-gray-200" />
        {lowCount > 0 && (
          <span className="text-xs font-bold text-red-500 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
            {lowCount} LOW
          </span>
        )}
        <span className="text-xs text-gray-400">{count} items</span>
      </div>
    </button>
  )
}

export default function ManagerDashboard({ ingredients, categories, loading, onUpdateStock, onFetchLogs, onAddIngredient, onAddCategory }) {
  const [locationFilter, setLocationFilter] = useState('All')
  const [lowStockOnly,   setLowStockOnly]   = useState(false)
  const [search,         setSearch]         = useState('')
  const [collapsed,      setCollapsed]      = useState(() => new Set())
  const [updateModal,    setUpdateModal]    = useState(null)
  const [showPrint,      setShowPrint]      = useState(false)
  const [showExport,     setShowExport]     = useState(false)
  const [showAddItem,    setShowAddItem]    = useState(false)
  const [toast,          setToast]          = useState(null)

  const query = search.trim().toLowerCase()

  const filtered = useMemo(() => {
    let list = ingredients
    if (locationFilter !== 'All') list = list.filter(i => i.location === locationFilter)
    if (lowStockOnly) list = list.filter(i => i.current_qty <= i.min_limit)
    if (query) list = list.filter(i => i.name.toLowerCase().includes(query))
    return list
  }, [ingredients, locationFilter, lowStockOnly, query])

  const toggleCategory = (cat) => setCollapsed(prev => {
    const next = new Set(prev)
    next.has(cat) ? next.delete(cat) : next.add(cat)
    return next
  })

  // Group by category, sorted
  const grouped = useMemo(() => {
    const map = {}
    filtered.forEach(item => {
      const cat = item.category || 'Other'
      if (!map[cat]) map[cat] = []
      map[cat].push(item)
    })
    Object.values(map).forEach(arr => arr.sort((a, b) => a.name.localeCompare(b.name)))
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b))
  }, [filtered])

  const stats = useMemo(() => ({
    total:    ingredients.length,
    low:      ingredients.filter(i => i.current_qty <= i.min_limit).length,
    maamoura: ingredients.filter(i => i.location === 'Maamoura Kitchen').length,
    sheraton: ingredients.filter(i => i.location === 'Sheraton Shop').length,
  }), [ingredients])

  const handleUpdateConfirm = async (id, qty, mode) => {
    const result = await onUpdateStock(id, qty, mode)
    const item = ingredients.find(i => i.id === id)
    if (result?.success) {
      const verb = mode === 'add' ? `+${qty} ${item?.unit} added` : `set to ${qty} ${item?.unit}`
      showToast(`${item?.name} — ${verb}`, 'success')
    } else {
      showToast(result?.error || 'Update failed', 'error')
    }
  }

  const showToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Inventory Dashboard</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Manager View · {new Date().toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {stats.low > 0 && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-red-700">{stats.low} items need restocking</span>
              </div>
            )}
            <button
              onClick={() => setShowAddItem(true)}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              + Add Item
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Ingredients', value: stats.total,    color: 'bg-blue-50 text-blue-700 border-blue-100' },
            { label: 'Low Stock Alerts',  value: stats.low,      color: 'bg-red-50 text-red-700 border-red-100' },
            { label: 'Maamoura Kitchen', value: stats.maamoura, color: 'bg-orange-50 text-orange-700 border-orange-100' },
            { label: 'Sheraton Shop',    value: stats.sheraton,  color: 'bg-purple-50 text-purple-700 border-purple-100' },
          ].map(card => (
            <div key={card.label} className={`rounded-2xl border p-4 ${card.color}`}>
              <p className="text-xs font-semibold uppercase tracking-wide opacity-70">{card.label}</p>
              <p className="text-3xl font-black mt-1">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search ingredients by name…"
            className="w-full h-12 pl-12 pr-12 rounded-2xl border-2 border-gray-200 bg-white text-sm font-medium text-gray-800 outline-none transition-colors focus:border-orange-400 placeholder:text-gray-400"
          />
          {search && (
            <button onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 text-sm font-bold transition-colors">
              ✕
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-500 mr-1">Location:</span>
            {LOCATIONS.map(loc => (
              <button key={loc} onClick={() => setLocationFilter(loc)}
                className={['px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors',
                  locationFilter === loc ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'].join(' ')}>
                {loc === 'All' ? 'All Locations' : loc === 'Maamoura Kitchen' ? '🍽️ Maamoura' : '🏨 Sheraton'}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <LowStockToggle value={lowStockOnly} onChange={setLowStockOnly} />
            <button onClick={() => setShowPrint(true)}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all">
              🖨️ Print
            </button>
            <button onClick={() => setShowExport(true)}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border-2 border-emerald-200 bg-emerald-50 text-emerald-700 font-semibold text-sm hover:bg-emerald-100 transition-all">
              ⬇ Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Table header */}
          <div className="grid grid-cols-12 px-5 py-3 bg-gray-100 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wide">
            <div className="col-span-4">Ingredient</div>
            <div className="col-span-2 text-center">Location</div>
            <div className="col-span-2 text-center">Current Stock</div>
            <div className="col-span-2 text-center">Min Limit</div>
            <div className="col-span-1 text-center">Status</div>
            <div className="col-span-1 text-right">Action</div>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-400">
              <div className="inline-block w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full animate-spin mb-2" />
              <p className="text-sm font-medium">Loading inventory…</p>
            </div>
          ) : grouped.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-4xl mb-2">{lowStockOnly ? '✅' : '📦'}</p>
              <p className="font-semibold text-gray-700">
                {lowStockOnly ? 'All items are well stocked!' : 'No items found'}
              </p>
            </div>
          ) : (
            <div>
              {grouped.map(([cat, items]) => {
                const lowInCat = items.filter(i => i.current_qty <= i.min_limit).length
                const isCollapsed = collapsed.has(cat) && !query
                return (
                  <div key={cat}>
                    <CategoryHeader name={cat} count={items.length} lowCount={lowInCat}
                      collapsed={isCollapsed} onToggle={() => toggleCategory(cat)} />
                    <div className={isCollapsed ? 'hidden' : 'divide-y divide-gray-50'}>
                      {items.map(item => {
                        const isLow = item.current_qty <= item.min_limit
                        return (
                          <div key={item.id}
                            className={['grid grid-cols-12 px-5 py-3.5 items-center transition-colors hover:bg-gray-50',
                              isLow ? 'bg-red-50 hover:bg-red-100' : ''].join(' ')}>
                            <div className="col-span-4">
                              <p className={`font-semibold text-sm ${isLow ? 'text-red-800' : 'text-gray-800'}`}>{item.name}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{item.unit}</p>
                            </div>
                            <div className="col-span-2 text-center">
                              <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${
                                item.location === 'Maamoura Kitchen'
                                  ? 'bg-orange-100 text-orange-700' : 'bg-purple-100 text-purple-700'}`}>
                                {item.location === 'Maamoura Kitchen' ? 'Maamoura' : 'Sheraton'}
                              </span>
                            </div>
                            <div className="col-span-2 text-center">
                              <p className={`font-bold text-sm ${isLow ? 'text-red-700' : 'text-gray-800'}`}>
                                {item.current_qty} <span className="text-xs font-normal">{item.unit}</span>
                              </p>
                              <StockBar current={item.current_qty} min={item.min_limit} />
                            </div>
                            <div className="col-span-2 text-center">
                              <p className="text-sm text-gray-500 font-medium">
                                {item.min_limit} <span className="text-xs">{item.unit}</span>
                              </p>
                            </div>
                            <div className="col-span-1 text-center">
                              {isLow ? (
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-100 border border-red-200 px-2 py-0.5 rounded-full">
                                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse inline-block" />LOW
                                </span>
                              ) : (
                                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">OK</span>
                              )}
                            </div>
                            <div className="col-span-1 text-right">
                              <button onClick={() => setUpdateModal(item)}
                                className={['text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shadow-sm',
                                  isLow ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'].join(' ')}>
                                Update
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 font-medium">
              Showing {filtered.length} of {ingredients.length} ingredients · {grouped.length} {grouped.length === 1 ? 'category' : 'categories'}
              {lowStockOnly && <span className="text-red-600 font-bold"> · Low stock filter active</span>}
            </div>
          )}
        </div>
      </div>

      {updateModal && (
        <UpdateStockModal ingredient={updateModal} onConfirm={handleUpdateConfirm} onClose={() => setUpdateModal(null)} />
      )}
      {showPrint && (
        <ThermalPrint ingredients={ingredients} locationFilter={locationFilter} lowStockOnly={lowStockOnly} onClose={() => setShowPrint(false)} />
      )}
      {showExport && (
        <ExportModal onFetchLogs={onFetchLogs} onClose={() => setShowExport(false)} />
      )}
      {showAddItem && (
        <AddItemModal
          categories={categories}
          onConfirm={onAddIngredient}
          onAddCategory={onAddCategory}
          onClose={() => setShowAddItem(false)}
        />
      )}

      {toast && (
        <div className={['fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl text-sm font-semibold transition-all',
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'].join(' ')}>
          {toast.msg}
        </div>
      )}
    </div>
  )
}
