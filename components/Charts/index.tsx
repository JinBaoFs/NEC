import { AreaChart, Area, XAxis, YAxis } from 'recharts';

const Charts = () => {
  const data = [
    {
      name: '03/23',
      pv: 2.5
    },
    {
      name: '03/24',
      pv: 2.8
    },
    {
      name: '03/25',
      pv: 2.3
    },
    {
      name: '03/26',
      pv: 2.6
    },
    {
      name: '03/27',
      pv: 2.9
    }
  ];
  return (
    <AreaChart
      data={data}
      height={250}
      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      width={360}
    >
      <defs>
        <linearGradient
          id="colorPv"
          x1="0"
          x2="0"
          y1="0"
          y2="1"
        >
          <stop
            offset="5%"
            stopColor="#1c3b47"
            stopOpacity={1}
          />
          <stop
            offset="95%"
            stopColor="#1c3b47"
            stopOpacity={0}
          />
        </linearGradient>
      </defs>
      <XAxis
        axisLine={false}
        dataKey="name"
        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12, dy: 10 }}
        tickLine={false}
      />
      <YAxis
        axisLine={false}
        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12, dx: -10 }}
        tickLine={false}
      />
      <Area
        dataKey="pv"
        dot={{
          r: 3,
          fill: '#00ECFF',
          strokeWidth: 3,
          stroke: 'rgba(0,236,255,0.3)'
        }}
        fill="url(#colorPv)"
        fillOpacity={1}
        label={
          <CustomLabel /> || {
            fill: '#00e8ff',
            fontSize: 14,
            position: 'outside',
            dy: '-10'
          }
        }
        stroke="#00e8ff"
        type="monotone"
      />
    </AreaChart>
  );
};

const CustomLabel = ({ x, y, ...data }: any) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        dy={8}
        fill={'#00e8ff'}
        fontSize={'14px'}
        textAnchor="middle"
        x={data.index === 4 ? -10 : 0}
        y={-15}
      >
        {data.value}
      </text>
    </g>
  );
};

export default Charts;

const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};
