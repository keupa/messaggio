import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import toast, { Toaster } from 'react-hot-toast';
import ScrollToBottom from 'react-scroll-to-bottom'
import '../assets/styles/chat.css'
import Message from './Message'

const uri = 'localhost:8080'
let socket

export default function Chat({location}) {
    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')
    const [users, setUsers] = useState([])
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    let sentByCurrent = false
    const trim = username.trim().toLowerCase()

    if (username === trim){
        sentByCurrent = true
    }

    useEffect(() => {
        const { username, room } = queryString.parse(location.search)
        socket = io(uri)
        setUsername(username)
        setRoom(room)

        socket.emit('join', { username, room }, () => {
        })

    }, [uri, location.search])

    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message])
        })

        socket.on('data', ({ users}) => {
            setUsers(users)
        })
    }, [messages])


    const sendMessage = (e) => {
        e.preventDefault()
        if(message){
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    console.log(typeof users, users)

    return (
        <div className='main-chat-container'>
            <div className='chat-container'>
         
            <div className='window-container'>
            {messages.map((message, i) => <div key={i}>
                
               <Message message={message} username={username} /> 
                
                </div>)}
                </div>
                <div className='input-container'>
                <input value={message} 
                    placeholder='Type a messagge...'
                    className='send-input'
                    onChange={e => setMessage(e.target.value)} 
                    onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null }
                /> 
                <button 
                    className='send-btn'
                    onClick={ e => sendMessage(e)}>
                        Send
                </button>
                </div>
            </div>

            <div className='onlineusers'>
                <h3>Online Users </h3>
                <ul> 
                    {users.map((u, i) =>{
                        return(
                            <li key={i}>{u.username}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
