import { useState } from 'react'

export default function UpdateStockModal({ ingredient, onConfirm, onClose }) {
  const [mode, setMode] = useState('add')   // 'add' | 'set'
  const [qty, setQty] = useState('')
  const [loading, setLoading] = useState(false)

  const { name, current_qty, min_limit, unit } = ingredient

  const previewQty = () => {
    const n = parseFloat(qty)
    if (isNaN(n)) return null
    return mode === 'add' ? current_qty + n : n
  }

  const preview = previewQty()
  const willBeHealthy = preview !== null && preview > min_limit

  const handleSubmit = async () => {
    const n = parseFloat(qty)
    if (isNaN(n) || n < 0) return
    setLoading(true)
    await onConfirm(ingredient.id, n, mode)
    setLoading(false)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.45)', minHeight: '100px' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">Update Stock</h2>
              <p className="text-sm font-semibold text-gray-700 mt-0.5">{name}</p>
            </div>
            <button onClick={onClose} className="text-gray-300 hover:text-gray-500 text-xl leading-none mt-0.5">✕</button>
          </div>

          {/* Current qty pill */}
          <div className="flex items-center gap-2 mt-3">
            <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-1.5 text-sm">
              <span className="text-red-500 font-medium">Current: </span>
              <span className="text-red-700 font-bold">{current_qty} {unit}</span>
            </div>
            <div className="text-gray-300 text-xs">→</div>
            <div className={[
              'rounded-xl px-3 py-1.5 text-sm border transition-all',
              preview === null
                ? 'bg-gray-50 border-gray-200 text-gray-400'
                : willBeHealthy
                  ? 'bg-green-50 border-green-200 text-green-700 font-bold'
                  : 'bg-red-50 border-red-200 text-red-700 font-bold',
            ].join(' ')}>
              {preview === null ? `? ${unit}` : `${Math.max(0, preview).toFixed(preview % 1 === 0 ? 0 : 2)} ${unit}`}
            </div>
          </div>
        </div>

        <div className="px-5 py-4 space-y-4">
          {/* Mode toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => setMode('add')}
              className={[
                'flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all',
                mode === 'add' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500',
              ].join(' ')}
            >
              + Add Purchased Qty
            </button>
            <button
              onClick={() => setMode('set')}
              className={[
                'flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all',
                mode === 'set' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500',
              ].join(' ')}
            >
              Set Actual Qty
            </button>
          </div>

          {/* Quantity input */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              {mode === 'add' ? `Quantity received (${unit})` : `New current quantity (${unit})`}
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              autoFocus
              value={qty}
              onChange={e => setQty(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder={mode === 'add' ? 'e.g. 20' : `e.g. ${min_limit * 2}`}
              className="w-full h-12 px-4 text-lg font-semibold border-2 border-gray-200 rounded-xl outline-none focus:border-orange-400 transition-colors text-gray-900"
            />
            {mode === 'add' && (
              <p className="text-xs text-gray-400 mt-1.5">
                Will add to current stock: {current_qty} + {parseFloat(qty) || '?'} {unit}
              </p>
            )}
            {mode === 'set' && (
              <p className="text-xs text-gray-400 mt-1.5">
                Min required: {min_limit} {unit}
                {preview !== null && !willBeHealthy && (
                  <span className="text-red-500 font-medium"> · Still below minimum</span>
                )}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || qty === '' || isNaN(parseFloat(qty))}
            className="flex-1 h-11 rounded-xl bg-orange-500 text-white font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-orange-600 active:scale-95 transition-all"
          >
            {loading ? 'Saving…' : mode === 'add' ? 'Confirm Receipt' : 'Update Stock'}
          </button>
        </div>
      </div>
    </div>
  )
}
