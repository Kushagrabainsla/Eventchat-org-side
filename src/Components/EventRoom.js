import React, {useRef} from 'react';
import {db} from '../Firebase.js';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './EventRoom.css';
import firebase from 'firebase';
// import AudioPlayer from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';

function EventRoom() {
    const dummy = useRef();
    const messagesRef = db.collection('audio_files');
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, {idField: 'id'});

    return (
        <div className='eventroom'>
            <div className='messeges'>
              {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
              <span ref={dummy}></span>
            </div>
        </div>
    )
}

function ChatMessage(props) {
  
    const { displayName, email, blob_URL, photoURL, uid } = props.message;

    function play_audio () {
      // console.log(blob_URL);

      const path = 'audios/'.concat(uid, '.mp3');
      var storageRef = firebase.storage().ref(path);
      storageRef.getDownloadURL().then((url) => {
        console.log(url);
        var audio = new Audio(url);
        // audio.crossOrigin = 'anonymous';
        audio.play();

      })
    }
    return (
      <div className='audio_message'>
        <img alt='' src={photoURL} className='atendee_image'/>
        <div className='atendee_info'>
            <p>{displayName}</p>
            <p>{email}</p>
            <p onClick={play_audio}>{uid}</p>
        </div>
      </div>
    )
}



export default EventRoom
