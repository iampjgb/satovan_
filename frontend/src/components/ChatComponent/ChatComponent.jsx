import "./chatcomponent.scss";

import ImageIcon from "@mui/icons-material/Image";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useState,useRef,useEffect } from "react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Picker from "@emoji-mart/react";
import CloseIcon from "@mui/icons-material/Close";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { doc,  setDoc,onSnapshot, collection, query, where,serverTimestamp,orderBy } from "firebase/firestore";

//import UserAuth Context
import { UserAuth } from "../../context/AuthContext";

//import firebase auth initizialization and hooks
import {auth,db} from '/Users/paulbaron/CAPSTONE/frontend/src/firebase.js';

export const ChatComponent = () => {
    const [emoji, setEmoji] = useState(null);
    const [showEmojis, setShowEmojis] = useState(false);
    const [messages,setMessages]=useState([]);
    const [message,setMessage]=useState('');
    const dummy = useRef();

     //import functions and values from UserAuth Context
    const{googleSignIn,facebookSignIn,user,generateRecaptcha}=UserAuth();

    const handleEmojis = () => {
        showEmojis ? setShowEmojis(false) : setShowEmojis(true);
        console.log(showEmojis);

    } 

    useEffect(() => {
    
      const unsubscribe = onSnapshot(
        query(collection(db, `chats`), orderBy('timeStamp')),
        snapshot => {
          setMessages(
            snapshot.docs.map(doc => {
              return doc.data();
            })
          );
        },
        err => {
          // TODO: handle errors;
        }
      );
  
      return () => unsubscribe();
    }, []);

console.log(messages);

    const handleSubmit=async(e)=>{
      e.preventDefault();

     // Add a new document with a generated id
const messageRef = doc(collection(db, "chats"));

// later...
await setDoc(messageRef, {
  uid:user.uid,
  name:user.displayName,
  message:message,
  timeStamp:serverTimestamp()
});

      setMessage('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }



    
    return (
        <div className="chat-container">
            <div className="chat-wrapper">
                <div className="left-bar">
                    <div className="left-bar-header">{/* nothing.... */}</div>
                    <div className="left-bar-searchbox">
                        <input type="search" placeholder="Search chat" />
                    </div>
                    <div className="left-bar-chatheads">
                        <div className="left-bar-chathead">
                            <div className="left-bar-chathead-avatar">
                                <img
                                    src={require("/Users/paulbaron/CAPSTONE/frontend/src/assets/services/carpenter.webp")}
                                    alt=""
                                />
                            </div>
                            <div className="left-bar-chat-head-content">
                                <span>Mr. Karpintero</span>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Expedita quo ut,
                                    voluptatum nisi nesciunt cum in fuga iusto
                                    rerum itaque debitis, reprehenderit numquam
                                    non beatae assumenda tempore tempora, rem
                                    laborum?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-bar">
                    <div className="right-bar-header">
                        <div className="right-bar-header-avatar">
                            <div className="profile">
                                <img
                                    src={require("/Users/paulbaron/CAPSTONE/frontend/src/assets/services/carpenter.webp")}
                                    alt="Mr. Karpintero"
                                />
                            </div>
                            <span>Mr. Karpintero</span>
                        </div>
                        <div className="right-bar-header-icons">
                            <CallIcon />
                            <VideocamIcon />
                            <CloseIcon />
                        </div>
                    </div>
                    <div className="right-bar-contents">
                        {/* chat message */}
                        <div className="right-bar-content">
                            <div className="right-bar-avatar">
                                <img
                                    src={require("/Users/paulbaron/CAPSTONE/frontend/src/assets/services/carpenter.webp")}
                                    alt=""
                                />
                            </div>
                            <div className="right-bar-messages">
                                {messages.map((data)=>(
                                  <div key={data.timeStamp}>
                                      <p>{data.message}</p>
                                  </div>
                                ))}
                                <span ref={dummy}></span>
                            </div>
                        </div>
                    </div>
                    <form className="right-bar-chatbox" onSubmit={handleSubmit}>
                        <div className="right-bar-chatbox-input">
                            <input type="text" placeholder="Type something" value={message}
                            onChange={e=>setMessage(e.target.value)} />
                        </div>
                        <div className="right-bar-chatbox-buttons">
                            <input
                                type="file"
                                id="image"
                                style={{ display: "none" }}
                                accept="image/*"
                            />
                            <label htmlFor="image">
                                <ImageIcon className="image-icon" />
                            </label>
                            <input
                                type="file"
                                style={{ display: "none" }}
                                id="file"
                                accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                            />
                            <label htmlFor="file">
                                <AttachFileIcon className="attachfile-icon" />
                            </label>
                            <InsertEmoticonIcon
                                className="insert-emoticon-icon"
                                onClick={handleEmojis}
                            />
                            <div className="emoji-icon">
                                {showEmojis ? (
                                    <Picker
                                        className="emoji-picker"
                                        onEmojiSelect={(emoji) =>
                                            setEmoji(emoji.native)
                                        }
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
