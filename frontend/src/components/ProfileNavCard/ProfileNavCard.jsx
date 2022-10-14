import './profilenavcard.scss';

   //import FormModal Context
import {SignInModal } from "../../context/FormModalContext";

//import UserAuth Context
import { UserAuth } from "../../context/AuthContext";

export const ProfileNavCard = () => {
    //import functions and values from FormModal Context
const{formModal,handleFormModal,profileNavModal,handleProfileNavModal}=SignInModal();
 //import functions and values from UserAuth Context
const{googleSignIn,facebookSignIn,user,generateRecaptcha}=UserAuth();

  return (
    <div className='profileNavCard'>
        <div className='top-card'>
            <div className='profile-card-item default' onClick={handleFormModal}>Sign Up</div>
            <div className='profile-card-item' onClick={handleFormModal}>Log In</div>
        </div>
        <div className='bottom-card'>
            <div className='profile-card-item default'>Join as Professional</div>
        </div>
    </div>
  )
}
