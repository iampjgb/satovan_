import { useContext, createContext, useState } from "react";


const FormModalContext = createContext();

export const FormModalContextProvider = ({ children }) => {
    const [formModal, setFormModal] = useState(false);

    const handleFormModal=()=>{
        setFormModal(!formModal);
        console.log(formModal);
    }


    return (
        <FormModalContext.Provider value={{ formModal,handleFormModal }}>
            {children}
        </FormModalContext.Provider>
    );
};

export const SignInModal = () => {
    return useContext(FormModalContext);
};
