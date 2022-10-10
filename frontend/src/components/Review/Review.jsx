import './review.scss';
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";


export const Review = () => {
  return (
    <div className='review-container'>
        <div className='review'>
            <div className='header'>
                <div className='avatar'>
                    <img src={'https://xsgames.co/randomusers/assets/avatars/male/41.jpg'} alt="profile" />
                </div>
                <div className='info'>
                    <div className='name'>Jose R.</div>
                    <div className='icon'>
                    <Rating
                        className="rating"
                        name="text-feedback"
                        value={5}
                        readOnly
                        precision={0.5}
                        emptyIcon={<StarIcon fontSize="inherit" />}
                    />
                    </div>            
                </div>     
            </div>
            <div className='date'>7/28/2022</div>       
        </div>
        <p>I first met Edward D. Teach when I was looking for a carpenter to help me build a deck for my house. We were able to get the job done in a timely fashion and at a great price. The work was of high quality, and I highly recommend him as a carpenter.</p>
    </div> 
  )
}
