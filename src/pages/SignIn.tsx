import SigningForm from "../components/SigningForm";

const SignIn = () => {
  return (
    <div className="card bg-light-blue-500">
      <div className="card-header">
        <h3 className="card-title">Sign In</h3>
      </div>
      <div className="card-body">
        <SigningForm action="Sign In" url="/api/users/signin" />
      </div>
    </div>
  );
};

export default SignIn;
