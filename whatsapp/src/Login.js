import React from 'react';
import {Button} from '@material-ui/core'
import './Login.css'
import {auth,provider} from './firebase';
import {useStateValue} from './StateProvider';
import {actionTypes} from './reducer';

function Login(props) {
    const [{},dispatch]= useStateValue();
    const signIn =()=>{
        auth.signInWithPopup(provider)
        .then((result)=>{dispatch({
            type:actionTypes.SET_USER,
            user:result.user
        });
    })
        .catch((error)=>alert(error.message))
    }
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="whatsapp logo"/>
                <div className="login__text">
                    <h1>Sign in to Whatsapp</h1>
                </div>
                <Button type="submit" onClick={signIn}>
                    Login with your Google Account
                </Button>
            </div>
            
        </div>
    );
}

export default Login;