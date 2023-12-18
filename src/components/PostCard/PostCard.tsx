import { advents } from '@assets/Mock'
import './style.css'

import { FC } from 'react'

interface IPostCard {
  day: number
  setShow: (arg0: boolean) => void
}

export const PostCard: FC<IPostCard> = ({ day, setShow }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) {
      return
    }
    setShow(false)
  }
  return (
    <div onClick={handleClick} className="container">
      <div className="wrapper">
        <div className="lid one"></div>
        <div className="lid two"></div>
        <div className="envelope"></div>
        <div className="letter">
          <p className="title">{advents[day].title}</p>
          <span className="text"> {advents[day].text}</span>
        </div>
      </div>
    </div>
  )
}
