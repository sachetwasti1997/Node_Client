import { useNavigate } from "react-router-dom";
import { Order, TicketResp } from "../type";

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
    const createdAt = order.expiresAt.toString();
  return (
    <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div className="grid grid-cols-2 my-1">
        <h2 className="text-xl font-semibold" style={{ textAlign: "start" }}>
          {order.ticket.title}
        </h2>
        <div style={{ textAlign: "end" }}>{order.ticket.price}</div>
      </div>
      <div className="grid grid-cols-2">
        <h2 className="text-xl font-semibold" style={{ textAlign: "start" }}>
          {`Status`}
        </h2>
        <div style={{ textAlign: "end" }}>{order.status}</div>
      </div>
      <div className="grid grid-cols-2 my-1">
        <h2 className="" style={{ textAlign: "start" }}>
          Created At
        </h2>
        <div style={{ textAlign: "end" }}>{createdAt}</div>
      </div>
    </div>
  );
};

export default OrderCard;
