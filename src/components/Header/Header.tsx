import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';

type PropsType = {
  isAuth: boolean;
  login: string | null;
  onExit: () => Promise<void>;
};

const Header: React.FC<PropsType> = (props) => {
  const { isAuth, login, onExit } = props;

  return (
    <>
      <div>
        {isAuth ? (
          <div className={s.divContainer}>
            <span>{login}</span>
            <Button type={'primary'} onClick={onExit}>
              logout
            </Button>
          </div>
        ) : (
          <NavLink to={'/login'}>Login</NavLink>
        )}
      </div>
    </>
  );
};

export default Header;
