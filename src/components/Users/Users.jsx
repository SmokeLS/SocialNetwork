import React from 'react';
import s from './Users.module.css';
import userPhoto from "../../assets/user.png";
import { NavLink } from 'react-router-dom';
import * as axios from "axios";

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
                        <NavLink to={`/profile/`+ user.id}>
                            <div>
                                <img src={(user.photos.small) ? user.photos.small : userPhoto} width="100px"/>
                            </div>
                        </NavLink>
                        <div>
                            {user.name}
                        </div>
                        <div>
                            {(user.followed) ? <button disabled={props.followingQuery.some(id => id === user.id)}
                                                onClick={() => {
                                                    props.followingInProcess(true, user.id);
                                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/`+ user.id, {
                                                        withCredentials: true,
                                                        headers: {
                                                            "API-KEY": "da2c9fb8-27b6-44c6-9dae-4ff6dd0b7901"
                                                        }
                                                    })
                                                         .then((response) => {
                                                                if(response.data.resultCode === 0) {               
                                                                    props.followToggle(user.id);
                                                                }
                                                                props.followingInProcess(false, user.id);
                                                          })     
                                               
                                                }}>unfollow</button>:
                                                <button disabled={props.followingQuery.some(id => id === user.id)}
                                                onClick={() => {
                                                    props.followingInProcess(true, user.id);
                                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/`+ user.id, {}, {
                                                        withCredentials: true,
                                                        headers: {
                                                            "API-KEY": "da2c9fb8-27b6-44c6-9dae-4ff6dd0b7901"
                                                        }
                                                    })
                                                         .then((response) => {
                                                                if (response.data.resultCode === 0) {
                                                                    props.followToggle(user.id);
                                                                }
                                                                props.followingInProcess(false, user.id);
                                                           })
                                                    }}>follow</button>}
                        </div>
                    </div>
                );
            })
        }
     </div>
    )
}

export default User;