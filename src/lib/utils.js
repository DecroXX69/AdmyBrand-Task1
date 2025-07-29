import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export const formatNumber = (value) => {
  return new Intl.NumberFormat('en-US').format(value)
}

export const formatPercentage = (value) => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`
}
