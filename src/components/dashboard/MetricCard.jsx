import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Sparkles } from "lucide-react"
import { formatCurrency, formatNumber, formatPercentage, cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const MetricCard = ({ title, value, change, trend, type = "number", icon: Icon, gradient, index = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0)
  
  useEffect(() => {
    // Animate the value counting up
    const timer = setTimeout(() => {
      setDisplayValue(value)
    }, index * 200)
    
    return () => clearTimeout(timer)
  }, [value, index])

  const formatValue = (val, type) => {
    switch (type) {
      case 'currency':
        return formatCurrency(val)
      case 'percentage':
        return `${val.toFixed(1)}%`
      default:
        return formatNumber(val)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      className="h-full perspective-1000"
    >
      <Card className={cn(
        "relative overflow-hidden h-full cursor-pointer group",
        "border-0 shadow-2xl hover:shadow-glow-lg transition-all duration-500",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        "before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000",
        gradient && "text-white"
      )}>
        {gradient && (
          <div className={cn("absolute inset-0", gradient)} />
        )}
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className={cn("relative z-10", gradient && "text-white")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={cn(
              "text-sm font-medium transition-all duration-300",
              gradient && "text-white/90"
            )}>
              {title}
            </CardTitle>
            <div className="relative">
              {Icon && (
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className={cn(
                    "h-5 w-5 transition-all duration-300 group-hover:scale-110",
                    gradient ? "text-white/80" : "text-muted-foreground"
                  )} />
                </motion.div>
              )}
              <div className="absolute -top-1 -right-1">
                <Sparkles className="h-3 w-3 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <motion.div 
              className="text-3xl font-bold mb-2 font-mono"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: index * 0.2 + 0.5,
                type: "spring",
                stiffness: 150
              }}
            >
              <motion.span
                key={displayValue}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {formatValue(displayValue, type)}
              </motion.span>
            </motion.div>
            
            <motion.div 
              className={cn("flex items-center text-xs", gradient && "text-white/80")}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 + 0.7 }}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="mr-1"
              >
                {trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-emerald-400 drop-shadow-lg" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400 drop-shadow-lg" />
                )}
              </motion.div>
              <span className={cn(
                "font-semibold",
                trend === 'up' 
                  ? 'text-emerald-400 dark:text-emerald-300' 
                  : 'text-red-400 dark:text-red-300',
                gradient && 'text-white/90'
              )}>
                {formatPercentage(change)}
              </span>
              <span className={cn(
                "ml-1 font-medium",
                gradient ? "text-white/70" : "text-muted-foreground"
              )}>
                vs last week
              </span>
            </motion.div>

            {/* Progress bar animation */}
            <div className="mt-3 h-1 bg-black/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white/30 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(Math.abs(change) * 10, 100)}%` }}
                transition={{ delay: index * 0.2 + 1, duration: 1 }}
              />
            </div>
          </CardContent>
        </div>

        {/* Glow effect on hover */}
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          "bg-gradient-to-r from-transparent via-white/5 to-transparent",
          "animate-pulse-glow"
        )} />
      </Card>
    </motion.div>
  )
}

export default MetricCard
