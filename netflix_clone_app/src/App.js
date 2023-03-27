import React, { useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { auth } from './utils/firebaseUtils';
import { login, logout, selectUser } from './features/userSlice';
import ProfileScreen from './screens/ProfileScreen';


function App() {

  /**Only for dev purpose */ 
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect( () => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if(userAuth){
        //Logged in
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }));


      } else {
        //Logged out
        dispatch(logout());
        
        
      }
    });

    //clean up the listner
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">

      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route exact path="/profile" element={<ProfileScreen />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
