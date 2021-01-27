import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  const { isAuth, login, onExit } = props;

  return (
    <header className={s.header}>
      <img src="https://www.freelogodesign.org/Content/img/logo-ex-7.png" alt="#" />

      <div className={s.loginBlock}>
        {isAuth ? (
          <div>
            {login}
            <button onClick={onExit}>logout</button>
          </div>
        ) : (
          <NavLink to={'/login'}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
