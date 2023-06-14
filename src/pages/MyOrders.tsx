import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { CurrentUser, Order } from "../type";
import { useEffect } from "react";
import { OrderState, fetchOrders } from "../features/orderSlice";
import OrderCard from "../components/OrderCard";

const MyOrders = () => {
  const orders = useSelector<RootState, OrderState>(
    (state: RootState) => state.order
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!orders.myOrders.length)dispatch(fetchOrders());
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 m-[20px]">
      {orders.myOrders.map((order) => (
        <OrderCard order={order} />
      ))}
    </div>
  );
};

export default MyOrders;
