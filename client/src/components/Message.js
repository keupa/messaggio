import React from 'react';

import '../assets/styles/chat.css';

const Message = ({ message: { text, user }, username }) => {
  let sentByCurrent = false;

  const trim = username.trim().toLowerCase();

  if(user === trim) {
    sentByCurrent = true;
  }

  return (
    sentByCurrent
      ? (
        <div className="currentuser-container">
          <p className='my-username'>{trim}</p>
          <div className='right'>
          <p className='message'>{text}</p>
          </div>
        </div>
        )
        : (
          <div className="otherusers-container">
              <p className='other-username'>{user}</p>
              <div className='left'>
              <p className='message'>{text}</p>
              </div>
          </div>
        )
  );
}

export default Message;