import Amplify, { Auth } from 'aws-amplify';
import { useEffect, useState } from "react";
import React from 'react';
import {TextField, Button} from '@material-ui/core';
import awsmobile from "../aws-exports";

Amplify.configure(awsmobile);

export default function login(){ 

    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState(""); 

    useEffect(() => {
        AssessLoggedInState()
    }, [])

    const AssessLoggedInState = () => {
        Auth.currentAuthenticatedUser()
            .then(() => {
                setLoggedIn(true)
        })
            .catch(() => {
                setLoggedIn(false)
        });
    };

    async function signUp() {
        try {
            const user = await Auth.signUp({
                username: email,
                password: password,         
            });
            console.log(user);
        } catch (error) {
            console.log('error signing up:', error);
        }
    };

    async function confirmSignUp() {
        try {
        await Auth.confirmSignUp(email, code);
        } catch (error) {
            console.log('error confirming sign up', error);
        }
    };

    async function signIn() {
        try {
            const user = await Auth.signIn(email, password);
            setLoggedIn(true)
            console.log('signed in!')
        } catch (error) {
            console.log('error signing in', error);
        }
    };

    async function resendConfirmationCode() {
        try {
            await Auth.resendSignUp(email);
            console.log('code resent successfully');
        } catch (err) {
            console.log('error resending code: ', err);
        }
    };

    async function signOut() {
        try {
            await Auth.signOut();
            setLoggedIn(false)
            console.log('signed out!')
        } catch (error) {
            console.log('error signing out: ', error);
        }
    };
    return(
        
        <div className="signIn">
            <TextField
                id ="username"
                label="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <TextField
                id = "password"
                label="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Button variant="outlined" onClick={signIn} >Sign In</Button>
            <Button variant="outlined" onClick={signUp} >Sign Up</Button>
            <Button variant="outlined" onClick={signOut} >Sign Out</Button>
            <TextField
                id ="username"
                label="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <TextField
                id = "code"
                label="Code"
                value={code}
                onChange={e => setCode(e.target.value)}
            />
            <Button variant="outlined" onClick={confirmSignUp} >Confirm Sign Up</Button>
        </div>
    );
};