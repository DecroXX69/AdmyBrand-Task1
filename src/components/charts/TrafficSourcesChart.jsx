import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { motion } from "framer-motion"
import Skeleton from "../ui/skeleton"

export default function TrafficSourcesChart({ data, loading }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .2 }}>
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
          <CardDescription>Breakdown by channel</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? <Skeleton className="h-56 w-full mt-8" /> :
            <div className="h-56">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} fill="#6366f1" paddingAngle={3} dataKey="value">
                    {data.map((entry, i) => <Cell key={entry.name} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          }
        </CardContent>
      </Card>
    </motion.div>
  )
}
