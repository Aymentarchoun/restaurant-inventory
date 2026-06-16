import { useEffect, useRef } from 'react'

export default function ThermalPrint({ ingredients, locationFilter, lowStockOnly, onClose }) {
  const printRef = useRef(null)

  const date = new Date().toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  const allItems = ingredients
    .filter(i => locationFilter === 'All' || i.location === locationFilter)
    .sort((a, b) => {
      if (a.current_qty <= a.min_limit && b.current_qty > b.min_limit) return -1
      if (a.current_qty > a.min_limit && b.current_qty <= b.min_limit) return 1
      return a.name.localeCompare(b.name)
    })

  const lowItems = allItems.filter(i => i.current_qty <= i.min_limit)
  const okItems  = lowStockOnly ? [] : allItems.filter(i => i.current_qty > i.min_limit)
  const items    = lowStockOnly ? lowItems : allItems

  useEffect(() => {
    const style = document.createElement('style')
    style.id = 'thermal-print-style'
    style.textContent = `
      @media print {
        body > *:not(#thermal-print-root) { display: none !important; }
        #thermal-print-root { display: block !important; }
        @page { size: 80mm auto; margin: 3mm 4mm; }
      }
    `
    document.head.appendChild(style)
    return () => document.getElementById('thermal-print-style')?.remove()
  }, [])

  const doPrint = () => {
    window.print()
    setTimeout(onClose, 500)
  }

  const sep = '─'.repeat(32)

  return (
    <>
      {/* Modal overlay */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.5)' }}
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Preview header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <h2 className="text-base font-bold text-gray-900">Print Stock Report</h2>
              <p className="text-xs text-gray-400 mt-0.5">80mm thermal receipt preview</p>
            </div>
            <button onClick={onClose} className="text-gray-300 hover:text-gray-500 text-xl">✕</button>
          </div>

          {/* Receipt preview */}
          <div className="px-5 py-4 max-h-96 overflow-y-auto">
            <div
              ref={printRef}
              className="font-mono text-xs bg-white border border-dashed border-gray-300 rounded-lg p-3"
              style={{ fontFamily: 'monospace', fontSize: '11px', lineHeight: '1.4', whiteSpace: 'pre-wrap' }}
            >
              <div className="text-center font-bold text-sm mb-0.5">ALFREEJ INVENTORY</div>
              <div className="text-center text-gray-500 text-xs">Stock Report</div>
              <div className="text-center text-gray-400 text-xs">{date}</div>
              {locationFilter !== 'All' && (
                <div className="text-center font-semibold text-xs mt-0.5">{locationFilter}</div>
              )}
              <div className="border-t border-dashed border-gray-300 my-2" />

              {lowItems.length > 0 && (
                <>
                  <div className="font-bold text-xs text-red-600">⚠ LOW STOCK ({lowItems.length})</div>
                  <div className="border-t border-gray-200 my-1" />
                  {lowItems.map(item => (
                    <div key={item.id} className="flex justify-between text-xs mb-0.5">
                      <span className="truncate flex-1 text-red-700 font-semibold" style={{ maxWidth: '55%' }}>
                        {item.name}
                      </span>
                      <span className="text-red-600 font-bold ml-1 text-right">
                        {item.current_qty}/{item.min_limit} {item.unit}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-dashed border-gray-300 my-2" />
                </>
              )}

              <div className="font-bold text-xs text-gray-600">IN STOCK ({okItems.length})</div>
              <div className="border-t border-gray-200 my-1" />
              {okItems.map(item => (
                <div key={item.id} className="flex justify-between text-xs mb-0.5">
                  <span className="truncate flex-1 text-gray-700" style={{ maxWidth: '55%' }}>
                    {item.name}
                  </span>
                  <span className="text-gray-600 ml-1 text-right">
                    {item.current_qty} {item.unit}
                  </span>
                </div>
              ))}

              <div className="border-t border-dashed border-gray-300 my-2" />
              <div className="text-center text-gray-400 text-xs">
                {lowStockOnly ? `${lowItems.length} low stock items` : `${items.length} items · ${lowItems.length} low stock`}
              </div>
              <div className="text-center text-gray-300 text-xs mt-0.5">★ ★ ★</div>
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
              onClick={doPrint}
              className="flex-1 h-11 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-700 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              🖨️ Print Receipt
            </button>
          </div>
        </div>
      </div>

      {/* Hidden thermal-formatted content for actual print */}
      <div id="thermal-print-root" style={{ display: 'none' }}>
        <div style={{ fontFamily: 'monospace', fontSize: '10pt', width: '72mm', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '12pt' }}>ALFREEJ INVENTORY</div>
          <div style={{ textAlign: 'center', fontSize: '9pt' }}>Stock Report</div>
          <div style={{ textAlign: 'center', fontSize: '9pt' }}>{date}</div>
          {locationFilter !== 'All' && (
            <div style={{ textAlign: 'center', fontWeight: 'bold' }}>{locationFilter}</div>
          )}
          <div style={{ borderTop: '1px dashed #000', margin: '4px 0' }} />

          {lowItems.length > 0 && (
            <>
              <div style={{ fontWeight: 'bold', fontSize: '9pt' }}>⚠ LOW STOCK ({lowItems.length})</div>
              <div style={{ borderTop: '1px solid #000', margin: '2px 0' }} />
              {lowItems.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9pt', marginBottom: '1px' }}>
                  <span style={{ flex: 1, overflow: 'hidden' }}>{item.name}</span>
                  <span style={{ fontWeight: 'bold', whiteSpace: 'nowrap', marginLeft: '4px' }}>
                    {item.current_qty}/{item.min_limit}{item.unit}
                  </span>
                </div>
              ))}
              <div style={{ borderTop: '1px dashed #000', margin: '4px 0' }} />
            </>
          )}

          <div style={{ fontWeight: 'bold', fontSize: '9pt' }}>IN STOCK ({okItems.length})</div>
          <div style={{ borderTop: '1px solid #000', margin: '2px 0' }} />
          {okItems.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9pt', marginBottom: '1px' }}>
              <span style={{ flex: 1, overflow: 'hidden' }}>{item.name}</span>
              <span style={{ whiteSpace: 'nowrap', marginLeft: '4px' }}>{item.current_qty}{item.unit}</span>
            </div>
          ))}

          <div style={{ borderTop: '1px dashed #000', margin: '4px 0' }} />
          <div style={{ textAlign: 'center', fontSize: '8pt' }}>
            {lowStockOnly ? `${lowItems.length} low stock items` : `${items.length} items · ${lowItems.length} low stock`}
          </div>
          <div style={{ textAlign: 'center', fontSize: '8pt' }}>*** END OF REPORT ***</div>
        </div>
      </div>
    </>
  )
}
