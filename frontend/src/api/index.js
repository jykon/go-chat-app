var socket = new WebSocket("ws://localhost:8080/ws");
let connect = cb => {
    console.log("Trying to connect. . .");

    socket.onopen = () => {
        console.log("Connected and ready to go :D");
    };

    socket.onmessage = message => {
        console.log(message);
        cb(message)
        
    };

    socket.onclose = event => {
        console.log("Closed Connection: ", event);
    };

    socket.onerror = error => {
        console.log("Socket Error: ", error);
    };
};

let sendMessage = message => {
    console.log("Sending message: ", message);
    socket.send(message);
};

export { connect, sendMessage };