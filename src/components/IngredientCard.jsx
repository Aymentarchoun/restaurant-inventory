import { useState, useCallback } from 'react'

export default function IngredientCard({ ingredient, value, onChange }) {
  const { name, current_qty, min_limit, unit, bulk_unit, bulk_qty } = ingredient
  const isLow = current_qty <= min_limit
  const [inputVal, setInputVal] = useState(value === 0 ? '' : String(value))

  const update = useCallback((newNum) => {
    const clamped = Math.max(0, newNum)
    onChange(clamped)
    setInputVal(clamped === 0 ? '' : String(clamped))
  }, [onChange])

  const handleManualChange = (e) => {
    const raw = e.target.value
    setInputVal(raw)
    const parsed = parseFloat(raw)
    if (!isNaN(parsed) && parsed >= 0) {
      onChange(parsed)
    } else if (raw === '' || raw === '-') {
      onChange(0)
    }
  }

  const handleBlur = () => {
    const parsed = parseFloat(inputVal)
    if (isNaN(parsed) || parsed < 0) {
      setInputVal('')
      onChange(0)
    } else {
      setInputVal(String(parsed))
    }
  }

  const bulkLabel = bulk_unit || `Unit (${bulk_qty}${unit})`
  const bulkAmount = bulk_qty || 1

  return (
    <div
      className={[
        'rounded-2xl border p-4 transition-all duration-200',
        isLow
          ? 'bg-red-50 border-red-300'
          : 'bg-white border-gray-200',
      ].join(' ')}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-base leading-tight truncate ${isLow ? 'text-red-800' : 'text-gray-800'}`}>
            {name}
          </h3>
          <div className="flex items-center gap-3 mt-1">
            <span className={`text-sm font-medium ${isLow ? 'text-red-600' : 'text-gray-500'}`}>
              In stock: <span className="font-bold">{current_qty} {unit}</span>
            </span>
            <span className="text-xs text-gray-400">
              Min: {min_limit} {unit}
            </span>
          </div>
        </div>
        {isLow && (
          <span className="ml-2 flex-shrink-0 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            LOW
          </span>
        )}
      </div>

      {/* Entry row */}
      <div className="flex items-center gap-2">
        {/* Decrement bulk */}
        <button
          onClick={() => update(value - bulkAmount)}
          className={[
            'flex-shrink-0 h-10 px-3 rounded-xl text-sm font-bold transition-colors',
            isLow
              ? 'bg-red-200 text-red-700 active:bg-red-300'
              : 'bg-orange-100 text-orange-700 active:bg-orange-200',
          ].join(' ')}
        >
          −1
        </button>

        {/* Manual input */}
        <div className="flex-1 relative">
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={inputVal}
            onChange={handleManualChange}
            onBlur={handleBlur}
            placeholder="0"
            className={[
              'w-full h-10 text-center text-base font-semibold rounded-xl border-2 outline-none transition-colors',
              isLow
                ? 'border-red-300 bg-white text-red-800 focus:border-red-500'
                : 'border-gray-200 bg-gray-50 text-gray-800 focus:border-orange-400',
            ].join(' ')}
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
            {unit}
          </span>
        </div>

        {/* Increment bulk */}
        <button
          onClick={() => update(value + bulkAmount)}
          className={[
            'flex-shrink-0 h-10 px-3 rounded-xl text-sm font-bold transition-colors',
            isLow
              ? 'bg-red-200 text-red-700 active:bg-red-300'
              : 'bg-orange-100 text-orange-700 active:bg-orange-200',
          ].join(' ')}
        >
          +1
        </button>
      </div>

      {/* Bulk unit label */}
      <p className="text-center text-xs text-gray-400 mt-1.5">
        Bulk: {bulkLabel} = {bulkAmount} {unit}
      </p>
    </div>
  )
}
