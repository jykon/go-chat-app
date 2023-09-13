import './App.css';
import { connect, sendMessage } from "./api";

function send() {
  console.log("hi");
  sendMessage("hi hi");
}

function App() {
  connect();
  return (
    <div className="App">
      <button onClick={send}>Hit me</button>
    </div>
  );
}

export default App;
