import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../global.css';

export const PopUpToaster = () => {

    return (
        <ToastContainer />
    )
}

const Toaster = {

    exibeMensagem: (status, msg) => {
        switch(status) {
            case 'success':
                toast.success(                
                    msg,
                    { 
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                )
                break;
            case 'error':                 
                toast.error(                
                    msg,
                    { 
                        position: "top-right",
                        autoClose: 15000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                )
                break;
            case 'warning': 
                toast.warning(                
                    msg,
                    { 
                        position: "top-right",
                        autoClose: 15000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                )
                break;
            case 'info': 
                toast.info(                
                    msg,
                    { 
                        position: "top-right",
                        autoClose: 15000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                )
                break;
            case 'logon-success':
                toast.success(                
                    msg,
                    { 
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                )
                break;
            case 'logon-error':
                toast.error(                
                    msg,
                    { 
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                )
                break;
        }
    }
}
export default Toaster;