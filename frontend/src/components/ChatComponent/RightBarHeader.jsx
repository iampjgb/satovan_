import CloseIcon from "@mui/icons-material/Close";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";

export const RightBarHeader = () => {
    return (
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
    );
};
