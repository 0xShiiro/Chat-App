import React from 'react'
import Image from 'next/image' 
import Style from './UserCard.module.css'
import images from '../../assets'

const UserCard = ({el,i,addFriend}) => {
  console.log(el);
  return (
    <div className={Style.UserCard}>
      <div className={Style.UserCard_box}>
        <Image className={Style.UserCard_box_img} src={images[`image${i+1}`]}
        alt="user"
        width={100}
        height={100}/>

        <div className={Style.UserCard_box_info}>
          <h3>{el.name}</h3>
          <p>{el.userAddress.slice(0,15)}...</p>
          <button onClick={()=>addFriend({name:el.name,friendAddress:el.userAddress})} >Add Friend</button>
        </div>
      </div>
      
    </div>
  )
}

export default UserCard;
