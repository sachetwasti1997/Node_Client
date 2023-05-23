import { useDispatch, useSelector } from 'react-redux';
import './AppBar.css';
import { AppDispatch, RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../features/currentUserSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const AppBar = () => {
  const state = useSelector((state: RootState) => state.currentUserState);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onSignOutClicked = () => {
    dispatch(signOut());
    // .then(unwrapResult)
    // .then((res) => window.location.replace('/'));
  };

  let componentToRender = (
    <>
      <button className="navbar__button" onClick={(e) => navigate('/signin')}>
        Sign In
      </button>
      <span className="navbar__space"></span>
      <button className="navbar__button" onClick={(e) => navigate('/signup')}>
        Sign Up
      </button>
    </>
  );
  if (state.currentUser) {
    componentToRender = (
      <button className="navbar__button" onClick={onSignOutClicked}>
        Sign Out
      </button>
    );
  }
  return (
    <nav className="navbar">
      <div className="navbar__left">
        <button className="nav__header" onClick={(e) => navigate('/')}>
          <h4>Tickets</h4>
        </button>
      </div>
      <div className="navbar__right">{componentToRender}</div>
    </nav>
  );
};

export default AppBar;
