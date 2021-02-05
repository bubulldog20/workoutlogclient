import React, { useState, useEffect } from 'react';
import Auth from './auth/Auth';
import Sitebar from './home/Navbar';
import WorkoutIndex from './workouts/WorkoutIndex'


function App() {

  const [sessionToken, setSessionToken] = useState('');

  useEffect( () => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken); 
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  const protectedViews = () => {
    // under what circumstances would this be false? udateToken both sets the same token in the state variable and the
    // local storage. works just as well to check if a token exists without comparing the state to the local storage
    return(sessionToken === localStorage.getItem('token')  
      ? <WorkoutIndex token={sessionToken} />
      : <Auth updateToken={updateToken} />
      )
  }

  return (
    <div>
      <Sitebar clearToken={clearToken}/>
      {protectedViews()}
    </div>
  );
}

export default App;
