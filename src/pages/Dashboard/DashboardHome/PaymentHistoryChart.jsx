import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const PaymentHistoryChart = ({ paymentData }) => {
  return (
    <LineChart width={600} height={300} data={paymentData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="payment" stroke="#FF6B6B" />
    </LineChart>
  );
};

export default PaymentHistoryChart;
