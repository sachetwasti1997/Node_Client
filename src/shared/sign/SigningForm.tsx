import { useState } from 'react';
import './signin.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn, signUp } from '../../features/currentUserSlice';
import { AppDispatch } from '../../app/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { ResponseError } from '../../type';
import { SIGN_IN_ACTION, SIGN_UP_ACTION } from '../../Constants';

interface Sign {
  action: string;
  url: string;
}

const SigningForm = ({ action }: Sign) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] =
    useState<Array<{ message: string; field?: string }>>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent): Promise<any> => {
    e.preventDefault();
    if (action === SIGN_UP_ACTION) {
      dispatch(signUp({ email, password }))
        .then(unwrapResult)
        .then((res) => navigate('/'))
        .catch((obj) => {
          if (obj.errors instanceof Array<ResponseError>) {
            setErrors(obj.errors);
          }
        });
    } else if (action === SIGN_IN_ACTION) {
      dispatch(signIn({ email, password }))
        .then(unwrapResult)
        .then((res) => navigate('/'))
        .catch((obj) => {
          if (obj.errors instanceof Array<ResponseError>) {
            setErrors(obj.errors);
          }
        });
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <form className="my-form" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errors && errors.length > 0 && errors.map(error => <p className="error-message">{error.message}</p>)}
            <button type="submit">{action}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SigningForm;
