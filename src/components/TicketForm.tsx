import { useState } from "react";
import "./signin.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { createTicket } from "../features/ticketSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { ResponseError } from "../type";

const TicketForm = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] =
    useState<Array<{ message: string; field?: string }>>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent): Promise<any> => {
    e.preventDefault();
    console.log(`Submitting form with ${title} ${price}`);
    dispatch(createTicket({ description, title, price }))
      .then(unwrapResult)
      .then((res) => navigate("/"))
      .catch((obj) => {
        console.log(obj);
        if (obj.errors instanceof Array<ResponseError>) {
          setErrors(obj.errors);
        }
      });
  };

  return (
    <form className="w-full max-w-prose ml-[19%] w-[75%]" onSubmit={onSubmit}>
      <div className="flex mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="title"
          >
            Title
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="price"
          >
            Price
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="description"
          >
            Description
          </label>
        </div>
        <div className="md:w-2/3">
          <textarea
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 h-[200px]"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
              <p className="error-message" key={error.message}>
                {error.message}
              </p>
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
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default TicketForm;
