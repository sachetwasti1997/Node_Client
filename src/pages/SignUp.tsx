import { SignUpForm } from "../components/SignUpForm";
import SigningForm from "../components/SigningForm";

const SignUp = () => {
  return (
    <div className="card bg-light-blue-500">
      <div className="card-header">
        <h3 className="card-title">Sign Up</h3>
      </div>
      <div className="card-body">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
