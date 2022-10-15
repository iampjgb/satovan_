import './profilenavcard.scss';

   //import FormModal Context
import {SignInModal } from "../../context/FormModalContext";

export const ProfileNavCard = () => {
    //import functions and values from FormModal Context
const{handleFormModal,handleProFormModal}=SignInModal();


  return (
    <div className='profileNavCard'>
        <div className='top-card'>
            <div className='profile-card-item default' onClick={handleFormModal}>Sign Up</div>
            <div className='profile-card-item' onClick={handleFormModal}>Log In</div>
        </div>
        <div className='bottom-card'>
            <div className='profile-card-item default' onClick={handleProFormModal}>Join as Professional</div>
        </div>
    </div>
  )
}
