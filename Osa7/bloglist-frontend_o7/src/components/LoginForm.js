import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => {
  return(
    <>
      <h2>Login to view blogs:</h2>
      <form onSubmit={handleLogin}>
        <div>
                username
          <input
            type="text"
            value={username}
            name="Username"
            id="usernameinput"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                password
          <input
            type="password"
            value={password}
            name="Password"
            id="passwordinput"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="loginbutton" type="submit">login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm