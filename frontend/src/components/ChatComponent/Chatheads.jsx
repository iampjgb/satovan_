import React from "react";

export const Chatheads = () => {
    return (
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Expedita quo ut, voluptatum nisi nesciunt cum in fuga iusto
                    rerum itaque debitis, reprehenderit numquam non beatae
                    assumenda tempore tempora, rem laborum?
                </p>
            </div>
        </div>
    );
};
