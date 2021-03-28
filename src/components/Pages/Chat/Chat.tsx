import React, { useEffect, useState } from 'react';

const wss = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

const ChatPage: React.FC = () => {
  return (
    <>
      <Messages />
      <AddMessageForm />
    </>
  );
};

const Messages = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  useEffect(() => {
    wss.addEventListener('message', (e) => {
      const newMessage = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, ...newMessage]);
    });
  }, []);

  return (
    <div style={{ height: '400px', overflowY: 'auto' }}>
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
};

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  return (
    <div>
      <img src={message.photo} alt="3" style={{ width: '30px' }} /> <b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </div>
  );
};

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const sendMessage = () => {
    if (!message) {
      return;
    }
    wss.send(message);
    setMessage('');
  };
  return (
    <div>
      <div>
        <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
      </div>
      <div>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
