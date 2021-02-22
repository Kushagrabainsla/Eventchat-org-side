import './App.css';
import EventRoom from './Components/EventRoom.js';
import Header from './Components/Header.js';
import { useAuthState } from 'react-firebase-hooks/auth';

import firebase from 'firebase';
import {auth} from './Firebase.js';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="container">
      <Header/>
      {user ? <EventRoom/> : <SignIn />}
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <div className='signin_button' onClick={signInWithGoogle}>
      <h1>Sign in with Google</h1>
    </div>
  )
}


export default App;
