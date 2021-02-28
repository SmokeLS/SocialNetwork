import { actions } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';
import { PostType } from '../../../types/types';
import { AppStateType } from '../../../redux/redux-store';

type MapStatePropsType = {
  posts: Array<PostType>;
  newPostText: string,
}

type MapDispatchPropsType = {
  addPost: (newMessageBody: string) => void;
}

const mapStateToProps = (state: AppStateType) : MapStatePropsType => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  };
};

const addPost = actions.addPost;

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType >(mapStateToProps, { addPost })(MyPosts);

export default MyPostsContainer;
