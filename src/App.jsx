import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/Card"
import { Button } from "./components/ui/Button"
import { ThemeToggle } from "./components/ui/Themetoggle"
import MetricCard from './components/dashboard/MetricCard'
import RevenueChart from './components/charts/RevenueChart'
import UserActivityChart from './components/charts/UserActivityChart'
import TrafficSourcesChart from './components/charts/TrafficSourcesChart'
import DataTable from './components/dashboard/DataTable'
import { 
  mockAnalyticsData, 
  topPagesData, 
  trafficSourcesData, 
  getMetricsData 
} from './data/mockData'
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  BarChart3, 
  Sparkles,
  RefreshCw,
  Download,
  Calendar,
  Bell,
  Settings,
  Zap,
  Star,
  Activity
} from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import toast, { Toaster } from 'react-hot-toast'

function App() {
  const [metricsData, setMetricsData] = useState(getMetricsData())
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [notifications, setNotifications] = useState(3)

  const refreshData = async () => {
    setIsRefreshing(true)
    toast.loading('Refreshing data...', { id: 'refresh' })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setMetricsData(getMetricsData())
    setIsRefreshing(false)
    
    toast.success('Data refreshed successfully!', { id: 'refresh' })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 overflow-x-hidden">
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'glass-card border-white/30',
          duration: 3000,
        }}
      />
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative border-b glass-effect sticky top-0 z-50 backdrop-blur-xl"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <motion.h1 
                  className="text-3xl font-bold text-gradient"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
                >
                  ADmyBRAND Insights
                </motion.h1>
                <motion.p 
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  AI-Powered Analytics Dashboard
                </motion.p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={refreshData}
                  disabled={isRefreshing}
                  className="glass-card border-white/30 hover:shadow-glow"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="outline" size="sm" className="glass-card border-white/30 hover:shadow-glow">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="outline" size="sm" className="glass-card border-white/30 hover:shadow-glow">
                  <Calendar className="w-4 h-4 mr-2" />
                  Last 30 days
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-4 h-4" />
                  {notifications > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {notifications}
                    </motion.span>
                  )}
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </motion.div>
              
              <ThemeToggle />
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Hero Banner */}
          <motion.div
            variants={itemVariants}
            className="text-center py-8"
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-gradient mb-4"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            >
              Welcome to the Future
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Experience analytics like never before with our AI-powered insights
            </motion.p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 150 }}
            >
              <Button size="lg" className="gradient-primary text-white shadow-2xl hover:shadow-glow-lg px-8 py-4 text-lg">
                <Zap className="w-5 h-5 mr-2" />
                Get Started
              </Button>
            </motion.div>
          </motion.div>

          {/* Metrics Cards */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Revenue"
                value={metricsData.revenue.current}
                change={metricsData.revenue.change}
                trend={metricsData.revenue.trend}
                type="currency"
                icon={DollarSign}
                gradient="gradient-primary"
                index={0}
              />
              <MetricCard
                title="Active Users"
                value={metricsData.users.current}
                change={metricsData.users.change}
                trend={metricsData.users.trend}
                icon={Users}
                gradient="gradient-secondary"
                index={1}
              />
              <MetricCard
                title="Conversions"
                value={metricsData.conversions.current}
                change={metricsData.conversions.change}
                trend={metricsData.conversions.trend}
                icon={TrendingUp}
                gradient="gradient-success"
                index={2}
              />
              <MetricCard
                title="Conversion Rate"
                value={metricsData.conversionRate.current}
                change={metricsData.conversionRate.change}
                trend={metricsData.conversionRate.trend}
                type="percentage"
                icon={BarChart3}
                gradient="gradient-warning"
                index={3}
              />
            </div>
          </motion.div>

          {/* Charts Row */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RevenueChart data={mockAnalyticsData} />
              <UserActivityChart data={mockAnalyticsData} />
            </div>
          </motion.div>

          {/* Second Charts Row */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <TrafficSourcesChart data={trafficSourcesData} />
              </div>
              <div className="lg:col-span-2">
                <DataTable 
                  data={topPagesData} 
                  title="Top Pages"
                  description="Most visited pages with performance metrics"
                />
              </div>
            </div>
          </motion.div>

          {/* Real-time Updates Banner */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="glass-card border-emerald-200/50 dark:border-emerald-800/50 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10"></div>
              <CardContent className="relative flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="w-3 h-3 bg-emerald-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div>
                    <p className="font-medium flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Live Data Stream Active
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Dashboard updates automatically every 30 seconds
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    Last updated: {new Date().toLocaleTimeString()}
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Star className="w-5 h-5 text-yellow-500" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            <Card className="glass-card text-center p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 }}
                className="text-4xl font-bold text-gradient mb-2"
              >
                99.9%
              </motion.div>
              <p className="text-muted-foreground">Uptime</p>
            </Card>
            <Card className="glass-card text-center p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
                className="text-4xl font-bold text-gradient mb-2"
              >
                2.4s
              </motion.div>
              <p className="text-muted-foreground">Avg Response Time</p>
            </Card>
            <Card className="glass-card text-center p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2 }}
                className="text-4xl font-bold text-gradient mb-2"
              >
                500K+
              </motion.div>
              <p className="text-muted-foreground">Data Points</p>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}

export default App
