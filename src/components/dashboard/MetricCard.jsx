import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { TrendingUp, TrendingDown, Sparkles } from "lucide-react"
import { formatCurrency, formatNumber, formatPercentage, cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Skeleton from "../ui/skeleton"

export default function MetricCard({ title, value, change, trend, type = "number", icon: Icon, gradient, index = 0, loading }) {
  const formatValue = (val, type) => {
    switch (type) {
      case "currency": return formatCurrency(val)
      case "percentage": return `${val.toFixed(1)}%`
      default: return formatNumber(val)
    }
  }
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.04, rotateY: 4, boxShadow: "0 8px 20px #6366f180" }}
      transition={{ type: "spring", delay: index * .09 }}
    >
      <Card className={cn("relative overflow-hidden cursor-pointer transition", gradient && "text-white", "min-h-[135px]")}>
        {gradient && <div className={cn("absolute inset-0 z-0", gradient, "opacity-95")} />}
        <div className={cn("relative z-10", gradient && "text-white")}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className={cn("text-xs tracking-wider", gradient && "text-white/90")}>{title}</CardTitle>
            {Icon && <motion.span whileHover={{ rotate: 16 }}><Icon className={cn("h-5 w-5", gradient ? "text-white/90" : "text-blue-400")} /></motion.span>}
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2 h-9 font-mono">
              {loading ? <Skeleton className="w-20 h-7" /> : formatValue(value, type)}
            </div>
            <div className={cn("flex items-center text-xs mt-1")}>
              {trend === "up" ? <TrendingUp className="mr-1 h-4 w-4 text-emerald-400" /> : <TrendingDown className="mr-1 h-4 w-4 text-red-400" />}
              <span className={trend === "up" ? "text-emerald-500 font-semibold" : "text-red-500 font-semibold"}>
                {loading ? <Skeleton className="w-10 h-4" /> : formatPercentage(change)}
              </span>
              <span className={gradient ? "text-white/70 ml-1" : "text-gray-400 ml-1"}>vs last week</span>
              <span><Sparkles className="h-3 w-3 ml-1 text-yellow-400 animate-pulse" /></span>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}
