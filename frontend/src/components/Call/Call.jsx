import './call.scss';
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';

export const Call = () => {
  return (
    <div className='calling'>
        <div className='header'>
            <img src={require('/Users/paulbaron/CAPSTONE/frontend/src/assets/services/carpenter.webp')}/>
            <h1>Mr. Karpintero is calling...</h1>
        </div>
        <div className='action'>
            <div className='decline'>
                <CallEndIcon className='close-icon'/>
                <span>Decline</span>
            </div>
            <div className='accept'>
                <CallIcon className='call-icon'/>
                <span>Accept</span>
            </div>
        </div>
    </div>
  )
}
