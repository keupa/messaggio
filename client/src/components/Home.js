import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import '../assets/styles/home.css'
import Illustration from '../assets/images/palomita.png'
import Logo from '../assets/images/logo.svg'

export default function Home() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('')

  function handleSubmit(e) {
    if(!username && !room){
        toast('Please write a username and a room name')
    }else if(!username){
        toast('Please write a valid username')
    }else if(!room){
        toast('Please write a valid room name')
    }else{
        history.push(`/chat?username=${username}&room=${room}`);
    }
  }
  return (
    <div className="home-container">
        <div className='data-container'>
            <img src={Logo} alt='Messaggio logo' className='logo' /> 
            <p>Fill in the info to start chatting :-)</p>
            <div>
                <label>
                Username
                <br></br>
                <input placeholder='Debbie H.' className='home-input' type='text' onChange={(e) => setUsername(e.target.value)} /> 
                </label>
            </div>
            <div>
                <label>
                Room Name
                <br></br>
                <input placeholder='Golden utopia' className='home-input' type='text' onChange={(e) => setRoom(e.target.value)} /> 
                </label>
            </div>
            <button className='home-btn' type='submit' onClick={handleSubmit}>Join</button>
            <Toaster /> 
        </div>
        <div className='img-container'>
           <img src={Illustration} className='illustration' alt='Girl looking at mailbox' />
        </div>
    </div>
  );
}
