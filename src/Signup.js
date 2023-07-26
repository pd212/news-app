import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import "./Signup.css";
import { Link } from 'react-router-dom';

const Signup = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSignedUp, setIsSignedUp] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            if (user) {
                await db.collection('users').doc(user.uid).set({ displayName });
                setIsSignedUp(true);
            }
        } catch (error) {
            setError(error.message);
        }
    };



    return (
        <div className="signup">
            {isSignedUp ? (
                <div>
                    <h2>Sign Up Successful!</h2>
                    <p>You have successfully signed up. You can now go to the home page.</p>
                    <Link to="/">Go to Home</Link>
                </div>
            ) : (
                <div className="form">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSignup}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                    {error && <p>{error}</p>}
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            )};
        </div>
    );

};

export default Signup;