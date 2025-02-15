'use client'
import React, { useState, useContext } from 'react'
import Style from './Model.module.css';
import Image from "next/image";
import { ChatAppContext } from '../../context/ChatAppContext';
import { Loader } from "../Loader/Loader";
import images from "../../assets";
const Model = ({ openBox, title, head,address, info, smallInfo, image, fucntionName  }) => {
  const [name, setname] = useState("");
  const [accounAddress, setaccounAddress] = useState("");

  const { loading } = useContext(ChatAppContext);
  return (
    <div className={Style.Model}>
      <div className={Style.Model_box}>
        <div className={Style.Model_box_left}>
          <Image src={image} alt="buddy" width={700} height={700}/>
        </div>    
        <div className={Style.Model_box_right}>
          <h1>
            {title} <span>{head}</span>
          </h1>
          <p>
            {info}
          </p>
          <small>
            {smallInfo}
          </small>

          {
            loading == true ? <Loader/> : (
            <div className={Style.Model_box_right_name}>
              <div className={Style.Model_box_right_name_info}>
                <Image src={images.username} alt='user' width={30} height={30}/>
                <input 
                type="text"
                placeholder="Enter Name"
                onChange={(e)=>setname(e.target.value)}
                />
              </div>
              <div className={Style.Model_box_right_name_info}>
                <Image src={images.account} alt='user' width={30} height={30}/>
                <input 
                type="text"
                placeholder={address || "Enter Address..."}
                onChange={(e)=>setname(e.target.value)}
                />
              </div>
              <div className={Style.Model_box_right_name_btn}>
                <button onClick={()=> fucntionName({name,accounAddress})} >
                  {""}
                  <Image src={images.send} alt='send' width={30} height={30}/>
                  {' '}
                  Submit
                </button>
                <button onClick={()=> openBox(false)} >
                  {""}
                  <Image src={images.close} alt='send' width={30} height={30}/>
                  {' '}
                  Cancel
                </button>
              </div>
            </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Model
