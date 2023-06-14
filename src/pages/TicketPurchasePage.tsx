import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { Order, TicketResp } from "../type";
import TicketLogo from "../shared/ticket.jpg";
import React, { ReactElement, useState } from "react";
import { createOrder } from "../features/orderSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const TicketPurchasePage = () => {
  const location = useLocation();
  const ticket: TicketResp | undefined = location.state?.ticket;
  const dispatch = useDispatch<AppDispatch>();
  const [errors, setErrors] = useState<
    Array<{ message: string; field?: string }>
  >([]);
  const navigate = useNavigate();

  const createOrderHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(createOrder({ ticketId: ticket!.id }))
      .then(unwrapResult)
      .then((res: Order) => navigate(`/order/${res.id}`, {
        state: {
          order: res,
          ticket
        }
      }))
      .catch((obj) => {
        if (obj.errors instanceof Array) {
          setErrors(obj.errors);
        }
      });
  };

  const leftSideComponent = (
    <>
      <div>
        <div className="grid grid-cols-2 my-5">
          <h2
            className="text-xl font-semibold ps-[10px]"
            style={{ textAlign: "start" }}
          >
            {ticket?.title}
          </h2>
          <div className="pe-[10px]" style={{ textAlign: "end" }}>
            ${ticket?.price}
          </div>
        </div>
        <p className="ps-[10px] mb-5">{ticket?.description}</p>
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
      </div>
    </>
  );

  const rightSideComponent = (
    <div className="ps-[10px] self-center">
      <div className="w-[100%] text-white block rounded-lg bg-black p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <h2 className="text-xl font-semibold">SUMMARY</h2>
        <div className="grid grid-cols-2 mt-2">
          <div>Subtotal</div>
          <div style={{ textAlign: "end" }}>${ticket?.price}</div>
        </div>
        <div className="grid grid-cols-2 mt-2">
          <div>Delivery Charge</div>
          <div style={{ textAlign: "end" }}>$0.0</div>
        </div>
        <div className="grid grid-cols-2 mt-2">
          <h2 className="text-xl font-semibold">Total</h2>
          <div style={{ textAlign: "end" }}>${ticket?.price}</div>
        </div>
        <button
          onClick={createOrderHandler}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 border border-orange-700 rounded mt-2 w-[100%]"
        >
          Checkout
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 m-[5%]">
        <h1
          className="text-2xl medium font-bold m-[5px]"
          style={{ textAlign: "center" }}
        >
          Ticket For Sale
        </h1>
        <div className="grid grid-cols-3 justify-between divide-x">
          <img src={TicketLogo} alt="..." />
          {leftSideComponent}
          {rightSideComponent}
        </div>
      </div>
    </>
  );
};

export default TicketPurchasePage;
