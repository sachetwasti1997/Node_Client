import SigningForm from "../components/SigningForm";
import { TicketCard } from "../components/TicketCard";

const SignIn = () => {
  return (
    <>
      <div className="card bg-light-blue-500">
        <div className="card-header">
          <h3 className="card-title">Sign In</h3>
        </div>
        <div className="card-body">
          <SigningForm action="Sign In" url="/api/users/signin" />
        </div>
      </div>
      <TicketCard/>
    </>
  );
};

export default SignIn;
