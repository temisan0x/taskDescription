import React from "react";
import TaskList from "./components/TaskList";
import TaskBar from "./components/TaskDescription";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { login, reset } from "./redux/auth/authSlice";

function App() {

  //select the states we want for the login
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(reset());
    //fill dependency array
  }, [isError, isLoading, isSuccess, message, dispatch ]);

  console.log(user);

  const handleClick = () => {
    dispatch(login())
    toast("Please wait, Login processing...");
  }



  return (
    <>
      {user ? (
        <>
          <TaskList />
          <TaskBar />
        </>
      ) : (
          <div className="signin">
          <button disabled={user} onClick={handleClick} className="signinBtn">
          login 
          </button>
            <ToastContainer />
          </div>
      )}
    </>
  );
}

export default App;
