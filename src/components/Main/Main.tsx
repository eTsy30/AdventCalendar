import { PostCard } from '@components/PostCard/PostCard'
import './style.css'

import React, { useEffect, useState } from 'react'

export const Main = () => {
  const [day, setDay] = useState<number>(0)
  const [showSandBox, setShow] = useState<boolean>(false)
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    const date = new Date()
    const currentDay = date.getDate()
    const month = date.getMonth() + 1

    setDay(currentDay)

    if (month === 12) {
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

      for (let i = 1; i <= 31; i++) {
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
      <h1>Merry Christmas</h1>
      <ul>
        {Array.from({ length: 31 }, (_, index) => (
          <React.Fragment key={index + 1}>
            <li onClick={(e) => handleClick(e, index)} key={index + 1}>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setIndex(index)
                  setShow(!showSandBox)
                }}
              >
                {index + 1}
              </button>
              <div className={`door ${actualClass(index)}`}>{index + 1}</div>
            </li>
          </React.Fragment>
        ))}
      </ul>

      {showSandBox && <PostCard day={index} setShow={setShow} />}
      <div className="sotial">
        <a href="https://github.com/eTsy30">
          <i className="fa-brands fa-github"></i>
        </a>
        <a href="https://t.me/etsig">
          <i className="fa-brands fa-telegram"></i>
        </a>
        <a href="https://drive.google.com/file/d/1wNYg0LF0a55Zd--woejUB1Qg5HDmMyVj/view?pli=1">
          <i className="fa-solid fa-user-tie"></i>
        </a>
      </div>
    </div>
  )
}
