import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../app/store";
import { TicketResp } from "../type";
import TicketLogo from "../shared/ticket.jpg";

const TicketPurchasePage = () => {
  const location = useLocation();
  const ticket: TicketResp = location.state.ticket;

  const leftSideComponent = (
    <>
      <div>
        <div className="grid grid-cols-2 my-5">
          <h2
            className="text-xl font-semibold ps-[10px]"
            style={{ textAlign: "start" }}
          >
            {ticket.title}
          </h2>
          <div className="pe-[10px]" style={{ textAlign: "end" }}>
            ${ticket.price}
          </div>
        </div>
        <p className="ps-[10px]">{ticket.description}</p>
      </div>
    </>
  );

  const rightSideComponent = (
    <div className="ps-[10px] self-center">
      <div className="w-[100%] text-white block rounded-lg bg-black p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <h2 className="text-xl font-semibold">SUMMARY</h2>
        <div className="grid grid-cols-2 mt-2">
          <div>Subtotal</div>
          <div style={{ textAlign: "end" }}>${ticket.price}</div>
        </div>
        <div className="grid grid-cols-2 mt-2">
          <div>Delivery Charge</div>
          <div style={{ textAlign: "end" }}>$0.0</div>
        </div>
        <div className="grid grid-cols-2 mt-2">
          <h2 className="text-xl font-semibold">Total</h2>
          <div style={{ textAlign: "end" }}>${ticket.price}</div>
        </div>
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 border border-orange-700 rounded mt-2 w-[100%]">
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
          <img src={TicketLogo} alt="..."/>
          {leftSideComponent}
          {rightSideComponent}
        </div>
      </div>
    </>
  );
};

export default TicketPurchasePage;
