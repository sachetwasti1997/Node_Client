import { useDispatch, useSelector } from "react-redux";
import "./AppBar.css";
import { AppDispatch, RootState } from "../app/store";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../features/currentUserSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import TicketLogo from "../shared/ticket-logo.png";

const AppBar = () => {
  const state = useSelector((state: RootState) => state.currentUserState);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onSignOutClicked = () => {
    dispatch(signOut())
      .then(unwrapResult)
      .then((res) => window.location.replace('/'));
  };

  const signedInComponent = (
    <ul className="flex items-center gap-[4vw]">
      <li>
        <Link className="hover:text-gray-500" to="/orders">
          My Orders
        </Link>
      </li>
      <li>
        <Link className="hover:text-gray-500" to="/create/ticket">
          Create Ticket
        </Link>
      </li>
    </ul>
  );

  let componentToRender = (
    <ul className="flex items-center gap-[0.5vw]">
      <li>
        <button
          className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]"
          onClick={(e) => navigate("/signin")}
        >
          Sign In
        </button>
      </li>
      <li>
        <button
          className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]"
          onClick={(e) => navigate("/signup")}
        >
          Sign Up
        </button>
      </li>
    </ul>
  );
  if (state.currentUser) {
    componentToRender = (
      <button
        className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]"
        onClick={onSignOutClicked}
      >
        Sign Out
      </button>
    );
  }
  return (
    <nav className="bg-white flex justify-between items-center mx-auto h-[53px] px-5">
      <div>
        <img className="w-30 h-16" src={TicketLogo} onClick={(e) => navigate("/")} />
      </div>
      {state.currentUser && <div>{signedInComponent}</div>}
      <div>{componentToRender}</div>
    </nav>
  );
};

export default AppBar;
