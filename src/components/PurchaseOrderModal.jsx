import { useState } from 'react'

export default function PurchaseOrderModal({ ingredient, onConfirm, onClose }) {
  const [qty, setQty] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  const needed = Math.max(0, ingredient.min_limit - ingredient.current_qty + ingredient.min_limit * 0.2)

  const handleSubmit = async () => {
    const q = parseFloat(qty)
    if (isNaN(q) || q <= 0) return
    setLoading(true)
    await onConfirm(ingredient.id, q, notes)
    setLoading(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Create Purchase Order</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
        </div>

        <div className="bg-red-50 rounded-xl p-3 mb-4">
          <p className="font-semibold text-red-800">{ingredient.name}</p>
          <p className="text-sm text-red-600 mt-0.5">
            Current: <strong>{ingredient.current_qty} {ingredient.unit}</strong> · Min: <strong>{ingredient.min_limit} {ingredient.unit}</strong>
          </p>
          <p className="text-xs text-red-500 mt-1">
            Suggested order: ~{needed.toFixed(1)} {ingredient.unit}
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Order Quantity ({ingredient.unit})
            </label>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={qty}
              onChange={e => setQty(e.target.value)}
              placeholder={needed.toFixed(1)}
              className="w-full h-11 px-3 border-2 border-gray-200 rounded-xl text-base font-medium outline-none focus:border-orange-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={2}
              placeholder="Supplier, urgency, etc."
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 transition-colors resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !qty}
            className="flex-1 h-11 rounded-xl bg-orange-500 text-white font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
          >
            {loading ? 'Placing…' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  )
}
