import React from 'react';
import s from './Users.module.css';
import userPhoto from '../../assets/user.png';
import { NavLink } from 'react-router-dom';

const User = (props) => {
  const { selectedPage, users, followingQuery, unfollow, follow, selectPage } = props;

  const pages = [];

  for (let i = 0; i < 5; i++) {
    pages.push(i + 1);
  }

  return (
    <div>
      <div>
        {pages.map((item) => {
          return (
            <button
              key={item}
              className={`${selectedPage === item && s.selected}`}
              onClick={() => {
                selectPage(item);
              }}
            >
              {item}
            </button>
          );
        })}
      </div>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <NavLink to={`/profile/` + user.id}>
              <div>
                <img alt="#" src={user.photos.small ? user.photos.small : userPhoto} width="100px" />
              </div>
            </NavLink>
            <div>{user.name}</div>
            <div>
              {user.followed ? (
                <button disabled={followingQuery.some((id) => id === user.id)} onClick={() => unfollow(user.id)}>
                  unfollow
                </button>
              ) : (
                <button disabled={followingQuery.some((id) => id === user.id)} onClick={() => follow(user.id)}>
                  follow
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default User;
