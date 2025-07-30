import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { ChevronDown, ChevronUp, Search, Download, FileText } from "lucide-react"
import { motion } from "framer-motion"
import Skeleton from "../ui/skeleton"
import Papa from "papaparse"

export default function DataTable({ data, title, description, loading }) {
  const [sortField, setSortField] = useState(null)
  const [sortDirection, setSortDirection] = useState("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const handleSort = (field) => {
    if (sortField === field) setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    else { setSortField(field); setSortDirection("asc") }
  }
  const filteredData = data.filter(item => Object.values(item).some(value => value.toString().toLowerCase().includes(searchTerm.toLowerCase())))
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0
    const aVal = a[sortField], bVal = b[sortField]
    return typeof aVal === "number" ? (sortDirection === "asc" ? aVal - bVal : bVal - aVal)
    : (sortDirection === "asc" ? aVal.toString().localeCompare(bVal.toString()) : bVal.toString().localeCompare(aVal.toString()))
  })
  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)

  function exportCSV() {
    const csv = Papa.unparse(data)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.setAttribute("download", "analytics.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .6 }}>
      <Card className="glass-effect">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={exportCSV}><Download className="w-4 h-4 mr-1" />Export CSV</Button>
              <Button variant="outline" size="sm" disabled><FileText className="w-4 h-4 mr-1" />PDF (soon)</Button>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-300" />
              <Input placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
  <tr>
    {["page","views","bounce","duration"].map(field => (
      <th
        key={field}
        className="text-left p-3 cursor-pointer data-table-header-cell"
        onClick={() => handleSort(field)}
        style={{ fontWeight: 600, fontSize: "15px" }}
      >
        <div className="flex items-center gap-2 capitalize">
          {field}
          {sortField !== field 
            ? <ChevronDown className="w-4 h-4 opacity-50" />
            : (sortDirection === "asc"
              ? <ChevronUp className="w-4 h-4" />
              : <ChevronDown className="w-4 h-4" />)}
        </div>
      </th>
    ))}
  </tr>
</thead>
<tbody>
  {loading
    ? Array.from({ length: itemsPerPage }).map((_, i) => (
        <tr key={i}>
          {["a", "b", "c", "d"].map((_, ii) => (
            <td key={ii}><Skeleton className="h-6 w-20 mt-1 mb-1" /></td>
          ))}
        </tr>
      ))
    : paginatedData.map((item, idx) => (
        <motion.tr 
          key={idx}
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 24 }}
          transition={{ delay: idx * .07 }}
          className="border-b has-hover"
        >
                      <td className="p-3 font-mono">{item.page}</td>
                      <td className="p-3">{item.views.toLocaleString()}</td>
                      <td className="p-3">
                        <span className={`px-2 py-[2px] rounded text-xs font-semibold ${
                          item.bounce < 25 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200' :
                          item.bounce < 40 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                        }`}>{item.bounce.toFixed(1)}%</span>
                      </td>
                      <td className="p-3 font-mono">{item.duration}</td>
                    </motion.tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-5">
            <p className="footer-muted text-xs">
  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} results
</p>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Previous</Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
