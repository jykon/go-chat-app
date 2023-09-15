import { useState, useEffect } from 'react';
import './App.css';
import { connect, sendMessage } from "./api";
import Header from './components/Header/Header';
import ChatHistory from './components/ChatHistory/ChatHistory';

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
    connectAndReceiveMessages();
  }, []); 

  const send = () => {
    console.log("hihihi");

    // Mensagem que será mandada para o State
    sendMessage("hohohoho");
  }

  return (
    <div className="App">
      <Header />
      <ChatHistory chatHistory={chatHistory} />
      <button onClick={send}>Hit me</button>
    </div>
  );
}

export default App;
