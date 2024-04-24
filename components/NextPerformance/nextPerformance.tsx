import { useEffect, useState } from 'react'

const NextPerformance = () => {
  const [byte, setByte] = useState<string>('1kb')

  useEffect(() => {
    const nextElement: HTMLElement | null = document.getElementById('__NEXT_DATA__')

    if (nextElement) {
      const text: string = nextElement.innerText || ''
      const size: number = unescape(encodeURIComponent(text)).length / 1000

      if (size > 128) {
        console.info(
          `%cThe ssr props size: %c${size.toFixed(1)}kB`,
          'color: red',
          'color: red;font-weight:bold'
        )
      } else {
        console.info(
          `%cThe ssr props size: %c${size.toFixed(1)}kB`,
          'color: green',
          'color: green;font-weight:bold'
        )
      }
      setByte(`${size.toFixed(1)}kB`)
    }
  }, [])

  return (
    <div id="performace" style={{ display: 'none ' }}>
      {byte}
    </div>
  )
}

export default NextPerformance
