import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { required} from "./../../utils/validators/validator";
import {Form, Field} from 'react-final-form';
import { Textarea } from '../common/FormControl/FormControl';

const Dialogs = (props) => {
    let onSendMessageClick = (values) => {
        props.sendMessage(values.newMessageBody);
    }
    
    let state = props.dialogsPage;
        
    let dialogsElements = state.dialogs.map( d => <DialogItem name={d.name} id={d.id}  key={d.id}/>  );
    let messagesElements = state.messages.map( m => <Message message={m.message} /> );

    return (
        <>
            <div className={s.dialogs}>
                    <div className={s.dialogsItems}>
                        { dialogsElements }
                    </div>
                    <div className={s.messages}>
                        <div>{ messagesElements }</div>
                    </div>
                </div>
            <Form
            onSubmit={(e) => onSendMessageClick(e)}
            validate={() => console.log()}
            render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
                <div>
                    <Field name='newMessageBody' validate={required} placeholder='Enter your message'>
                        {(props) => (
                            <div>
                                <Textarea {...props}/>    
                            </div>
                        )}
                    </Field>
                </div>
                <div><button onClick={onSendMessageClick}>Send</button></div>
            </form>
            )}
            />   
    </>
    )
}

export default Dialogs;