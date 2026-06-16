import { useState } from 'react'
import KitchenDashboard from './components/KitchenDashboard'
import ManagerDashboard from './components/ManagerDashboard'
import ManagerPasswordGate from './components/ManagerPasswordGate'
import { useIngredients } from './hooks/useIngredients'

const ROLES = [
  { key: 'kitchen', label: 'Kitchen Staff', icon: '👨‍🍳', desc: 'Log daily usage' },
  { key: 'manager', label: 'Manager',       icon: '📊', desc: 'Purchase & overview' },
]

function RoleSelector({ onSelect }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-10">
        <div className="text-6xl mb-4">🍝</div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Alfreej Inventory</h1>
        <p className="text-gray-500 mt-2 text-sm">Select your role to continue</p>
      </div>

      <div className="w-full max-w-sm space-y-3">
        {ROLES.map(role => (
          <button
            key={role.key}
            onClick={() => onSelect(role.key)}
            className="w-full flex items-center gap-4 bg-white border-2 border-gray-100 hover:border-orange-300 hover:shadow-md rounded-2xl p-5 text-left transition-all duration-200 group"
          >
            <span className="text-4xl">{role.icon}</span>
            <div>
              <p className="font-bold text-gray-900 text-base group-hover:text-orange-700 transition-colors">{role.label}</p>
              <p className="text-sm text-gray-400">{role.desc}</p>
            </div>
            <svg className="ml-auto text-gray-300 group-hover:text-orange-400 transition-colors" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-300 mt-10">Maamoura Kitchen · Sheraton Shop</p>
    </div>
  )
}

export default function App() {
  const [role,           setRole]           = useState(null)
  const [pendingRole,    setPendingRole]    = useState(null)
  const [managerUnlocked, setManagerUnlocked] = useState(false)

  const { ingredients, categories, loading, error, submitUsageLogs, updateStock, fetchLogs, addIngredient, addCategory } = useIngredients()

  const handleRoleSelect = (r) => {
    if (r === 'manager') {
      setPendingRole('manager')
    } else {
      setRole(r)
    }
  }

  const handleManagerUnlock = () => {
    setManagerUnlocked(true)
    setPendingRole(null)
    setRole('manager')
  }

  const handleSwitchRole = () => {
    setRole(null)
    setPendingRole(null)
    setManagerUnlocked(false)
  }

  if (!role && !pendingRole) {
    return <RoleSelector onSelect={handleRoleSelect} />
  }

  return (
    <div className="relative">
      {pendingRole === 'manager' && (
        <ManagerPasswordGate
          onSuccess={handleManagerUnlock}
          onCancel={() => setPendingRole(null)}
        />
      )}

      {role && (
        <>
          <button
            onClick={handleSwitchRole}
            className="fixed top-3 right-3 z-50 bg-white border border-gray-200 shadow-sm rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-all"
          >
            ← Switch Role
          </button>

          {error && (
            <div className="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white text-xs font-semibold text-center py-2 px-4">
              ⚠️ Database error: {error}. Running in demo mode.
            </div>
          )}

          {role === 'kitchen' ? (
            <KitchenDashboard
              ingredients={ingredients}
              loading={loading}
              onSubmit={submitUsageLogs}
            />
          ) : (
            <ManagerDashboard
              ingredients={ingredients}
              categories={categories}
              loading={loading}
              onUpdateStock={updateStock}
              onFetchLogs={fetchLogs}
              onAddIngredient={addIngredient}
              onAddCategory={addCategory}
            />
          )}
        </>
      )}
    </div>
  )
}
