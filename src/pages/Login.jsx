// import loginImg from "../assets/Images/login.webp"
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Save food today, feed hope tomorrow."
      description2="Build a sustainable future and create a better world."
    //   image={loginImg}
      formType="login"
    />
  )
}

export default Login