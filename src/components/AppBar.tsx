import { useDispatch, useSelector } from "react-redux";
import "./AppBar.css";
import { AppDispatch, RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import { signOut } from "../features/currentUserSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const AppBar = () => {
  const state = useSelector((state: RootState) => state.currentUserState);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onSignOutClicked = () => {
    dispatch(signOut());
    // .then(unwrapResult)
    // .then((res) => window.location.replace('/'));
  };

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
      <ul className="flex items-center gap-[0.5vw]">
        <li>
          <button
            className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]"
            // onClick={}
          >
            My Orders
          </button>
        </li>
        <li>
          <button
            className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]"
            onClick={(e) => navigate("/create/ticket")}
          >
            Sell
          </button>
        </li>
        <li>
          <button
            className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]"
            onClick={onSignOutClicked}
          >
            Sign Out
          </button>
        </li>
      </ul>
    );
  }
  return (
    <nav className="bg-white flex justify-between items-center mx-auto h-[6%] px-5">
      <div>
        <div className="nav__header" onClick={(e) => navigate("/")}>
          <h1 className="hover:text-gray-500">Tickets</h1>
        </div>
      </div>
      <div>{componentToRender}</div>
    </nav>
  );
};

export default AppBar;
