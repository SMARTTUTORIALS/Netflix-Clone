import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import NavBar from '../components/NavBar'
import { selectUser } from '../features/userSlice'
import db, { auth } from '../utils/firebaseUtils'
import PlansScreen from './PlansScreen'
import './ProfileScreen.css'

function ProfileScreen() {
    const [subscription, setSubscription] = useState(null);

    const user = useSelector(selectUser);

    const logoutUser = () => {
        auth.signOut() ;
        window.location.pathname = '/';
    }
    useEffect(() => {
        db.collection('customers')
            .doc(user.uid)
            .collection('subscriptions')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(async subscription => {
                    setSubscription({
                        role: subscription.data().role,
                        current_period_start: subscription.data().current_period_start.seconds,
                        current_period_end: subscription.data().current_period_end.seconds,
                    });
                });
            });

    }, [user.uid]);

    return (
        <div className='profileScreen'>
            <NavBar />
            <div className='profileScreen_body'>
                <h1>Edit Profile</h1>
                <div className='profileScreen_info'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                        alt='avatar logo'
                    />

                    <div className='profileScreen_details'>
                        <h2>{user.email}</h2>
                        <div className='profileScreen_plans'>
                            <h3>Plans { subscription && `(Current Plan: ${subscription.role})`}</h3>
                            <PlansScreen />
                            <button className='profileScreen_signout' onClick={logoutUser}>Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen