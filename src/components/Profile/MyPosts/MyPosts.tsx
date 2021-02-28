import React from 'react';
import { Field, withTypes } from 'react-final-form';
import { PostType } from '../../../types/types';
import { required } from '../../../utils/validators/validator';
import { Textarea } from '../../common/FormControl/FormControl';
import s from './MyPosts.module.css';
import Post from './Post/Post';

type FinalFormType = {
  newMessageBody: string;
}

type PropsType = {
  posts: Array<PostType>
  addPost: (newMessageBody: string) => void;
  newPostText: string;
}

const MyPosts : React.FC<PropsType> = (props) => {
  const { posts, addPost, newPostText } = props;

  let postsElements = posts.map((p, index) => <Post message={p.message} likesCount={p.likesCount} key={index} />);

  const onSendMessageClick = (values: FinalFormType) => {
    addPost(values.newMessageBody);
  };

  const {Form}= withTypes<FinalFormType>();

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <Form
          onSubmit={(values: FinalFormType) => onSendMessageClick(values)}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field name="newMessageBody" validate={required} placeholder="Enter your message" value={newPostText}>
                  {(props) => (
                    <div>
                      <Textarea {...props} />
                      <div>
                        <button>Add post</button>
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
