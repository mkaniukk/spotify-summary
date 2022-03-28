import reactDom from 'react-dom'

function Login(props){
   return (
      <div>
         <h1>Logged in as {props.display_name}</h1>
         <img id="avatar" width="200" src="" />
         <dl>
         <dt>{props.name}</dt><dd></dd>
         <dt>Username</dt><dd></dd>
         <dt>USER Email</dt><dd></dd>
         <dt>Spotify URI</dt><dd><a href=""></a></dd>
         <dt>Link</dt><dd><a href=""></a></dd>
         <dt>Profile Image</dt><dd></dd>
         </dl>
         <p><a href="/login">Log in again</a></p>
         <p><a href="https://api.spotify.com/v1/users/11122324778">Open API</a></p>
         
      </div>
   )
}

export default Login 