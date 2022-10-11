import ImageIcon from "@mui/icons-material/Image";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useState } from "react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Picker from "@emoji-mart/react";

export const RighBarChatBox = () => {
    const [emoji, setEmoji] = useState(null);
    const [showEmojis, setShowEmojis] = useState(false);

    const handleEmojis = () => {
        showEmojis ? setShowEmojis(false) : setShowEmojis(true);
        console.log(showEmojis);
    };
    return (
        <form className="right-bar-chatbox">
            <div className="right-bar-chatbox-input">
                <input type="text" placeholder="Type something" />
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
                            onEmojiSelect={(emoji) => setEmoji(emoji.native)}
                        />) : ""}
                </div>
            </div>
        </form>
    );
};
