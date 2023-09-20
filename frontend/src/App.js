import { useState, useEffect } from 'react';
import './App.css';
import { connect, sendMessage } from "./api";
import Header from './components/Header/Header';
import ChatHistory from './components/ChatHistory/ChatHistory';
import ChatInput from './components/ChatInput/ChatInput';

function App() {
  const [chatHistory, setChatHistory] = useState([]);

  const connectAndReceiveMessages = () => {
    connect((message) => {
      console.log("new messagiiiing message");
      setChatHistory(prevHistory => [...prevHistory, message]);
      console.log(chatHistory);
    });
  }

  useEffect(() => {
    connectAndReceiveMessages();// eslint-disable-next-line
  }, []); 

  const send = (message) => {
    console.log("New msg", message);
    sendMessage(message); // Mensagem que será mandada para o State
  }
  
  return (
    <div className="App">
      <Header />
      <ChatHistory chatHistory={chatHistory} />
      <ChatInput send ={send}/>
    </div>
  );
}
export default App;
