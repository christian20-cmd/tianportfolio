import { useState, useEffect, useRef } from 'react'

function useScrollDirection() {
  const [scrollY, setScrollY] = useState(0)
  const [direction, setDirection] = useState('up')
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setDirection(currentScrollY > lastScrollY.current ? 'down' : 'up')
      setScrollY(currentScrollY)
      lastScrollY.current = currentScrollY
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scrollY, direction }
}

export default useScrollDirection