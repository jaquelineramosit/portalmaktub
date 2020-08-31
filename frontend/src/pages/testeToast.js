import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const notify = () => toast.error("Wow so easy !");
    console.log("sss")
    return (
        <div>
      <button onClick={notify}>Notify !</button>
      <ToastContainer />
    </div>
  );
}
export default App;