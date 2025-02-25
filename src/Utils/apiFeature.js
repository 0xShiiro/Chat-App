import {ethers,BrowserProvider,Contract} from 'ethers';
import Web3Modal from 'web3modal';
import { Contract_abi,Contract_address } from '../context/constant';

export const CheckIfWalletConnected = async () => {
    try {
        const { ethereum } = window;
        if (!ethereum) {
            console.log('Make sure you have metamask!');
            return;
        }
        const accounts = await ethereum.request({ method: 'eth_accounts' }); 
        const account = accounts[0];
        return account;
    } catch (error) {
        console.log(error)
    }
}
export const connectWallet = async () => {
    try {
        const { ethereum } = window;
        if (!ethereum) {
            console.log('Make sure you have metamask!');
            return;
        }
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' }); 
        console.log('Connected', accounts[0]);
        return accounts[0];
        
    } catch (error) {   
        console.log(error)
    }  
}

const fetchContract = async (signerOrProvider) => {
    return new ethers.Contract(Contract_address, Contract_abi, signerOrProvider);
}

export const connectingWithContract = async () => {
    try {
        const { ethereum } = window;
        if (!ethereum) {
            console.log('Make sure you have metamask!');
            return;
        }
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = new Contract(Contract_address,Contract_abi,signer);
        return contract;
    } catch (error) {
        console.log(error)
    }
}

export const convertTime = async(time) =>{
    const Time = new Date(Number(time));
    const realTime = Time.getHours() + "/" + Time.getMinutes() + "/" + Time.getSeconds() + " Date:" + Time.getDate() + "/" + Time.getMonth() + "/" + Time.getFullYear();
    return realTime;
}
