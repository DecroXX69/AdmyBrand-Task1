import { useEffect, useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/Card"
import { Settings } from "lucide-react"
import { Button } from "./components/ui/Button"
import { ThemeToggle } from "./components/ui/Themetoggle"
import MetricCard from "./components/dashboard/MetricCard"
import RevenueChart from "./components/charts/RevenueChart"
import UserActivityChart from "./components/charts/UserActivityChart"
import TrafficSourcesChart from "./components/charts/TrafficSourcesChart"
import DataTable from "./components/dashboard/DataTable"
import { getMockAnalyticsData, generateTopPagesData, generateTrafficSourcesData, getMetricsData } from "./data/mockData"
import { DollarSign, Users, TrendingUp, BarChart3, Sparkles, RefreshCw, Download, Calendar, Bell, Star, Activity } from "lucide-react"
import { motion } from "framer-motion"
import toast, { Toaster } from "react-hot-toast"
import Papa from "papaparse"

export default function App() {
  // Initialize with fresh data
  const [mockAnalyticsData, setMockAnalyticsData] = useState(getMockAnalyticsData())
  const [topPagesData, setTopPagesData] = useState(generateTopPagesData())
  const [trafficSourcesData, setTrafficSourcesData] = useState(generateTrafficSourcesData())
  const [metricsData, setMetricsData] = useState(() => getMetricsData(getMockAnalyticsData()))
  const [loading, setLoading] = useState(true)
  const [realTime, setRealTime] = useState(Date.now())

  // Function to refresh all data
  const refreshAllData = useCallback(() => {
    const newAnalyticsData = getMockAnalyticsData()
    const newTopPagesData = generateTopPagesData()
    const newTrafficSourcesData = generateTrafficSourcesData()
    const newMetricsData = getMetricsData(newAnalyticsData)
    
    setMockAnalyticsData(newAnalyticsData)
    setTopPagesData(newTopPagesData)
    setTrafficSourcesData(newTrafficSourcesData)
    setMetricsData(newMetricsData)
  }, [])

  // Simulate async data load, then auto-refresh each 30s
  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [realTime])

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setRealTime(Date.now())
      refreshAllData()
      toast.custom(
        <span>
          <span className="inline-block w-2 h-2 rounded-full live-dot mr-1"/>
          Real-time update - New data loaded!
        </span>, 
        { duration: 2000, icon: <Activity className="w-4 h-4 text-sky-400 animate-spin" /> }
      )
    }, 30000)
    return () => clearInterval(id)
  }, [refreshAllData])

  const handleRefresh = useCallback(() => {
    setLoading(true)
    toast.loading("Refreshing with new data...", { id: "refresh" })
    setTimeout(() => {
      refreshAllData()
      setLoading(false)
      toast.success("Fresh data loaded successfully!", { id: "refresh" })
    }, 900)
  }, [refreshAllData])

  // Export function for navbar export button
  function exportNavbarCSV() {
    const csv = Papa.unparse(topPagesData)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.setAttribute("download", "top-pages.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success("CSV exported successfully!")
  }

  return (
    <div className="min-h-screen w-full theme-background relative overflow-hidden">
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'glass-effect border-white/30',
          duration: 3000,
        }}
      />
      
      {/* Enhanced Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 theme-blob-primary rounded-full mix-blend-multiply animate-blob"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-96 h-96 theme-blob-secondary rounded-full mix-blend-multiply animate-blob animation-delay-2000"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 theme-blob-accent rounded-full mix-blend-multiply animate-blob animation-delay-4000"
          animate={{
            x: [0, 120, -60, 0],
            y: [0, -80, 40, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      {/* Animated top progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600"
          animate={{ scaleX: [0.99, 1.02, 0.99] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </div>

      {/* Header - Full Width */}
      <motion.header 
        initial={{ y: -24, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        className="sticky top-0 z-40 w-full"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4 glass-effect backdrop-blur-xl">
          <div className="flex items-center justify-between max-w-none">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gradient">ADmyBRAND Insights</h1>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">AI-Powered Analytics Dashboard</p>
              </div>
            </motion.div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleRefresh} 
                  disabled={loading}
                  className="hidden sm:flex button-outline"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleRefresh} 
                  disabled={loading}
                  className="sm:hidden button-outline"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="sm" variant="outline" onClick={exportNavbarCSV} className="hidden sm:flex button-outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button size="sm" variant="outline" onClick={exportNavbarCSV} className="sm:hidden button-outline">
                  <Download className="w-4 h-4" />
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="sm" variant="outline" className="relative button-outline">
                  <Bell className="w-4 h-4" />
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] px-1.5 py-px rounded-full border border-white"
                  >
                    3
                  </motion.span>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="sm" variant="outline" className="hidden sm:flex button-outline">
                  <Settings className="w-4 h-4" />
                </Button>
              </motion.div>
              
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content - Full Width with Responsive Padding */}
      <main className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8 lg:py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8 sm:py-12 mb-8"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          >
            Welcome to the Future
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto"
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
              <Star className="w-5 h-5 mr-2" />
              Get Started
            </Button>
          </motion.div>
        </motion.div>

        {/* Metrics Cards - Responsive Grid */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.3 }}
          className="mb-8 sm:mb-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
            <MetricCard
              title="Total Revenue"
              value={metricsData.revenue.current}
              change={metricsData.revenue.change}
              trend={metricsData.revenue.trend}
              type="currency"
              icon={DollarSign}
              gradient="gradient-primary"
              index={0}
              loading={loading}
            />
            <MetricCard
              title="Active Users"
              value={metricsData.users.current}
              change={metricsData.users.change}
              trend={metricsData.users.trend}
              icon={Users}
              gradient="gradient-secondary"
              index={1}
              loading={loading}
            />
            <MetricCard
              title="Conversions"
              value={metricsData.conversions.current}
              change={metricsData.conversions.change}
              trend={metricsData.conversions.trend}
              icon={TrendingUp}
              gradient="gradient-success"
              index={2}
              loading={loading}
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
              loading={loading}
            />
          </div>
        </motion.div>

        {/* Charts Section - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 max-w-7xl mx-auto">
          <RevenueChart data={mockAnalyticsData} loading={loading} />
          <UserActivityChart data={mockAnalyticsData} loading={loading} />
        </div>

        {/* Traffic Sources & Data Table - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12 max-w-7xl mx-auto">
          <div className="lg:col-span-1">
            <TrafficSourcesChart data={trafficSourcesData} loading={loading} />
          </div>
          <div className="lg:col-span-2">
            <DataTable 
              data={topPagesData} 
              title="Top Pages" 
              description="Most popular website pages" 
              loading={loading} 
            />
          </div>
        </div>

        {/* Real-time Banner */}
        <motion.div 
          initial={{ scale: 0.97, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="glass-effect border-2 border-emerald-200/50 dark:border-emerald-800/50 px-4 sm:px-8 py-4 sm:py-6 mb-8 max-w-7xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-3 h-3 bg-emerald-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div>
                <p className="font-semibold text-sm sm:text-base flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Live updates with fresh data variants
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground footer-text">
                  Every 30 seconds | Last updated: {new Date(realTime).toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="text-xs text-indigo-500 dark:text-indigo-300">
              ✨ Fresh data generated on each update
            </div>
          </div>
        </motion.div>

        {/* Footer Stats - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <Card className="glass-effect text-center p-6 sm:p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 }}
              className="text-3xl sm:text-4xl font-bold text-gradient mb-2"
            >
              99.9%
            </motion.div>
            <p className="text-sm text-muted-foreground footer-text">Uptime</p>
          </Card>
          <Card className="glass-effect text-center p-6 sm:p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 }}
              className="text-3xl sm:text-4xl font-bold text-gradient mb-2"
            >
              2.4s
            </motion.div>
            <p className="text-sm text-muted-foreground footer-text">Avg Response Time</p>
          </Card>
          <Card className="glass-effect text-center p-6 sm:p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2 }}
              className="text-3xl sm:text-4xl font-bold text-gradient mb-2"
            >
              500K+
            </motion.div>
            <p className="text-sm text-muted-foreground footer-text">Data Points</p>
          </Card>
        </div>
      </main>
    </div>
  )
}
