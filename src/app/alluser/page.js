'use client'
import React,{useState,useEffect,useContext} from 'react'
import UserCard from '../../components/UserCard/UserCard'
import Style from '../../styles/alluser.module.css'
import { ChatAppContext } from '../../context/ChatAppContext'

const alluser = () => {
const { userLists , addFriend } = useContext(ChatAppContext);
console.log(userLists);
  return ( 
    <div>
      <div className={Style.alluser_info}>
        <h1>
            Find Your Friends
        </h1>
      </div>
      <div className={Style.alluser}>
        {userLists.map((el,i)=>
            <UserCard key={i+1} el={el} i={i} addFriend={addFriend}/>
        )}
      </div>
    </div>
  )
}

export default alluser
