import React from "react"
import FormInput from "../../components/form-input/form-input.component"
import CustomButton from "../../components/custom-button/custom-button.component"
import "./login.styles.scss"
import { auth, signInWithGoogle } from "../../firebase/firebase.util"
import GoogleButton from "react-google-button"
import { Link } from "react-router-dom"

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
    }
  }

  handleSubmit = async event => {
    event.preventDefault()

    const { email, password } = this.state

    try {
      await auth.signInWithEmailAndPassword(email, password)
      this.setState({ email: "", password: "" })
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = event => {
    const { value, name } = event.target
    this.setState({
      [name]: value,
    })
  }

  loginAsGuest = async () => {
    const email = "test@user.com"
    const password = "123456"

    try {
      await auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className="login">
        <h2>Login</h2>
        <span>Login in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            label="email"
            value={this.state.email}
            handleChange={this.handleChange}
            required
            autoComplete="username"
          />
          <FormInput
            name="password"
            type="password"
            label="password"
            value={this.state.password}
            handleChange={this.handleChange}
            required
            autoComplete="current-password"
          />
          <div className="buttons">
            <CustomButton type="submit" inverted>
              Login
            </CustomButton>
          </div>
        </form>
        <CustomButton onClick={this.loginAsGuest} inverted>
          Guest Login
        </CustomButton>
        <GoogleButton
          onClick={signInWithGoogle}
          type="light"
          style={{ margin: "16px 0", width: "100%" }}
        />
        <div className="register">
          <h2>I don't have an account</h2>
          <Link to={`/register`}>
            <span className="registerLink">Create a new account</span>
          </Link>
        </div>
      </div>
    )
  }
}

export default Login
