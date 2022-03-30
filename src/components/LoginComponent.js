import reactDom from 'react-dom'

function authenticateAPI () {
   // Authenticate user API and generate token

}

function Login(props){
   return (
      <div>
         <form method='get' action="/login">
            <button type='submit'>Log in using Spotify account</button>
         </form>
      </div>
   )
}

export default Login 