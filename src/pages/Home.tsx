import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";

const Home = () => {
  const state = useSelector<RootState>(state => state.currentUserState.currentUser)
  return (
    <div>
      {state ? <p>You are logged In!</p>:<p>You are NOT logged In!</p>}
    </div>
  );
};

export default Home;