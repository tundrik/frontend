import React, { useEffect } from 'react'


export const rangeExtractor = range => {
  const start = Math.max(range.start - range.overscan, 0)
  const end = Math.min(range.end + range.overscan, range.size - 1)

  const arr = []

  for (let i = start; i <= end; i++) {
    arr.push(i)
  }

  return arr
}

export function useVirtual({
  size,
  estimateSize,
  overscan = 1,
  paddingStart = 0,
  paddingEnd = 0,
  positionStore = 0,
}) {

  const latestRef = React.useRef({
    scrollOffset: 0,
  })

  const measurements = React.useMemo(() => {
    const measurements = []
    for (let i = 0; i < size; i++) {
      const start = measurements[i - 1] ? measurements[i - 1].end : paddingStart
      const size = estimateSize
      const end = start + size
      measurements[i] = { index: i, start, size, end }
    }
    return measurements
  }, [size])

  const totalSize = (measurements[size - 1]?.end || 0) + paddingEnd

  latestRef.current.measurements = measurements
  latestRef.current.totalSize = totalSize

  const [range, setRange] = React.useState({ start: 0, end: 0 })

  useEffect(() => {
    
    const initRange = () => {
        setRange(prevRange => calculateRange(latestRef.current, prevRange))
    } 
    
    const onScroll = event => {
      latestRef.current.scrollOffset = window.pageYOffset
      requestAnimationFrame(initRange)
    }
    
    requestAnimationFrame(initRange)

    document.addEventListener('scroll', onScroll, {
      capture: false,
      passive: true,
    })

    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [])


  const virtualItems = React.useMemo(() => {
    const indexes = rangeExtractor({
      start: range.start,
      end: range.end,
      overscan,
      size: measurements.length,
    })

    const virtualItems = []

    for (let k = 0, len = indexes.length; k < len; k++) {
      const i = indexes[k]
      const measurement = measurements[i]
      virtualItems.push(measurement)
    }

    return virtualItems
  }, [
    measurements,
    overscan,
    range.end,
    range.start,
    rangeExtractor,
  ])
  return {
    virtualItems,
    totalSize,
  }
}

const findNearestBinarySearch = (low, high, getCurrentValue, value) => {
  while (low <= high) {
    let middle = ((low + high) / 2) | 0
    let currentValue = getCurrentValue(middle)

    if (currentValue < value) {
      low = middle + 1
    } else if (currentValue > value) {
      high = middle - 1
    } else {
      return middle
    }
  }

  if (low > 0) {
    return low - 1
  } else {
    return 0
  }
}

function calculateRange({ measurements, outerSize, scrollOffset }, prevRange) {
  const size = measurements.length - 1
  const getOffset = index => measurements[index].start

  let start = findNearestBinarySearch(0, size, getOffset, scrollOffset)
  let end = start
  while (end < size && measurements[end].end < scrollOffset + document.documentElement.clientHeight) {
    end++
  }
  if (prevRange.end !== end) { //prevRange.start !== start || 
    return { start, end }
  }

  return prevRange
}