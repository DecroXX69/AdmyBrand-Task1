import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { motion } from "framer-motion"
import { Users, Activity } from "lucide-react"

const UserActivityChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-4 border border-white/30 shadow-2xl"
        >
          <p className="text-sm font-medium mb-2">{`Date: ${new Date(label).toLocaleDateString()}`}</p>
          <div className="space-y-1">
            <p className="text-sm font-bold text-purple-400">
              {`Users: ${payload[0].value.toLocaleString()}`}
            </p>
            <p className="text-sm font-bold text-emerald-400">
              {`Sessions: ${payload[1].value.toLocaleString()}`}
            </p>
          </div>
        </motion.div>
      )
    }
    return null
  }

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex justify-center gap-6 mt-4">
        {payload.map((entry, index) => (
          <motion.div 
            key={index} 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium text-muted-foreground">
              {entry.value === 'users' ? 'Users' : 'Sessions'}
            </span>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="glass-effect overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-3 text-gradient">
            <Users className="w-5 h-5" />
            User Activity
            <div className="flex gap-1">
              <motion.div 
                className="w-2 h-2 bg-purple-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div 
                className="w-2 h-2 bg-emerald-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              />
            </div>
          </CardTitle>
          <CardDescription className="text-muted-foreground/80">
            Daily users vs sessions comparison with activity trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="sessionsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12, fill: 'currentColor' }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: 'currentColor' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
                <Bar 
                  dataKey="users" 
                  fill="url(#usersGradient)" 
                  radius={[4, 4, 0, 0]}
                  name="users"
                />
                <Bar 
                  dataKey="sessions" 
                  fill="url(#sessionsGradient)" 
                  radius={[4, 4, 0, 0]}
                  name="sessions"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default UserActivityChart
