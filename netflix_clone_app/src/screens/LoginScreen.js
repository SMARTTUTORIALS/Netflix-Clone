import React, { useRef, useState } from 'react';
import './LoginScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons'
import SignInScreen from './SignInScreen';


function LoginScreen() {
    const [signIn, setSignIn] = useState(false);
    const emailRef = useRef(null);

    return (
        <div className='loginScreen'>
            <div className='loginScreen_background'>
                
                    <img className='loginScreen_logo'
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/800px-Logonetflix.png'
                        alt='Netflix logo' onClick={() => setSignIn(false)} />
                
                <button onClick={() => setSignIn(true)} className='loginScreen_button'>Sign In</button>
                <div className="loginScreen_gradient"></div>
            </div>
            <div className='loginScreen_body'>
                {signIn ? (
                    <SignInScreen userEmail={emailRef.current.value}/>
                ) : (
                    <>
                        <h1>Unlimited films, TV programmes and more.</h1>
                        <h2>Watch anywhere. Cancel at anytime</h2>
                        <h3>Ready to watch? Enter your email to create or restart your membership.</h3>

                        <div className='loginScreen_input'>
                            <form>
                                <input ref={emailRef} type="email" placeholder='Email Address' />
                                <button onClick={() => setSignIn(true)} className='loginScreen_getStarted'>
                                    GET STARTED &nbsp;
                                    <FontAwesomeIcon icon={faGreaterThan} style={{ color: "#ffffff", }} />
                                </button>

                            </form>

                        </div>
                    </>
                )
                }

            </div >
        </div >
    )
}

export default LoginScreen;