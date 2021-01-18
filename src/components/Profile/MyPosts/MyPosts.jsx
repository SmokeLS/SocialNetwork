import React from 'react';
import { Field, Form } from 'react-final-form';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
    let postsElements =
        props.posts.map( p => <Post message={p.message} likesCount={p.likesCount}/>);

    let newPostElement = React.createRef();
    
    const onSendMessageClick = (values) => {
        props.addPost(values.newMessageBody);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <Form
                    onSubmit={(e) => onSendMessageClick(e)}
                    validate={() => console.log(true)}
                    render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                            <div><Field component="textarea"
                                        ref={newPostElement}
                                        name='newMessageBody'
                                        value={props.newPostText}
                                        placeholder='Enter your message'></Field></div>
                            <div><button onSubmit={onSendMessageClick}>Add post</button></div>
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