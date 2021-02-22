import {React } from 'react';
import './Header.css';
import {auth} from '../Firebase.js';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


function Header() {

    const photoURL = auth.currentUser ? auth.currentUser.photoURL : '';
    
    return (
        <div className="header">
            <img className='header__image' alt='' src={photoURL} />
            <img className="header__logo" src="assets/app_logo.png" alt="" />
            <SignOut />
        </div>
    )
}

function SignOut() {
    return auth.currentUser && (
        <div className='signout_button'>
            <ExitToAppIcon onClick={() => auth.signOut()} />
        </div>
    )
}

export default Header
