'use client'
import React,{useState , useEffect} from 'react'
// import {useRouter} from 'next/navigation'

import { CheckIfWalletConnected,connectWallet,connectingWithContract } from '../Utils/apiFeature';

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

//   const [routerReady, setRouterReady] = useState(false);
    // const router = useRouter();

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const contract = await connectingWithContract();
                const connectAccount = await connectWallet();
                if (connectAccount) {
                    console.log(connectAccount);
                    setaccount(connectAccount);
                    const userName = await contract.getUserName(connectAccount);
                    setuserName(userName);
                    const userList = await contract.getAllUsers();
                    setuserLists(userList);
                    const friendList = await contract.getFriendList();
                    setfriendLists(friendList);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);


//   if (!routerReady) {
//     return null; // or a loading indicator until the router is ready
//   }

    const readMessage = async(friendAddress) =>{
        try {
            const contract = await connectingWithContract();
            const read = await contract.readMessage(friendAddress);
            setfriendMsg(read);
        } catch (error) {
            seterror("Currently You have no Messages")
        }
    }

    const createAccount = async({name,accountAddress}) =>{
        try {
            // if(name || accountAddress === ""){
            //     return seterror("Please Fill all the fields")
            // }
            const contract = await connectingWithContract();
            const createduser = await contract.CreateaAccount(name);
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
            // if(name || friendAddress === ""){
            //     return seterror("Please Fill all the fields")
            // }
            const contract = await connectingWithContract();
            const add = await contract.AddFriend(friendAddress,name);
        } catch (error) {
            seterror('Something went wrong while adding friend')
        }
    }

    const sendMessage = async({friendAddress,message}) =>{
        try {
            // if(msg == "" || friendAddress === ""){
            //     return seterror("Please Fill all the fields")
            // }
            const contract = await connectingWithContract();
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
            const contract = await connectingWithContract();
            const user = await contract.getUserName(address);
            setcurrentUser(user);
            setcurrentUserAddress(address);
        } catch (error) {
            seterror("User not found")
        }
    }
    return (
        <ChatAppContext.Provider value={{
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

