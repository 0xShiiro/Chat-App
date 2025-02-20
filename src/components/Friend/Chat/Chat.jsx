'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from "next/navigation";
import images from '../../../assets';
import Style from './Chat.module.css';
import { convertTime } from '../../../Utils/apiFeature';
import Loader from '../../Loader/Loader';
import Image from 'next/image';
const Chat = ({ functionName, readMessage, friendMsg, account, userName, loading, currentUser, currentUserAddress }) => {
    const [message, setmessage] = useState('');
    const [chatData, setchatData] = useState({
        name: "",
        address: "",
    });
    const searchParams = useSearchParams(); // ✅ Correct way to fetch query parameters

    useEffect(() => {
        const name = searchParams.get("name") || "";
        const address = searchParams.get("address") || "";
        setchatData({ name, address });
    }, [searchParams]); // ✅ Reacts to URL changes


    return (
        <div className={Style.Chat}>
            {currentUser && currentUserAddress ? (
                <div className={Style.Chat_user_info}>
                    <Image
                        src={images.accountName}
                        alt="image"
                        width={70}
                        height={70}
                    />
                    <div className={Style.Chat_user_info_box}>
                        <h4>{currentUser}</h4>
                        <p className={Style.show} >{currentUserAddress}</p>
                    </div>
                </div>
            ) : (
                " "
            )}
            <div className={Style.Chat_box_box}>
                <div className={Style.Chat_box}>
                    <div className={Style.Chat_box_left}>
                        {
                            friendMsg.map((el, i) => (
                                <div>
                                    {el.sender === chatData.address ? (
                                        <div className={Style.Chat_box_left_title}>
                                            <Image src={images.accountName} alt="image" width={50} height={50} />
                                            <span>
                                                {chatData.name} {" "}
                                                <small>Time: {convertTime(el.timestamp)}</small>
                                            </span>
                                        </div>

                                    ) : (
                                        <div className={Style.Chat_box_left_title}>
                                            <Image
                                                src={images.accountName}
                                                alt="image"
                                                width={50}
                                                height={50}
                                            />
                                            <span>
                                                {userName} {" "}
                                                <small>Time: {convertTime(el.timestamp)}</small>
                                            </span>
                                        </div>
                                    )}
                                    <p key={i + 1}>
                                        {el.message}
                                        {" "}
                                        {" "}
                                    </p>
                                </div>
                            ))}
                    </div>
                </div>
                {currentUser && currentUserAddress ? (
                    <div className={Style.Chat_box_send}>
                        <div className={Style.Chat_box_send_img}>
                            <Image 
                                src={images.smile}
                                alt="smile"
                                width={50}
                                height={50}
                                />
                            <input 
                                type="text" 
                                placeholder='type your message'
                                onChange={(e)=>setmessage(e.target.value)}
                                />
                            <Image 
                                src={images.file}
                                alt="file"
                                width={50}
                                height={50}
                            />
                            {
                                loading == true ?(
                                    <Loader />
                                ):(
                                    <Image 
                                    src={images.send}
                                    alt="file"
                                    width={50}
                                    height={50}
                                    onClick={()=>functionName({friendAddress:chatData.address,message: message})}
                                    />
                                )
                            }
                        </div>
                    </div>
                ):(" ")}
            </div>
        </div>
    )
}

export default Chat
