import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../features/currentUserSlice";
import { AppDispatch } from "../app/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const SignOut = () => {

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(signOut())
      .then(unwrapResult)
      .then((res) => window.location.replace('/'));
  }, [])

  return (
    <p>Signing you out...</p>
  );
};

export default SignOut;