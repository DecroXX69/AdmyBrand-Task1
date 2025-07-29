import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'

// Generate realistic mock data
export const generateMockData = () => {
  const now = new Date()
  const startDate = subDays(now, 30)
  const days = eachDayOfInterval({ start: startDate, end: now })

  return days.map((date, index) => ({
    date: format(date, 'yyyy-MM-dd'),
    revenue: Math.floor(Math.random() * 50000) + 20000 + (index * 500),
    users: Math.floor(Math.random() * 5000) + 1000 + (index * 50),
    conversions: Math.floor(Math.random() * 500) + 100 + (index * 5),
    sessions: Math.floor(Math.random() * 10000) + 2000 + (index * 100),
    bounceRate: Math.random() * 30 + 20,
    avgSessionDuration: Math.random() * 300 + 120,
  }))
}

export const mockAnalyticsData = generateMockData()

export const topPagesData = [
  { page: '/dashboard', views: 45230, bounce: 23.4, duration: '3:45' },
  { page: '/analytics', views: 38902, bounce: 18.2, duration: '4:12' },
  { page: '/campaigns', views: 29384, bounce: 31.6, duration: '2:58' },
  { page: '/reports', views: 21039, bounce: 28.9, duration: '3:21' },
  { page: '/settings', views: 15492, bounce: 45.2, duration: '1:34' },
  { page: '/integrations', views: 12847, bounce: 35.7, duration: '2:45' },
  { page: '/team', views: 9384, bounce: 41.3, duration: '1:58' },
  { page: '/billing', views: 7293, bounce: 52.1, duration: '1:12' },
]

export const trafficSourcesData = [
  { name: 'Organic Search', value: 45.2, color: '#3b82f6' },
  { name: 'Direct', value: 28.7, color: '#8b5cf6' },
  { name: 'Social Media', value: 15.3, color: '#10b981' },
  { name: 'Email', value: 8.1, color: '#f59e0b' },
  { name: 'Referral', value: 2.7, color: '#ef4444' },
]

export const campaignPerformanceData = [
  { campaign: 'Summer Sale 2024', impressions: 2340000, clicks: 89340, ctr: 3.82, cost: 15420, conversions: 1243 },
  { campaign: 'Brand Awareness Q2', impressions: 1890000, clicks: 67230, ctr: 3.56, cost: 12890, conversions: 892 },
  { campaign: 'Product Launch', impressions: 1560000, clicks: 78450, ctr: 5.03, cost: 18920, conversions: 1456 },
  { campaign: 'Retargeting Campaign', impressions: 890000, clicks: 45230, ctr: 5.08, cost: 8940, conversions: 789 },
  { campaign: 'Holiday Special', impressions: 2100000, clicks: 94500, ctr: 4.5, cost: 21340, conversions: 1678 },
]

export const getMetricsData = () => {
  const latestData = mockAnalyticsData[mockAnalyticsData.length - 1]
  const previousData = mockAnalyticsData[mockAnalyticsData.length - 8] // 7 days ago
  
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
      change: 2.4,
      trend: 'up'
    }
  }
}
