import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"
import Skeleton from "../ui/skeleton"

export default function UserActivityChart({ data, loading }) {
  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay:.1 }}>
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>User Activity</CardTitle>
          <CardDescription>Users and sessions compared</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? <Skeleton className="h-56 w-full mt-8" /> :
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-25" />
                  <XAxis dataKey="date" tickFormatter={v => new Date(v).toLocaleDateString(undefined,{month:"short",day:"numeric"})} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#a5b4fc" radius={[4,4,0,0]} />
                  <Bar dataKey="sessions" fill="#38bdf8" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          }
        </CardContent>
      </Card>
    </motion.div>
  )
}
