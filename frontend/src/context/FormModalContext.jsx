import { useContext, createContext, useState } from "react";


const FormModalContext = createContext();

export const FormModalContextProvider = ({ children }) => {
    const [formModal, setFormModal] = useState(false);
    const [profileNavModal, setProfileNavModal] = useState(false);
    const [proFormModal,setProFormModal]=useState(false);

    const handleFormModal=()=>{
        setFormModal(!formModal);
        setProfileNavModal(!profileNavModal);
    }

    const handleProfileNavModal=()=>{
        setProfileNavModal(!profileNavModal);
    }

    const handleProFormModal=()=>{
        setProFormModal(!proFormModal);
    }



    return (
        <FormModalContext.Provider value={{ formModal,setFormModal,handleFormModal,handleProfileNavModal,profileNavModal,setProfileNavModal,handleProFormModal,proFormModal }}>
            {children}
        </FormModalContext.Provider>
    );
};

export const SignInModal = () => {
    return useContext(FormModalContext);
};
