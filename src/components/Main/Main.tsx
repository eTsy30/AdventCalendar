import { PostCard } from '@components/PostCard/PostCard'
import './style.css'

import React, { useEffect, useState } from 'react'

export const Main = () => {
  const [day, setDay] = useState<number>(0)
  const [showSandBox, setShow] = useState<boolean>(false)
  const [index, setIndex] = useState<number>(0)
  const [isVisible, setIsVisible] = useState(false)
  const [currentDayPerMonth, setCurrentDayPerMonth] = useState<number>(0)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  useEffect(() => {
    const date = new Date()
    const currentDay = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const daysInCurrentMonth = new Date(year, month, 0).getDate()

    setCurrentDayPerMonth(daysInCurrentMonth)
    setDay(currentDay)
    console.log(new Date(year, month, 0).getDate())

    if (month === 9) {
      const openPastWindows = (adventwindow: number) => {
        if (currentDay !== adventwindow && adventwindow < currentDay) {
          setTimeout(
            () => {
              const doors = document.querySelectorAll('.door')
              if (doors[adventwindow - 1]) {
                doors[adventwindow - 1].classList.add('open')
              }
            },
            200 * (adventwindow - 1)
          )
        }
      }

      for (let i = 1; i <= currentDayPerMonth; i++) {
        openPastWindows(i)
      }
    }
  }, [day])

  const handleClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    adventwindow: number
  ) => {
    e?.preventDefault
    const doors = document.getElementsByClassName('door')
    if (adventwindow + 1 > day) return
    if (adventwindow < day) {
      if (doors[adventwindow]) {
        doors[adventwindow].classList.toggle('open')
        doors[adventwindow].classList.remove('current', 'jiggle')
      }
    } else {
      if (
        doors[adventwindow] &&
        !doors[adventwindow].classList.contains('open')
      ) {
        doors[adventwindow].classList.add('open')
      }
      setIndex(adventwindow + 1)
    }
  }

  const actualClass = (index: number) => {
    return day === index + 1 ? 'current door jiggle' : 'door'
  }

  useEffect(() => {
    document.body.style.overflow = showSandBox ? 'hidden' : ''
  }, [showSandBox])

  return (
    <div>
      <h1>Наш календарь свиданий</h1>
      <ul>
        {Array.from({ length: currentDayPerMonth }, (_, index) => (
          <React.Fragment key={index + 1}>
            <li onClick={(e) => handleClick(e, index)} key={index + 1}>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setIndex(index)
                  setShow(!showSandBox)
                  scrollToTop()
                }}
                style={{ display: isVisible ? '' : '' }}
              >
                {index + 1}
              </button>
              <div className={`door ${actualClass(index)}`}>{index + 1}</div>
            </li>
          </React.Fragment>
        ))}
      </ul>

      {showSandBox && <PostCard day={index} setShow={setShow} />}
    </div>
  )
}
