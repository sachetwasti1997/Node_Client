import { useLocation } from "react-router-dom";
import { Order, TicketResp } from "../type";
import { useEffect } from "react";
import Counter from "../components/Counter";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const TicketPayPage = () => {

  const location = useLocation();
  const {
    order,
    ticket,
  }: { order: Order | undefined; ticket: TicketResp | undefined } =
    location.state;
  
  async function onToken(id: string, orderId: string) {
    await axios.post("/api/payments", {
      token: id,
      orderId
    }).then(res => console.log(res));
  }

  const currentDate = new Date();
  let remainingSeconds = 60;
  if (order) {
    console.log(order);
    const expireDate = new Date(order.expiresAt).getTime();
    const currentDate = new Date().getTime();;
    remainingSeconds = Math.ceil((expireDate - currentDate) / 1000);
  }

  return (
    <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 m-[5%]">
      <h2 className="text-xl font-semibold m-10" style={{ textAlign: "start" }}>
        {`Purchasing the Ticket: ${ticket?.title}`}
      </h2>
      <Counter timeLimit={remainingSeconds} />
      <StripeCheckout
        token={({ id }) => onToken(id, order!.id)}
        stripeKey="pk_test_51NExyrSJhWa009RSp3rDviOznlqe32LnANcteklf8tTPP0dZBajjXJnogln4GEtZXCl8n2tWWjgrCxm7OwUy4Y8R00lPKcti0G"
        amount={parseInt(order!.ticket.price) * 100}
      />
    </div>
  );
};

export default TicketPayPage;
