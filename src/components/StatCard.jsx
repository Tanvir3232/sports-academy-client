
const StatCard = ({ value, icon, title, iconBgColor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
      <div className={`rounded-full p-3 ${iconBgColor} flex items-center justify-center`}>
        {icon}
      </div>
      <div className="ml-6">
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
