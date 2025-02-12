'use client'
import React,{useState , useEffect} from 'react'
import {useRouter} from 'next/router'

import { CheckIfWalletConnected,connectWallet,conncectingWithContract } from '../Utils/apiFeature';

export const ChatAppContext = React.createContext();
export const ChatAppProvider = ({children}) => {
    const [account, setaccount] = useState("")
    const [userName, setuserName] = useState("")
    const [friendLists, setfriendLists] = useState([])
    const [friendMsg, setfriendMsg] = useState([])
    const [loading, setloading] = useState(false)
    const [userLists, setuserLists] = useState([])
    const [error, seterror] = useState("");
    const [currentUser, setcurrentUser] = useState("")
    const [currentUserAddress, setcurrentUserAddress] = useState("")

    const router = useRouter();

    const fetchData = async() =>{
        try{
            const contract = await conncectingWithContract();
            const connectAccount = await connectWallet();
            setaccount(connectAccount);
            const userName = await contract.getUserName(connectAccount);
            setuserName(userName);
            const friendlist = await contract.getFriendList(connectAccount);
            setfriendLists(friendlist);
            const userlist = await contract.getAllUsers();
            setuserLists(userlist);
    } catch(error){
        console.log(error)
    }
    useEffect(() => {
        fetchData();
    },[]);
    }
    const readMessage = async(friendAddress) =>{
        try {
            const contract = await conncectingWithContract();
            const read = await contract.readMessage(friendAddress);
            setfriendMsg(read);
        } catch (error) {
            seterror("Currently You have no Messages")
        }
    }

    const createAccount = async({name,accountAddress}) =>{
        try {
            if(name || accountAddress === ""){
                return seterror("Please Fill all the fields")
            }
            const contract = await conncectingWithContract();
            const createduser = await contract.createaAccount(name);
            setloading(true);
            await createduser.wait();
            setloading(false);
            window.location.reload();
            // router.push("/");
        } catch (error) {
            seterror("Error While Creating yout account , Plaese reload The Browser and try again")
        }
    }

    const addFriend = async({name,friendAddress}) =>{
        try {
            if(name || friendAddress === ""){
                return seterror("Please Fill all the fields")
            }
            const contract = await conncectingWithContract();
            const add = await contract.AddFriend(friendAddress,name);
        } catch (error) {
            seterror('Something went wrong while adding friend')
        }
    }

    const sendMessage = async({friendAddress,message}) =>{
        try {
            if(msg || friendAddress === ""){
                return seterror("Please Fill all the fields")
            }
            const contract = await conncectingWithContract();
            const send = await contract.sendMessage(friendAddress,message);
            setloading(true);
            await send.wait();
            setloading(false);
            window.location.reload();

        } catch (error) {
            seterror("Please reload and send the message again")
        }


    }

    const readUser = async(address) =>{
        try {
            const contract = await conncectingWithContract();
            const user = await contract.getUserName(address);
            setcurrentUser(user);
            setcurrentUserAddress(address);
        } catch (error) {
            seterror("User not found")
        }
    }
    return (
        <ChatAppContext.Provider value={{fetchData,
        account,
        userName,
        friendLists,
        friendMsg,
        loading,
        userLists,
        error,
        createAccount,
        addFriend,
        sendMessage,
        readMessage,
        readUser,
        currentUser,
        connectWallet,
        CheckIfWalletConnected,
        currentUserAddress}}>
            {children}
        </ChatAppContext.Provider>
    ) 
    }

