import { useState } from 'react'

const MANAGER_PASSWORD = 'Chef2017'

export default function ManagerPasswordGate({ onSuccess, onCancel }) {
  const [pw, setPw]         = useState('')
  const [error, setError]   = useState(false)
  const [shake, setShake]   = useState(false)

  const attempt = () => {
    if (pw === MANAGER_PASSWORD) {
      onSuccess()
    } else {
      setError(true)
      setShake(true)
      setPw('')
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.55)' }}
    >
      <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-xs overflow-hidden transition-all ${shake ? 'animate-[shake_.4s_ease]' : ''}`}
        style={shake ? { animation: 'shake .4s ease' } : {}}
      >
        <div className="bg-gray-900 px-6 pt-6 pb-5 text-center">
          <div className="text-3xl mb-2">🔐</div>
          <h2 className="text-white font-bold text-lg">Manager Access</h2>
          <p className="text-gray-400 text-xs mt-1">Enter your password to continue</p>
        </div>

        <div className="px-6 py-5">
          <input
            type="password"
            autoFocus
            value={pw}
            onChange={e => { setPw(e.target.value); setError(false) }}
            onKeyDown={e => e.key === 'Enter' && attempt()}
            placeholder="Password"
            className={[
              'w-full h-12 px-4 text-center text-base font-semibold border-2 rounded-xl outline-none transition-colors tracking-widest',
              error
                ? 'border-red-400 bg-red-50 text-red-700 placeholder-red-300'
                : 'border-gray-200 bg-gray-50 text-gray-800 focus:border-orange-400',
            ].join(' ')}
          />
          {error && (
            <p className="text-red-500 text-xs text-center mt-2 font-semibold">
              Incorrect password. Try again.
            </p>
          )}

          <div className="flex gap-3 mt-4">
            <button
              onClick={onCancel}
              className="flex-1 h-11 rounded-xl border-2 border-gray-200 text-gray-500 font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={attempt}
              className="flex-1 h-11 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-700 active:scale-95 transition-all"
            >
              Unlock
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-6px)}
          80%{transform:translateX(6px)}
        }
      `}</style>
    </div>
  )
}
