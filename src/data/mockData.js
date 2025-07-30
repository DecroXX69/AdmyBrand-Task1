import { format, subDays, eachDayOfInterval } from 'date-fns'

// Generate realistic mock data with more variation
export const generateMockData = () => {
  const now = new Date()
  const startDate = subDays(now, 30)
  const days = eachDayOfInterval({ start: startDate, end: now })
  
  // Add more randomness for visible changes
  const baseRevenue = 15000 + Math.floor(Math.random() * 20000)
  const baseUsers = 800 + Math.floor(Math.random() * 1500)
  const baseConversions = 80 + Math.floor(Math.random() * 200)
  const baseSessions = 1500 + Math.floor(Math.random() * 3000)

  return days.map((date, index) => ({
    date: format(date, 'yyyy-MM-dd'),
    revenue: baseRevenue + Math.floor(Math.random() * 25000) + (index * (300 + Math.random() * 400)),
    users: baseUsers + Math.floor(Math.random() * 2800) + (index * (15 + Math.random() * 35)),
    conversions: baseConversions + Math.floor(Math.random() * 180) + (index * (2 + Math.random() * 8)),
    sessions: baseSessions + Math.floor(Math.random() * 4500) + (index * (25 + Math.random() * 75)),
    bounceRate: 15 + Math.random() * 35,
    avgSessionDuration: 90 + Math.random() * 240,
  }))
}

// Generate dynamic mock data function instead of static export
export const getMockAnalyticsData = () => generateMockData()

// Generate dynamic top pages data with variations
export const generateTopPagesData = () => {
  const basePages = [
    { page: '/dashboard', baseViews: 42000, baseBounce: 20, baseDuration: '3:30' },
    { page: '/analytics', baseViews: 35000, baseBounce: 15, baseDuration: '4:00' },
    { page: '/campaigns', baseViews: 28000, baseBounce: 28, baseDuration: '2:45' },
    { page: '/reports', baseViews: 19000, baseBounce: 25, baseDuration: '3:10' },
    { page: '/settings', baseViews: 14000, baseBounce: 42, baseDuration: '1:25' },
    { page: '/integrations', baseViews: 11500, baseBounce: 32, baseDuration: '2:35' },
    { page: '/team', baseViews: 8500, baseBounce: 38, baseDuration: '1:50' },
    { page: '/billing', baseViews: 6800, baseBounce: 48, baseDuration: '1:05' },
  ]

  return basePages.map(item => ({
    page: item.page,
    views: item.baseViews + Math.floor(Math.random() * 8000) - 4000,
    bounce: Math.max(5, item.baseBounce + (Math.random() - 0.5) * 15),
    duration: item.baseDuration // You could randomize this too if needed
  }))
}

// Generate dynamic traffic sources with slight variations
export const generateTrafficSourcesData = () => {
  const variation = () => Math.random() * 6 - 3 // -3 to +3 variation
  
  return [
    { name: 'Organic Search', value: Math.max(30, 45.2 + variation()), color: '#3b82f6' },
    { name: 'Direct', value: Math.max(15, 28.7 + variation()), color: '#8b5cf6' },
    { name: 'Social Media', value: Math.max(8, 15.3 + variation()), color: '#10b981' },
    { name: 'Email', value: Math.max(3, 8.1 + variation()), color: '#f59e0b' },
    { name: 'Referral', value: Math.max(1, 2.7 + variation()), color: '#ef4444' },
  ].map(item => ({
    ...item,
    value: parseFloat(item.value.toFixed(1))
  }))
}

export const campaignPerformanceData = [
  { campaign: 'Summer Sale 2024', impressions: 2340000, clicks: 89340, ctr: 3.82, cost: 15420, conversions: 1243 },
  { campaign: 'Brand Awareness Q2', impressions: 1890000, clicks: 67230, ctr: 3.56, cost: 12890, conversions: 892 },
  { campaign: 'Product Launch', impressions: 1560000, clicks: 78450, ctr: 5.03, cost: 18920, conversions: 1456 },
  { campaign: 'Retargeting Campaign', impressions: 890000, clicks: 45230, ctr: 5.08, cost: 8940, conversions: 789 },
  { campaign: 'Holiday Special', impressions: 2100000, clicks: 94500, ctr: 4.5, cost: 21340, conversions: 1678 },
]

// Updated metrics calculator that takes data as parameter
export const getMetricsData = (analyticsData) => {
  const latestData = analyticsData[analyticsData.length - 1]
  const previousData = analyticsData[analyticsData.length - 8] // 7 days ago
  
  return {
    revenue: {
      current: latestData.revenue,
      change: ((latestData.revenue - previousData.revenue) / previousData.revenue * 100),
      trend: latestData.revenue > previousData.revenue ? 'up' : 'down'
    },
    users: {
      current: latestData.users,
      change: ((latestData.users - previousData.users) / previousData.users * 100),
      trend: latestData.users > previousData.users ? 'up' : 'down'
    },
    conversions: {
      current: latestData.conversions,
      change: ((latestData.conversions - previousData.conversions) / previousData.conversions * 100),
      trend: latestData.conversions > previousData.conversions ? 'up' : 'down'
    },
    conversionRate: {
      current: (latestData.conversions / latestData.users * 100),
      change: ((latestData.conversions / latestData.users * 100) - (previousData.conversions / previousData.users * 100)),
      trend: (latestData.conversions / latestData.users) > (previousData.conversions / previousData.users) ? 'up' : 'down'
    }
  }
}
