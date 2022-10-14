import './profilenavcard.scss';

   //import FormModal Context
import {SignInModal } from "../../context/FormModalContext";

//import UserAuth Context
import { UserAuth } from "../../context/AuthContext";

export const ProfileNavCardSignedIn = () => {
    //import functions and values from FormModal Context
const{formModal,handleFormModal,profileNavModal,handleProfileNavModal}=SignInModal();
 //import functions and values from UserAuth Context
const{googleSignIn,facebookSignIn,user,generateRecaptcha,logOut}=UserAuth();

  return (
    <div className='profileNavCard'>
        <div className='top-card'>
            <div className='profile-card-item default'>Notifications</div>
            <div className='profile-card-item' >Messages</div>
        </div>
        <div className='bottom-card'>
            <div className='profile-card-item default' onClick={()=>logOut()}>Logout</div>
        </div>
    </div>
  )
}
