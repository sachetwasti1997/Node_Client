import TicketForm from "../components/TicketForm";

export const CreateTicket = () => {
  return (
    <div className="card bg-light-blue-500">
      <div className="card-header">
        <h3 className="card-title">Create A Ticket</h3>
      </div>
      <div className="card-body">
        <TicketForm />
      </div>
    </div>
  );
};
