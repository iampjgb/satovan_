import './serviceprovider.scss';
import StarIcon from '@mui/icons-material/Star';
import ChatIcon from '@mui/icons-material/Chat';
import CallIcon from '@mui/icons-material/Call';
import LocalMallIcon from '@mui/icons-material/LocalMall';

export const ServiceProviderAvatar = () => {
    return (
        <div className='container'>
            <div className='serviceProviderAvatar'>
                <div className='header'>
                    <div className='profile'><img src={require('/Users/paulbaron/CAPSTONE/frontend/src/assets/services/carpenter.webp')} alt="Mr. Karpintero" /></div>
                </div>
                <div className='header-info'>
                    <div className='title'>
                        <h1>Mr. Karpintero</h1>
                        <span className='dot'>•</span>
                        <span className='online'>Online</span>
                    </div>
                    <div className='details'>
                        <StarIcon className='star-icon'/>
                        <span className='star-rate'>4.2</span>
                        <span>•</span>
                        <span className='review-counts'>100 reviews</span>
                        <span>•</span>
                        <span className='hires'>135 hires</span>
                    </div>
                </div>
                {/* <div className='cart'>
                    <span className='icon'><LocalMallIcon className='cart-icon'/></span>
                    <span className='count'>1</span>
                </div> */}
            </div>
            <div className='contact'>
                <div className='message'>
                    <ChatIcon/>
                    <span>Message</span>
                </div>
                <div className='call'>
                    <CallIcon/>
                    <span>Call</span>
                </div>
            </div>
        </div>
    )
}
