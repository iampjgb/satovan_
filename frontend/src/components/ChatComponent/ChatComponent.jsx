import "./chatcomponent.scss";

import ImageIcon from "@mui/icons-material/Image";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useState,useRef,useEffect } from "react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Picker from "@emoji-mart/react";
import CloseIcon from "@mui/icons-material/Close";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";

import { doc,setDoc,getDocs,onSnapshot,updateDoc,getDoc, collection, query, where,serverTimestamp,orderBy,limit } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

//import UserAuth Context
import { UserAuth } from "../../context/AuthContext";

//import firebase auth initizialization and hooks
import {db} from '/Users/paulbaron/CAPSTONE/frontend/src/firebase.js';

export const ChatComponent = () => {
    const [emoji, setEmoji] = useState(null);
    const [showEmojis, setShowEmojis] = useState(false);
    const [messages,setMessages]=useState([]);
    const [message,setMessage]=useState('');
    const [showChat,setShowChat]=useState(true);
    const [image,setImage]=useState(null);
    const [imageUrl,setImageUrl]=useState(null);
    const [percent,setPercent]=useState(0);
    const [username,setUsername]=useState('');
    const [searchedUser,setSearchedUser]=useState('');

    const dummy = useRef();
    const storage=getStorage();

     //import functions and values from UserAuth Context
    const{user}=UserAuth();

    const handleEmojis = () => {
        showEmojis ? setShowEmojis(false) : setShowEmojis(true);
        console.log(showEmojis);

    } 

    useEffect(() => {
    console.log(user);
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
        // console.log(err.message);
        }
      );
      return () => unsubscribe();
    }, [user]);


    const handleSubmit=async(e)=>{
      e.preventDefault();

      // Add a new document with a generated id
      const messageRef = doc(collection(db, "chats"));
      
      console.log(imageUrl);

      // later...
      await setDoc(messageRef, {
        uid:user.uid,
        name:user.displayName,
        message:message,
        photoURL:user.photoURL,
        timeStamp:serverTimestamp(),
        image:imageUrl
    });


    setMessage('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleImageUpload=(e)=>{
        setImage(e.target.files[0]);
        console.log(image);
        if (!image) {
          alert("Please upload an image first!");
      }

      const storageRef = ref(storage, `${image.name}`);

      // progress can be paused and resumed. It also exposes progress updates.
      // Receives the storage reference and the file to upload.
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
          "state_changed",
          (snapshot) => {
              const percent = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );

              // update progress
              setPercent(percent);
          },
          (err) => console.log(err),
          () => {
              // download url
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                  // console.log(url);
                  setImageUrl(url);

                // Add a new document with a generated id
                const messageRef = doc(collection(db, "chats"));
                  
                console.log(imageUrl);

                // later...
                setDoc(messageRef, {
                  uid:user.uid,
                  name:user.displayName,
                  message:message,
                  photoURL:user.photoURL,
                  timeStamp:serverTimestamp(),
                  image:imageUrl
              });

              // setImageUrl('');
              });
          }
      );
    }
    

    const handleSearch = async () => {
      const q = query(collection(db, "users"),
      where("name", "==",username));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
      setSearchedUser(doc.data());    
        });
    };
  
    const handleKey = (e) => {
      e.code === "Enter" && handleSearch();
    };


    console.log(searchedUser);


    return (
        <div className="chat-container">
          {percent}
            <div className="chat-wrapper">
                <div className="left-bar">
                    <div className="left-bar-header">{/* nothing.... */}</div>
                    <div className="left-bar-searchbox">
                        <input type="search" placeholder="Search chat"
                        onKeyDown={handleKey}
                        onChange={(e) =>
                        setUsername(e.target.value)}/>
                    </div>
                    <div className="left-bar-chatheads">
                        <div className="left-bar-chathead">
                            <div className="left-bar-chathead-avatar">
                                <img
                                    src={searchedUser?.image}
                                    alt=""
                                />
                            </div>
                            <div className="left-bar-chat-head-content">
                                <span>{searchedUser?.name}</span>
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
                                    src={searchedUser?.image}
                                    alt={searchedUser?.name}
                                />
                            </div>
                            <span>{searchedUser?.name}</span>
                        </div>
                        <div className="right-bar-header-icons">
                            <CallIcon />
                            <VideocamIcon />
                            <CloseIcon />
                        </div>
                    </div>
                    <div className="right-bar-contents">
                        {/* chat message */}
                      {messages.map((msg=>(
                      <div className={msg.uid===user?.uid?"right-bar-content sent":"right-bar-content"} key={msg?.id}>
                        <div className="right-bar-avatar">
                            <img
                                src={msg?.photoURL}
                                alt={msg?.displayName}
                            />
                        </div>
                        <div className="right-bar-messages ">
                          {msg?.message===''?'': <p>{msg?.message}</p>}
                            <img src={msg?.image } alt="" />
                        </div>
                    </div>
                      )))}
                    <span ref={dummy}></span>
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
                                onChange={handleImageUpload}
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
