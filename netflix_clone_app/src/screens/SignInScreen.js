import React, { useRef, useState } from 'react'
import { auth } from '../utils/firebaseUtils';
import './SignInScreen.css';

function SignInScreen({ userEmail }) {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [authErrMessage, setAuthErrMessage] = useState("");
    const [isEmailValid, setEmailVaild] = useState(true);
    const [isPassValid, setPassVaild] = useState(true);
    const [showPass, setShowPass] = useState(false);

    const register = (event) => {
        event.preventDefault();

        if (!emailRef.current.value) {
            setEmailVaild(false);
            setPassVaild(true);
            setAuthErrMessage("Please enter a valid Email Id");

        } else if (!passwordRef.current.value) {
            setEmailVaild(true);
            setPassVaild(false);
            setAuthErrMessage("Please enter a valid Password");

        } else {
            auth.createUserWithEmailAndPassword(
                emailRef.current.value,
                passwordRef.current.value
            )
                .then((authUser) => {
                    alert(`Welcome ${authUser.user.email.split('@')[0]} to Netflix`);
                })
                .catch((error) => {
                    setAuthErrMessage(error.message);
                });
        }
    };

    const signIn = (event) => {
        event.preventDefault();

        if (!emailRef.current.value) {
            setEmailVaild(false);
            setPassVaild(true);
            setAuthErrMessage("Please enter a valid Email Id");

        } else if (!passwordRef.current.value) {
            setEmailVaild(true);
            setPassVaild(false);
            setAuthErrMessage("Please enter a valid Password");

        } else {


            auth.signInWithEmailAndPassword(emailRef.current.value,
                passwordRef.current.value
            )
                .then((authUser) => {
                    alert(`Welcome ${authUser.user.email.split('@')[0]} to Netflix`);
                })
                .catch((error) => {
                    setAuthErrMessage(error.message);
                });
        }
    };


    return (
        <div className='signinScreen'>
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} defaultValue={userEmail} placeholder='Email' type='email' id='user-email' />
                <label htmlFor='user-email' className={`validation ${!isEmailValid && "is-invalid"}`}>{authErrMessage}</label>
               
                <div className='signinScreen_passGroup'>
                    <input ref={passwordRef} placeholder='Password' className='siginScreen_passInput' type={`${showPass ? 'text' : 'password'}`} id='user-pass' />
                    <i class={`fa-sharp fa-regular ${showPass ? "fa-eye-slash" : "fa-eye"}`} onClick={() => setShowPass(!showPass)} />
                </div>

                <label htmlFor='user-pass' className={`validation ${!isPassValid && "is-invalid"}`}>{authErrMessage}</label>

                <button type='submit' onClick={signIn}>Sign In</button>
                <h4>
                    <span className='signinScreen_gray'>New to Netflix? </span>
                    <span className='signinScreen_link' onClick={register}> Sign Up now.</span></h4>
            </form>
        </div>
    )
}

export default SignInScreen;