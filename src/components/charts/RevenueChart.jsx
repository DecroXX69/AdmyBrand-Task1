import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"
import Skeleton from "../ui/skeleton"

export default function RevenueChart({ data, loading }) {
  return (
    <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}>
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>Daily revenue over 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? <Skeleton className="h-56 w-full mt-8" /> :
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0.03} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-40" />
                  <XAxis dataKey="date" tickFormatter={v => new Date(v).toLocaleDateString(undefined, { month:"short", day:"numeric"})} />
                  <YAxis tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fill="url(#revenueGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          }
        </CardContent>
      </Card>
    </motion.div>
  )
}
