import { format } from 'date-fns'
import { parseODataDate } from '../utils/dates'

// -- Dates ----------

export const dateRange = (
  to,
  from,
  odata = false,
  dateFormat = 'DD/MM/YYYY',
  separator = '-'
) => {
  const fromDate = odata ? new Date(parseODataDate(from)) : new Date(from)
  const toDate = odata ? new Date(parseODataDate(to)) : new Date(to)

  return `${format(fromDate, dateFormat)} ${separator} ${format(
    toDate,
    dateFormat
  )}`
}
