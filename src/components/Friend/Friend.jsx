import React, { useEffect, useContext } from 'react'
import Style from './Friend.module.css';
import images from '../../assets';
import Image from 'next/image';
import Card from './Card/Card';
import Chat from './Chat/Chat';
import { ChatAppContext } from '../../context/ChatAppContext';
const Friend = () => {
  const { sendMessage, account, friendLists, readMessage, userName, loading, readUser,
    currentUser, currentUserAddress,friendMsg } = useContext(ChatAppContext);
  
  return (
    <div className={Style.Friend}>
      <div className={Style.Friend_box}>
        <div className={Style.Friend_box_left}>
          {
            friendLists.map((el, i) => (
              <Card key={i}
                el={el}
                i={i}
                readMessage={readMessage}
                readUser={readUser}
              />
            ))
          }
        </div>
        <div className={Style.Friend_box_right}>
          <Chat functionName={sendMessage}
            readMessage={readMessage}
            friendMsg={friendMsg}
            account={account}
            userName={userName}
            loading={loading}
            currentUser={currentUser}
            currentUserAddress={currentUserAddress}
            />
        </div>
      </div>
    </div>
  )
}

export default Friend
