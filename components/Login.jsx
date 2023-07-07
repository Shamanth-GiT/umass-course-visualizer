"use client";

import React, { useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const Login = () => {
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
            // login logic
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4"
            style={{
                backgroundImage: `url(/images/PM.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="max-w-md w-full py-12 px-6 bg-white rounded-xl shadow-md space-y-4">
                <h2 className="text-2xl font-medium text-center text-gray-700 dark:text-black">{isNewUser ? "Register" : "Login"}</h2>
                <SwitchTransition>
                    <CSSTransition
                        key={isNewUser ? "New User" : "Existing User"}
                        addEndListener={(node, done) =>
                            node.addEventListener("transitionend", done, false)
                        }
                        classNames="fade"
                    >
                        <div>
                            {isNewUser ? (
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="username" className="text-sm">New Username</label>
                                        <input value={username} onChange={(e) => setUsername(e.target.value)} id="username" name="username" type="text" className="w-full p-2 border border-gray-300 rounded mt-1" />
                                    </div>
                                    <div>
                                        <label htmlFor="name" className="text-sm">First Name</label>
                                        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} id="name" name="name" type="text" className="w-full p-2 border border-gray-300 rounded mt-1" />
                                    </div>
                                    <div>
                                        <label htmlFor="lastname" className="text-sm">Last Name</label>
                                        <input value={lastName} onChange={(e) => setLastName(e.target.value)} id="lastname" name="lastname" type="text" className="w-full p-2 border border-gray-300 rounded mt-1" />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="text-sm">Password</label>
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" className="w-full p-2 border border-gray-300 rounded mt-1" />
                                    </div>
                                    <div>
                                        <label htmlFor="retype-password" className="text-sm">Retype Password</label>
                                        <input value={retypePass} onChange={(e) => setRetypePass(e.target.value)} id="retype-password" name="retype-password" type="password" className="w-full p-2 border border-gray-300 rounded mt-1" />
                                    </div>
                                    <button type="submit" className="w-full py-2 px-4 bg-maroon text-white rounded hover:bg-maroon focus:outline-none">Sign Up</button>
                                </form>
                            ) : (
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email" className="text-sm">Email</label>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="email" className="w-full p-2 border border-gray-300 rounded mt-1" />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="text-sm">Password</label>
                                        <input value={pass} onChange={(e) => setPass(e.target.value)} id="password" name="password" type="password" className="w-full p-2 border border-gray-300 rounded mt-1" />
                                    </div>
                                    <button type="submit" className="w-full py-2 px-4 bg-maroon text-white rounded hover:bg-maroon focus:outline-none">Log In</button>
                                </form>
                            )}
                        </div>
                    </CSSTransition>
                </SwitchTransition>
                <div className="flex items-center justify-center">
                    <button
                        onClick={() => setIsNewUser(!isNewUser)}
                        className="font-medium text-black hover:text-gray-500">
                        {isNewUser ? "Already have an account?" : "New to this site?"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;