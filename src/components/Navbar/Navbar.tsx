import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
/* 
<Menu.Item key="1">option1</Menu.Item>
  <Menu.Item key="2">option2</Menu.Item>
  <Menu.Item key="3">option3</Menu.Item>
  <Menu.Item key="4">option4</Menu.Item>
 */
const Navbar = () => {
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink to="/profile" activeClassName={s.activeLink}>
          Profile
        </NavLink>
      </div>
      <div className={`${s.item} ${s.active}`}>
        <NavLink to="/dialogs" activeClassName={s.activeLink}>
          Messages
        </NavLink>
      </div>
      <div className={`${s.item}`}>
        <NavLink to="/users" activeClassName={s.activeLink}>
          Users
        </NavLink>
      </div>
      <div className={`${s.item}`}>
        <NavLink to="/News" activeClassName={s.activeLink}>
          News
        </NavLink>
      </div>
      <div className={`${s.item}`}>
        <NavLink to="/Music" activeClassName={s.activeLink}>
          Music
        </NavLink>
      </div>
      <div className={`${s.item}`}>
        <NavLink to="/Settings" activeClassName={s.activeLink}>
          Settings
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
