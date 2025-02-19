'use client'
import React,{useEffect} from 'react'
import Style from './Card.module.css';
import Link from 'next/link';
import images from '../../../assets';
import Image from 'next/image';

const Card = ({readMessage,el,i,readUser}) => {
   
  return (
   <Link href={{pathname:"/",query:{name:`${el.name}`,address:`${el.friendAddress}`}}}>
    <div className={Style.Card}
        onClick={()=>(readMessage(el.friendAddress),readUser(el.friendAddress))}
    >
      <div className={Style.Card_box}>
        <div className={Style.Card_box_left}>
        <Image className={Style.Card_box_left_img} src={images.accountName}
        alt="username"
        width={50}
        height={50}/>
        </div>
        

        <div className={Style.Card_box_right}>
            <div className={Style.Card_box_right_middle}>

          <h4>{el.name}</h4>
          <small>{el.friendAddress.slice(0,25)}...</small>
            </div>
              
        </div>
      </div>
    </div>
   </Link>

  )
}

export default Card
