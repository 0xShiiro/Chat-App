import React,{useState,useContext} from 'react';
import Image from 'next/image';
import Style from './Filter.module.css';
import { ChatAppContext } from '../../context/ChatAppContext';
import images from '../../assets'
import Model from '../Model/Model';
const Filter = () => {
  const {account , addFriend} = useContext(ChatAppContext);
  const [addfriend, setaddfriend] = useState(false)
  return (
    <div className={Style.Filter} >
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
            <Image src={images.search} alt="image" width={20} height={20}/>
            <input type="text" placeholder="Search..."/>
          </div>
        </div>
        <div className={Style.Filter_box_right}>
          <button>
            <Image src={images.clear} alt="clear" width={20} height={20}/>  
            CLEAR CHAT          
          </button>
          <button onClick={()=>setaddfriend(true)} >
            <Image src={images.user} alt="clear" width={20} height={20}/>  
            ADD FRIEND         
          </button>
        </div>
      </div>
      {/* // Model Component */}
      {
        addfriend && (
          <div className={Style.Filter_model}>
            <Model openBox={setaddfriend} 
            title="Welcome to BlockChat"
            head="Social App"
            info="This is a chat app where you can chat with your friends and family. You can also create a group and chat with your friends. You can also create a group and chat with your friends."
            smallInfo="Kindly Enter your friend's Name and Address"
            image={images.hero}
            functionName={addFriend}
            />
          </div>
        )
      }
    </div>
  )
}

export default Filter
