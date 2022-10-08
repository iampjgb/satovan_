import './serviceprovider.scss';
import StarIcon from '@mui/icons-material/Star';
import ChatIcon from '@mui/icons-material/Chat';
import CallIcon from '@mui/icons-material/Call';

export const ServiceProviderAvatar = () => {
    return (
        <div className='container'>
            <div className='serviceProviderAvatar'>
                <div className='header'>
                    <div className='profile'><img src={require('/Users/paulbaron/CAPSTONE/frontend/src/assets/services/carpenter.webp')} alt="Mr. Karpintero" /></div>
                </div>
                <div className='header-info'>
                    <h1>Mr. Karpintero</h1>
                    <div className='details'>
                        <StarIcon className='star-icon'/>
                        <span className='star-rate'>4.2</span>
                        <span>•</span>
                        <span className='review-counts'>100 reviews</span>
                        <span>•</span>
                        <span className='address'>Navotas City,Metro Manila</span>
                    </div>
                </div>
            </div>
            <div className='contact'>
                <div className='message'>
                    <ChatIcon/>
                    <span>Message</span>
                </div>
                <div className='message'>
                    <CallIcon/>
                    <span>Call</span>
                </div>
            </div>
        </div>
    )
}
