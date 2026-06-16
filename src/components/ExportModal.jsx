import { useState } from 'react'
import * as XLSX from 'xlsx'

function fmt(isoString) {
  return new Date(isoString).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function ExportModal({ onFetchLogs, onClose }) {
  const today = new Date().toISOString().slice(0, 10)
  const weekAgo = new Date(Date.now() - 6 * 86400000).toISOString().slice(0, 10)

  const [fromDate, setFromDate] = useState(weekAgo)
  const [toDate,   setToDate]   = useState(today)
  const [loading,  setLoading]  = useState(false)
  const [preview,  setPreview]  = useState(null)
  const [error,    setError]    = useState(null)

  const load = async () => {
    if (!fromDate || !toDate) return
    setLoading(true)
    setError(null)
    const result = await onFetchLogs(fromDate, toDate)
    setLoading(false)
    if (!result.success) { setError(result.error); return }
    // Sort: staff name → timestamp → location → ingredient name
    const sorted = [...result.data].sort((a, b) => {
      const s = a.staff_name.localeCompare(b.staff_name)
      if (s !== 0) return s
      const t = new Date(a.timestamp) - new Date(b.timestamp)
      if (t !== 0) return t
      const l = a.location.localeCompare(b.location)
      if (l !== 0) return l
      return a.ingredient_name.localeCompare(b.ingredient_name)
    })
    setPreview(sorted)
  }

  const doExport = () => {
    if (!preview) return

    const rows = preview.map(l => ({
      'Staff Name':   l.staff_name,
      'Date & Time':  fmt(l.timestamp),
      'Shop':         l.location,
      'Item Name':    l.ingredient_name,
      'Qty Used':     l.qty_deducted,
      'Unit':         l.unit,
    }))

    const ws = XLSX.utils.json_to_sheet(rows)

    // Column widths
    ws['!cols'] = [
      { wch: 16 }, { wch: 20 }, { wch: 20 }, { wch: 22 }, { wch: 10 }, { wch: 8 },
    ]

    // Bold header row
    const range = XLSX.utils.decode_range(ws['!ref'])
    for (let C = range.s.c; C <= range.e.c; C++) {
      const cell = ws[XLSX.utils.encode_cell({ r: 0, c: C })]
      if (cell) cell.s = { font: { bold: true } }
    }

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Usage Report')

    const filename = `alfreej-usage-${fromDate}-to-${toDate}.xlsx`
    XLSX.writeFile(wb, filename)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900">Export Usage Report</h2>
            <p className="text-xs text-gray-400 mt-0.5">Sorted by staff · time · shop · item</p>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-gray-500 text-xl">✕</button>
        </div>

        <div className="px-5 py-4 space-y-4">
          {/* Date range */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">From</label>
              <input
                type="date"
                value={fromDate}
                max={toDate}
                onChange={e => { setFromDate(e.target.value); setPreview(null) }}
                className="w-full h-10 px-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 transition-colors"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">To</label>
              <input
                type="date"
                value={toDate}
                min={fromDate}
                max={today}
                onChange={e => { setToDate(e.target.value); setPreview(null) }}
                className="w-full h-10 px-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 transition-colors"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={load}
                disabled={loading}
                className="h-10 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {loading ? '…' : 'Load'}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
          )}

          {/* Preview table */}
          {preview !== null && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-gray-500">
                  {preview.length} {preview.length === 1 ? 'entry' : 'entries'} found
                </p>
                {preview.length === 0 && (
                  <span className="text-xs text-gray-400">No usage logged in this range</span>
                )}
              </div>

              {preview.length > 0 && (
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  {/* Table head */}
                  <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200 px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wide">
                    <div className="col-span-3">Staff</div>
                    <div className="col-span-3">Time</div>
                    <div className="col-span-2">Shop</div>
                    <div className="col-span-3">Item</div>
                    <div className="col-span-1 text-right">Qty</div>
                  </div>
                  {/* Rows */}
                  <div className="max-h-52 overflow-y-auto divide-y divide-gray-50">
                    {preview.map((l, i) => (
                      <div key={l.id ?? i} className="grid grid-cols-12 px-3 py-2 text-xs hover:bg-gray-50">
                        <div className="col-span-3 font-semibold text-gray-700 truncate">{l.staff_name}</div>
                        <div className="col-span-3 text-gray-400">{fmt(l.timestamp)}</div>
                        <div className="col-span-2">
                          <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                            l.location === 'Maamoura Kitchen'
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-purple-100 text-purple-700'
                          }`}>
                            {l.location === 'Maamoura Kitchen' ? 'Maamo.' : 'Sherat.'}
                          </span>
                        </div>
                        <div className="col-span-3 text-gray-700 truncate">{l.ingredient_name}</div>
                        <div className="col-span-1 text-right font-semibold text-gray-600">
                          {l.qty_deducted}<span className="text-gray-400 font-normal"> {l.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Columns legend */}
          <div className="bg-gray-50 rounded-xl px-3 py-2.5">
            <p className="text-xs font-semibold text-gray-500 mb-1">XLS columns</p>
            <p className="text-xs text-gray-400">Staff Name · Date &amp; Time · Shop · Item Name · Qty Used · Unit</p>
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
            onClick={doExport}
            disabled={!preview || preview.length === 0}
            className="flex-1 h-11 rounded-xl bg-emerald-600 text-white font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            ⬇ Export .xlsx
          </button>
        </div>
      </div>
    </div>
  )
}
