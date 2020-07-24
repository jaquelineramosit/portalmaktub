import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../global.css';

 const Toaster = {

    exibeMensagem: (status, msg) => {

        console.log(status);
        if(status === 'success') {          
            toast.success(                
                msg,
                { 
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            )
        }
        if(status === 'error') {
            console.log(msg);
            toast.error(                
                msg,
                { 
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            )  
        }


    }


    // const notify = () => toast("Wow so easy !");
 
    // return (
    //   <div>
    //     <button onClick={notify}>Notify !</button>
    //     <ToastContainer />
    //   </div>
    // );
}
export default Toaster;











// const Toaster = {
//     exibeMensagem: (status, msg) => {

//         console.log(status);
//         if(status === 'success') {            
//             M.toast({html: msg, classes: 'green', displayLength: 4000});
            
//         }
//         if(status === 'error') {
//             console.log(msg);
//             M.toast({html: msg, classes: 'red', displayLength: 4000});
//         }

//     }
// }
// export default Toaster;