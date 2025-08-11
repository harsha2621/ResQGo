export default function DashboardCard({ title, value, icon, valueColor = "text-red-600" }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm text-gray-500 mb-2 font-medium uppercase tracking-wider">{title}</h3>
          <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
        </div>
        {icon && (
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
