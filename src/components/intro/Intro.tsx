import React from "react"
import "./Intro.css"

const Intro = () => {
  return (
    <div className="intro-container">
      <div className="intro-content">
        <h1 className="intro-title">
          Welcome to <span className="highlight">TODO</span>
        </h1>
        <p className="intro-subtitle">Organize your life, one task at a time</p>
        <button className="intro-button">Get Started</button>
      </div>
      <div className="intro-image">
        <img src="/placeholder.svg?height=300&width=300" alt="TODO App Illustration" />
      </div>
    </div>
  )
}

export default Intro

