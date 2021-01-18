import React from 'react';

export default class ProfileStatus extends React.Component{
    
    state = {
        editMode: false,
        status: this.props.status
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.status !== prevProps.status) {
            this.setState({
                status: this.state.status
            });
        }
    }

    changeStatus = (e) => {
        this.setState({
            editMode: true
        });
    }

    changingStatus = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    setUserStatus = () => {
        this.setState({
            editMode: !this.state.editMode
        });
        this.props.setUserStatus(this.state.status);
    }

    render() {

        return (
            <>
                {
                    (!this.state.editMode) ? 
                    <div>
                        <span onDoubleClick={this.changeStatus}>{this.props.status || "-------"}</span>
                    </div>
                    :
                    <div>
                        <input autoFocus value={this.state.status} onChange={this.changingStatus} onBlur={this.setUserStatus}/>
                    </div>
                }
            </>
        )
    }
}