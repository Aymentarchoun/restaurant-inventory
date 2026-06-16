const LOCATIONS = ['Maamoura Kitchen', 'Sheraton Shop']

export default function LocationToggle({ value, onChange }) {
  return (
    <div className="flex items-center bg-gray-100 rounded-xl p-1 gap-1 w-full max-w-sm">
      {LOCATIONS.map(loc => (
        <button
          key={loc}
          onClick={() => onChange(loc)}
          className={[
            'flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-200',
            value === loc
              ? 'bg-white text-orange-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700',
          ].join(' ')}
        >
          {loc === 'Maamoura Kitchen' ? '🍽️ Maamoura' : '🏨 Sheraton'}
        </button>
      ))}
    </div>
  )
}
