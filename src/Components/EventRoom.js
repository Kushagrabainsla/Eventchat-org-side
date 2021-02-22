import React, {useRef} from 'react';
import {db} from '../Firebase.js';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './EventRoom.css';
// import Sound from 'react-sound';

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
    const { displayName, email, blob_URL, photoURL} = props.message;
    return (
      <div className='audio_message'>
        <img alt='' src={photoURL} className='atendee_image'/>
        <div className='atendee_info'>
            <text>{displayName}</text>
            <text>{email}</text>
            {/* <Sound
                url={blob_URL}
                playStatus={Sound.status.PLAYING}
                playFromPosition={300}
                onLoading={this.handleSongLoading}
                onPlaying={this.handleSongPlaying}
                onFinishedPlaying={this.handleSongFinishedPlaying}
            /> */}
            <p>{blob_URL}</p>
        </div>
      </div>
    )
}

export default EventRoom
