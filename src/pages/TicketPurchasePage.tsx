import { useLocation } from "react-router-dom";

const TicketPurchasePage = () => {
  const location = useLocation()
  console.log(location);
  
  return (
    <div>Trying to purchase page</div>
  )
}

export default TicketPurchasePage;