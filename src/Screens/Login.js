function Login({setIsLoggedIn}) {
    return (
        <div>
            <h1>Login</h1>
            <button onClick={()=>setIsLoggedIn(true)}>Log In!</button>
        </div>
    );
}
export default Login;