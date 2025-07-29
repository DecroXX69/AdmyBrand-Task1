import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { motion } from "framer-motion"
import { Globe } from "lucide-react"

const TrafficSourcesChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-4 border border-white/30 shadow-2xl"
        >
          <p className="text-sm font-medium mb-1">{payload[0].name}</p>
          <p className="text-sm font-bold" style={{ color: payload[0].payload.color }}>
            {`${payload[0].value.toFixed(1)}%`}
          </p>
        </motion.div>
      )
    }
    return null
  }

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {payload.map((entry, index) => (
          <motion.div 
            key={index} 
            className="flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
            />
            <span className="text-xs font-medium text-muted-foreground">
              {entry.value}
            </span>
          </motion.div>
        ))}
      </div>
    )
  }

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-bold drop-shadow-lg"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="glass-effect overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-3 text-gradient">
            <Globe className="w-5 h-5" />
            Traffic Sources
          </CardTitle>
          <CardDescription className="text-muted-foreground/80">
            Breakdown of website traffic by source channel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  {data.map((entry, index) => (
                    <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="5%" stopColor={entry.color} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={entry.color} stopOpacity={0.6}/>
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={data}
                  cx="50%"
                  cy="45%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  innerRadius={40}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`url(#gradient-${index})`}
                      stroke={entry.color}
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default TrafficSourcesChart
