import React, { useState } from "react";
import { CSSTransition } from 'react-transition-group';
import '../theme/login.css';

export const Login = (props) => {
    const [isNewUser, setIsNewUser] = useState(false);

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [retypePass, setRetypePass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isNewUser) {
            console.log(username, firstName, lastName, password);
            // Here you can implement registration logic
        } else {
            console.log(email, pass);
            // Here you can implement login logic
        }
    }

    return (
        <div className="auth-form">
            <h2>{isNewUser ? "Register" : "Login"}</h2>
            <CSSTransition in={isNewUser} timeout={300} classNames="fade" unmountOnExit>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">New Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" id="username" name="username" />
                    <label htmlFor="name">First Name</label>
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" id="name" name="name" />
                    <label htmlFor="lastname">Last Name</label>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" id="lastname" name="lastname" />
                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" name="password" />
                    <label htmlFor="retype-password">Retype Password</label>
                    <input value={retypePass} onChange={(e) => setRetypePass(e.target.value)} type="password" placeholder="Retype Password" id="retype-password" name="retype-password" />
                    <button type="submit">Sign Up</button>
                </form>
            </CSSTransition>
            <CSSTransition in={!isNewUser} timeout={300} classNames="fade" unmountOnExit>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your Email" id="email" name="email" />
                    <label htmlFor="password">Password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Your Password" id="password" name="password" />
                    <button type="submit">Log In</button>
                </form>
            </CSSTransition>
            <div style={{ textAlign: "center" }}>
                <button onClick={() => setIsNewUser(!isNewUser)} className="toggle-form">
                    {isNewUser ? "Already have an account?" : "New to this site?"}
                </button>
            </div>
        </div>
    )
}