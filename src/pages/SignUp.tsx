import SigningForm from "../components/SigningForm";

const SignUp = () => {
  return (
    <div className="card bg-light-blue-500">
      <div className="card-header">
        <h3 className="card-title">Sign Up</h3>
      </div>
      <div className="card-body">
        <SigningForm action="Sign Up" url="/api/users/signup" />
      </div>
    </div>
  );
};

export default SignUp;
