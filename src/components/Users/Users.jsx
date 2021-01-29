import React, { useState } from 'react';
import s from './Users.module.css';
import userPhoto from '../../assets/user.png';
import { NavLink } from 'react-router-dom';

const User = (props) => {
  const { selectedPage, users, followingQuery, unfollow, follow, selectPage, totalPages, pageSize } = props;

  const pages = [];

  for (let i = 0; i < totalPages; i++) {
    pages.push(i + 1);
  }

  const portionCount = Math.ceil(totalPages / pageSize);
  let [portionNumber, setPortionNumber] = useState(1);
  const leftBorderPagination = (portionNumber - 1) * pageSize + 1;
  const rightBorderPagination = portionNumber * pageSize;

  return (
    <div>
      <div>
        {portionNumber > 1 ? (
          <button
            onClick={() => {
              setPortionNumber(--portionNumber);
            }}
          >
            Prev
          </button>
        ) : (
          ''
        )}
        {pages
          .filter((portion) => portion >= leftBorderPagination && portion < rightBorderPagination)
          .map((portion) => {
            return (
              <button
                key={portion}
                className={`${selectedPage === portion && s.selected}`}
                onClick={() => {
                  selectPage(portion);
                }}
              >
                {portion}
              </button>
            );
          })}
        {portionNumber < portionCount ? (
          <button
            onClick={() => {
              setPortionNumber(++portionNumber);
            }}
          >
            Next
          </button>
        ) : (
          ''
        )}
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
