import { useEffect, useState } from 'react'

const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
]

const getDateDiffs = (date) => {
  const now = Date.now()
  const timestamp = Date.parse(date)
  const diff = (timestamp - now) / 1000

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(diff) > secondsInUnit || unit === 'second') {
      const value = Math.floor(diff / secondsInUnit)
      return { value, unit }
    }
  }
}

export default function useTimeAgo(timestamp, createdAt) {
  // if (timestamp === createdAt) {
  //   return ''
  // }
  const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp))
  const rft = new Intl.RelativeTimeFormat('en', {
    style: 'short'
  })

  useEffect(() => {
    const timeout = setInterval(() => {
      const newTimeago = getDateDiffs(timestamp)
      setTimeago(newTimeago)
    }, 10000)
    return () => clearTimeout(timeout)
  }, [timestamp])
  const { value, unit } = timeago
  return rft.format(value, unit)
}
