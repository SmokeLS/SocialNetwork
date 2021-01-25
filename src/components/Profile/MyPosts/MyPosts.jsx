import React from 'react';
import { Field, Form } from 'react-final-form';
import { required } from '../../../utils/validators/validator';
import { Textarea } from '../../common/FormControl/FormControl';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
    
    let postsElements =
        props.posts.map( p => <Post message={p.message} likesCount={p.likesCount}/>);
    
    const onSendMessageClick = (values) => {
        props.addPost(values.newMessageBody);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <Form
                    onSubmit={(e) => onSendMessageClick(e)}
                    validate={() => console.log()}
                    render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                            <div>
                            <Field name='newMessageBody' validate={required} placeholder='Enter your message' value={props.newPostText}>
                                {(props) => (
                                    <div>
                                         <Textarea {...props}/>    
                                         <div><button onSubmit={onSendMessageClick}>Add post</button></div>
                                    </div>
                                )}
                            </Field>
                            </div>
                    </form>
                    )}
                />
            </div>
            <div className={s.posts}>
                { postsElements }
            </div>
        </div>
    )
}

export default MyPosts;