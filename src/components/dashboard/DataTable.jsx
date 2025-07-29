import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, Search, Download } from "lucide-react"
import { motion } from "framer-motion"

const DataTable = ({ data, title, description }) => {
  const [sortField, setSortField] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0
    
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
    }
    
    return sortDirection === 'asc' 
      ? aValue.toString().localeCompare(bValue.toString())
      : bValue.toString().localeCompare(aValue.toString())
  })

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronDown className="w-4 h-4 opacity-50" />
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <Card className="glass-effect">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-gradient">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" className="glass-card border-white/30">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </motion.div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 glass-card border-white/30"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th 
                    className="text-left p-4 cursor-pointer hover:bg-white/5 transition-colors rounded-lg"
                    onClick={() => handleSort('page')}
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      Page
                      <SortIcon field="page" />
                    </div>
                  </th>
                  <th 
                    className="text-left p-4 cursor-pointer hover:bg-white/5 transition-colors rounded-lg"
                    onClick={() => handleSort('views')}
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      Views
                      <SortIcon field="views" />
                    </div>
                  </th>
                  <th 
                    className="text-left p-4 cursor-pointer hover:bg-white/5 transition-colors rounded-lg"
                    onClick={() => handleSort('bounce')}
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      Bounce Rate
                      <SortIcon field="bounce" />
                    </div>
                  </th>
                  <th 
                    className="text-left p-4 cursor-pointer hover:bg-white/5 transition-colors rounded-lg"
                    onClick={() => handleSort('duration')}
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      Avg. Duration
                      <SortIcon field="duration" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-all duration-200 group"
                  >
                    <td className="p-4 font-medium font-mono group-hover:text-blue-400 transition-colors">
                      {item.page}
                    </td>
                    <td className="p-4 font-semibold">
                      {item.views.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.bounce < 25 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300' :
                          item.bounce < 40 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}
                      >
                        {item.bounce.toFixed(1)}%
                      </motion.span>
                    </td>
                    <td className="p-4 font-mono font-semibold text-blue-600 dark:text-blue-400">
                      {item.duration}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
              <p className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} results
              </p>
              <div className="flex gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="glass-card border-white/30"
                  >
                    Previous
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="glass-card border-white/30"
                  >
                    Next
                  </Button>
                </motion.div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default DataTable
