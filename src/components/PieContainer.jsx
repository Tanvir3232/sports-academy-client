
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const PieContainer = ({ pieData }) => {
  const COLORS = ['#3ea055', '#454f83', '#ff3856', '#FF8042'];

  return (
    <PieChart width={480} height={400}>
      <Pie
        data={pieData}
        dataKey="count"
        nameKey="role"
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
       
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieContainer;
