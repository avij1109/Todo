import React from "react"
import "./Intro.css"
import { redirect } from "react-router-dom"
import {useNavigate} from "react-router-dom"
import illustrate from '../../assets/illustrate.png'
const Intro = () => {
  const navigate = useNavigate();
  const redirectToSignup = () => {
    navigate("/signup")
  }

  return (
    <div className="intro-container">
      <div className="intro-content">
        <h1 className="intro-title">
          Welcome to <span className="highlight">TODO</span>
        </h1>
        <p className="intro-subtitle">Organize your life, one task at a time</p>
        <button className="intro-button" onClick={redirectToSignup}>Get Started</button>
      </div>
      <div className="intro-image">
        <img src={illustrate} alt="TODO App Illustration" className="illus"/>
      </div>
    </div>
  )
}

export default Intro

