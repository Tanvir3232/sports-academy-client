import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

const BarContainer = ({ barData,xLabel,yValue }) => {
    const colors = ['#FF4136', '#FF851B', '#FFDC00', '#2ECC40', '#0074D9', '#B10DC9'];
  
  return (
    <BarChart width={480} height={400} data={barData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xLabel} />
      <YAxis />
      <Tooltip />
     
      <Bar dataKey={yValue}>
        {barData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default BarContainer;
