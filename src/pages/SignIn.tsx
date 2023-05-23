import SigningForm from '../shared/sign/SigningForm';

const SignIn = () => {
  return (
    <>
      <SigningForm action="Sign In" url="/api/users/signin" />
    </>
  );
};

export default SignIn;
