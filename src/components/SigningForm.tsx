import { useState } from "react";
import "./signin.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn, signUp } from "../features/currentUserSlice";
import { AppDispatch } from "../app/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { ResponseError } from "../type";
import { SIGN_IN_ACTION, SIGN_UP_ACTION } from "../Constants";

interface Sign {
  action: string;
  url: string;
}

const SigningForm = ({ action }: Sign) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] =
    useState<Array<{ message: string; field?: string }>>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent): Promise<any> => {
    e.preventDefault();
    if (action === SIGN_UP_ACTION) {
      dispatch(signUp({ email, password }))
        .then(unwrapResult)
        .then((res) => window.location.replace("/"))
        .catch((obj) => {
          if (obj.errors instanceof Array<ResponseError>) {
            setErrors(obj.errors);
          }
        });
    } else if (action === SIGN_IN_ACTION) {
      dispatch(signIn({ email, password }))
        .then(unwrapResult)
        .then((res) => window.location.replace("/"))
        .catch((obj) => {
          if (obj.errors instanceof Array<ResponseError>) {
            setErrors(obj.errors);
          }
        });
    }
  };

  return (
    <form className="w-full max-w-prose ml-[19%]" onSubmit={onSubmit}>
      <div className="flex mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-full-name"
          >
            Email
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-password"
          >
            Password
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      {errors && errors.length > 0 && (
        <div role="alert" className="ml-[25%] my-[2%]">
          <div className="bg-red-500 text-white font-bold rounded-t px-2 py-2">
            Error
          </div>
          <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            {errors.map((error) => (
              <p className="error-message">{error.message}</p>
            ))}
          </div>
        </div>
      )}
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            {action}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SigningForm;
