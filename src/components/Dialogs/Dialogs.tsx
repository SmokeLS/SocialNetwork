import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { required } from '../../utils/validators/validator';
import { Field, withTypes } from 'react-final-form';
import { Textarea } from '../common/FormControl/FormControl';
import {InitialStateType } from '../../redux/dialogs-reducer';

type FinalFormType = {
  message: {newMessageBody: string}
}

type PropsType = {
  dialogsPage: InitialStateType,
  sendMessage: (status: string) => void,
}

const Dialogs: React.FC<PropsType> = (props) => {
  const { sendMessage, dialogsPage } = props;

  const onSendMessageClick = (values: FinalFormType) => {
    sendMessage(values.message.newMessageBody);
  };

  const dialogsElements = dialogsPage.dialogs.map((d) => <DialogItem name={d.name} id={d.id} key={d.id} />);
  const messagesElements = dialogsPage.messages.map((m) => <Message message={m.message} key={m.id} />);

  const {Form}= withTypes<FinalFormType>();

  return (
    <>
      <div className={s.dialogs}>
        <div className={s.dialogsItems}>{dialogsElements}</div>
        <div className={s.messages}>
          <div>{messagesElements}</div>
        </div>
      </div>
      <Form
        onSubmit={(values:FinalFormType) => onSendMessageClick(values)}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field name="newMessageBody" validate={required} placeholder="Enter your message">
                {(props) => (
                  <div>
                    <Textarea {...props} />
                  </div>
                )}
              </Field>
            </div>
            <div>
              <button>Send</button>
            </div>
          </form>
        )}
      />
    </>
  );
};

export default Dialogs;
