import React from 'react';
import { Field, Form } from 'react-final-form';
import { required } from '../../../utils/validators/validator';
import { Textarea } from '../../common/FormControl/FormControl';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
  const { posts, addPost, newPostText } = props;

  let postsElements = posts.map((p, index) => <Post message={p.message} likesCount={p.likesCount} key={index} />);

  const onSendMessageClick = (values) => {
    addPost(values.newMessageBody);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <Form
          onSubmit={(e) => onSendMessageClick(e)}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field name="newMessageBody" validate={required} placeholder="Enter your message" value={newPostText}>
                  {(props) => (
                    <div>
                      <Textarea {...props} />
                      <div>
                        <button onSubmit={onSendMessageClick}>Add post</button>
                      </div>
                    </div>
                  )}
                </Field>
              </div>
            </form>
          )}
        />
      </div>
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
