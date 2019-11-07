import React from "react"
import { Link } from "react-router-dom"
import "./menu-item.styles.scss"

const MenuItem = ({ title, imgUrl, size, url }) => (
  <div
    style={{
      backgroundImage: `url(${imgUrl})`,
    }}
    className={`${size} menu-item`}
  >
    <Link to={url}>
      <div className="content">
        <h2 className="title">{title.toUpperCase()}</h2>
        <span className="subtitle">Enter category</span>
      </div>
    </Link>
  </div>
)

export default MenuItem
