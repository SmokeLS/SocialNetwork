import React from 'react';
import s from './Users.module.css';
import userPhoto from "../../assets/user.png";
import { NavLink } from 'react-router-dom';

const User = (props) => {
    const pages = [];

    for (let i = 0; i < 5; i++) {
        pages.push(i+1);
    }
    
    return (
        <div>
            <div>
                {
                    pages.map(item => {
                        return <button key={item} className={`${props.selectedPage=== item && s.selected}`}
                        onClick={() => {props.selectPage(item)}}>{item}</button>
                    })
                }
            </div>
        { 
            props.users.map( user => {
                return (
                    <div key={user.id}>
                        <NavLink to="./profile">
                            <div>
                                <img src={(user.photos.small) ? user.photos.small : userPhoto} width="100px"/>
                            </div>
                        </NavLink>
                        <div>
                            {user.name}
                        </div>
                        <div>
                            {(user.followed) ? <button 
                                                onClick={() => { props.followToggle(user.id); }}>unfollow</button>:
                                                <button onClick={() => {props.followToggle(user.id); }}>follow</button>}
                        </div>
                    </div>
                );
            })
        }
     </div>
    )
}

export default User;