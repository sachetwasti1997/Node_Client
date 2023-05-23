import SigningForm from '../shared/sign/SigningForm';

const SignUp = () => {
  return (
    <>
      <SigningForm action="Sign Up" url="/api/users/signup" />
    </>
  );
};

export default SignUp;
