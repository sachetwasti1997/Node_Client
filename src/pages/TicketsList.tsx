import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets } from "../features/ticketSlice";
import { AppDispatch, RootState } from "../app/store";
import { TicketResp } from "../type";
import TicketCard from "../components/TicketCard";

const TicketList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const stateR = useSelector<RootState, Array<TicketResp>>(
    (state: RootState) => state.ticketCreatedState.allTickets
  );

  useEffect(() => {
    if (stateR.length === 0)dispatch(fetchTickets());
  }, []);

  console.log(stateR);

  return (
    <div className="grid grid-cols-3 gap-4 m-[20px]">
      {stateR.map((ticket) => (
        <TicketCard ticket={ticket} />
      ))}
    </div>
  );
};

export default TicketList;
