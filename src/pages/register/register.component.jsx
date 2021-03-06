import React from "react"
import FormInput from "../../components/form-input/form-input.component"
import CustomButton from "../../components/custom-button/custom-button.component"
import { auth, createUserProfileDocument } from "../../firebase/firebase.util"
import { Link } from "react-router-dom"

import "./register.styles.scss"

class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  }

  handleSubmit = async event => {
    event.preventDefault()

    const { displayName, email, password, confirmPassword } = this.state

    if (password !== confirmPassword) {
      alert("passwords don't match")
      return
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password,
      )
      await createUserProfileDocument(user, { displayName })
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state
    return (
      <div className="register">
        <h2 className="title">Register</h2>
        <span>Register with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="Display Name"
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
            autoComplete="username"
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
            autoComplete="new-password"
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
            autoComplete="new-password"
          />
          <CustomButton type="submit" inverted style={{ width: "100%" }}>
            Register
          </CustomButton>
        </form>
        <div className="login">
          <h2>I already have an account</h2>
          <Link to={`/login`}>
            <span className="loginLink">Login with your account</span>
          </Link>
        </div>
      </div>
    )
  }
}

export default Register
