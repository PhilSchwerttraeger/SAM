import React from "react"
import "./Home.styles.scss"
import Directory from "../../components/directory/directory.component"
import { HomePageContainer } from "./home.styles"

const Home = () => (
  <HomePageContainer>
    <Directory />
  </HomePageContainer>
)

export default Home
