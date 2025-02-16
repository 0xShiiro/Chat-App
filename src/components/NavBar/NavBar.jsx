'use client'
import React, { useState, useEffect, useContext } from 'react'
import Image from "next/image";
import Link from 'next/link';
import Style from './NavBar.module.css'
import { ChatAppContext } from '../../context/ChatAppContext';
import  Model  from "../Model/Model";
import  Error  from "../Error/Error";
import images from "../../assets/index"
export const NavBar = () => {
  const menuItems = [
    {
      menu: "All Users",
      link: "/alluser",
    },
    {
      menu: "Chat",
      link: "/",
    },
    {
      menu: "Contact",
      link: "/",
    },
    {
      menu: "Setting",
      link: "/",
    },
    {
      menu: "FAQs",
      link: "/",
    },
    {
      menu: "Terms Of Use",
      link: "/",
    }
  ]
  const [active, setactive] = useState(2);
  const [open, setopen] = useState(false);
  const [openModal, setopenModal] = useState(false);
  // const [error, seterror] = useState("")

  const { account, userName, connectWallet,createAccount,error } = useContext(ChatAppContext);
  console.log(account);
  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}>
        <div className={Style.NavBar_box_left}>
          <Image src={images.logo} alt="logo" width={50} height={50}></Image>
        </div>
        <div className={Style.NavBar_box_right}>
          {/* DESKTOP */}
          <div className={Style.NavBar_box_right_menu}>  
            {menuItems.map((el, i) => {
              return (
                <div
                  onClick={() => setactive(i + 1)}
                  key={i + 1}
                  className={`${Style.NavBar_box_right_menu_items} ${active == i + 1 ? Style.active_btn : ""}`}
                ><Link className={Style.NavBar_box_right_menu_items_link}
                  href={el.link}
                >{el.menu}</Link>
                </div>
              );
            })}
            {/* <p className={Style.mobile_menu_btn}>
                <Image src={images.close} alt="close" width={50} height={50}
                  onClick={() => setopen(false)}
                />
              </p> */}
          </div>
          {/* MOBILE */}
          {open && (
            <div className={Style.mobile_menu}>
              {menuItems.map((el, i) => {
                return (
                  <div
                    onClick={() => setactive(i + 1)}
                    key={i + 1}
                    className={`${Style.mobile_menu_items} ${active == i + 1 ? Style.active_btn : ""}`}
                  ><Link className={Style.mobile_menu_items_link}
                    href={el.link}
                  >{el.menu}</Link>
                  </div>
                );
              })}
              <p className={Style.mobile_menu_btn}>
                <Image src={images.close} alt="close" width={50} height={50}
                  onClick={() => setopen(false)}
                />
              </p>
            </div>
          )}
          {/*Connect Wallet*/}
          <div className={Style.NavBar_box_right_connect}>
            {account ==""? (

              <button onClick={()=>connectWallet()} >
                {""}
                <span>Connect Wallet</span>
              </button>
            ):(
              <button onClick={()=>setopenModal(true)} >
                
                <Image 
                  src={userName !== "" ? images.accountName : images.create2}
                  alt="Account Image"
                  width={35}
                  height={35}
                />
               
                <small>{userName || "Create Account"}</small>
              </button>
            )}
          </div>

          <div className={Style.Navbar_box_right_open}
                onClick={() => setopen(true)}
          >
            <Image src={images.open} alt="open" width={30} height={30} />
          </div>
        </div>
      </div>
      {/* {Model Component} */}
      {openModal && (
        <div className={Style.modelBox}>
          <Model openBox={setopenModal} 
                title ="Welcome to BlockChat"
                head="Social App"
                address={account}
                info="This is a chat app where you can chat with your friends and family. You can also create a group and chat with your friends. You can also create a group and chat with your friends."
                smallInfo="Kindly enter your name"   
                image={images.hero}
                functionName= {createAccount}             
          />
        </div>
      )}
      {error == "" ? "":<Error error={error}/>}
    </div>
  )
}


