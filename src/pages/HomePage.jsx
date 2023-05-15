import React from "react"
import { Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"

const HomePage = () => {
  const { isLoggedIn, user, therapist } = useContext(AuthContext)
  const navigate = useNavigate()

  if (!isLoggedIn) {
    setTimeout(() => {
      navigate("/signup")
    }, 2000)

    return (
      <Container className="home-page">
        <p className="fade-in-out text-center text-white">How are you feeling today?</p>
      </Container>
    )
  } else if (isLoggedIn && user) {
    navigate("/posts")
  } else if (isLoggedIn && therapist) {
    navigate("/users")
  }
}

export default HomePage
