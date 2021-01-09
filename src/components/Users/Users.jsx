import React from 'react';
import s from './Users.module.css';
import * as axios from "axios";
import userPhoto from "../../assets/user.png";

export default class User extends React.Component{

    constructor(props) {
        super(props);

        axios.get("https://social-network.samuraijs.com/api/1.0/users")
             .then((response) => props.setUsers(response.data.items));
    }

    render() {
        return (
            this.props.usersPage.users.map( user => {
                return (
                    <div key={user.id}>
                        <div>
                            <img src={(user.small) ? user.small : userPhoto} width="100px"/>
                        </div>
                        <div>
                            {user.name}
                        </div>
                        <div>
                            {(user.followed) ? <button 
                                                onClick={() => { this.props.followToggle(user.id); }}>unfollow</button>:
                                                <button onClick={() => {this.props.followToggle(user.id); }}>follow</button>}
                        </div>
                    </div>
                );
            })
        )
    }
}
