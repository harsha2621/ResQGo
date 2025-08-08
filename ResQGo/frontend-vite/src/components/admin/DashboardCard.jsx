export default function DashboardCard({ title, value }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-sm text-gray-500 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-red-600">{value}</p>
    </div>
  );
}
