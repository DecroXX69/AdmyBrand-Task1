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
      refreshAllData() // Refresh all data with new variants
      toast.custom(
        <span>
          <span className="inline-block w-2 h-2 rounded-full live-dot mr-1"/>
          Real-time update - New data loaded!
        </span>, 
        { duration: 2000, icon: <Activity className="w-4 h-4 text-sky-400 animate-spin" /> }
      )
    }, 30000) // 30 seconds
    return () => clearInterval(id)
  }, [refreshAllData])

  const handleRefresh = useCallback(() => {
    setLoading(true)
    toast.loading("Refreshing with new data...", { id: "refresh" })
    setTimeout(() => {
      refreshAllData() // Generate fresh data
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
    <div className="min-h-screen relative overflow-x-hidden">
      <Toaster position="top-right" />
      {/* Animated responsive background "live" indicator */}
      <div className="fixed top-0 left-0 w-full h-0.5 z-50 pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-sky-300 via-indigo-400 to-purple-400"
          animate={{ scaleX: [0.99, 1.025, 0.99] }} transition={{ repeat: Infinity, duration: 2 }}
        />
      </div>
      {/* Header */}
      <motion.header initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between glass-effect backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-sky-400 flex items-center justify-center animate-spin-slow">
              <Sparkles className="w-4 h-4 text-white" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-gradient">ADmyBRAND Insights</h1>
              <p className="text-xs text-gray-400 pl-px">AI Analytics Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleRefresh} style={{ minWidth: 90 }} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </Button>
            <Button size="sm" variant="outline" onClick={exportNavbarCSV}>
              <Download className="w-4 h-4 mr-2" />
              <span>Export</span>
            </Button>
            <Button size="sm" variant="outline" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1.5 -right-2.5 bg-red-500 text-white text-[10px] px-1.5 py-px rounded-full border border-white">3</span>
            </Button>
            <Button size="sm" variant="outline">
              <Settings className="w-4 h-4" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </motion.header>
      {/* Main */}
      <main className="container mx-auto px-4 py-9">
        {/* Metrics */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.18}}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-7">
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
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mb-7">
          <RevenueChart data={mockAnalyticsData} loading={loading} />
          <UserActivityChart data={mockAnalyticsData} loading={loading} />
        </div>
        {/* Traffic sources and table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mb-10">
          <TrafficSourcesChart data={trafficSourcesData} loading={loading} />
          <div className="lg:col-span-2">
            <DataTable data={topPagesData} title="Top Pages" description="Most popular website pages" loading={loading} />
          </div>
        </div>
        {/* Real-time Banner */}
        <motion.div initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-effect border-2 border-blue-100 dark:border-indigo-900 px-8 py-5 mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 inline-block rounded-full live-dot animate-pulse" />
            <span className="font-semibold">Live updates with fresh data variants</span>
            <span className="text-xs text-gray-400 ml-1">Every 30 seconds | Last updated: {new Date(realTime).toLocaleTimeString()}</span>
          </span>
          <span className="text-xs text-indigo-500 dark:text-indigo-300">✨ Fresh data generated on each update</span>
        </motion.div>
      </main>
    </div>
  )
}
