import React from 'react';
import s from './Post.module.css';

type PropsType = {
  message: string;
  likesCount: number;
}

const Post : React.FC<PropsType> = ({message, likesCount}) => {
  return (
    <div className={s.item}>
      <img src="https://movies4maniacs.liberty.me/wp-content/uploads/sites/1218/2015/09/avatarsucks.jpg" alt="Avatar" />
      {message}
      <div>
        <span>like</span> {likesCount}
      </div>
    </div>
  );
};

export default Post;
