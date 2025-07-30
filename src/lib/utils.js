import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
export const formatCurrency = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value)
export const formatNumber = (value) => new Intl.NumberFormat("en-US").format(value)
export const formatPercentage = (value) => `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`
