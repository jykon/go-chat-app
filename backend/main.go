package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// Defining upgrader
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,

	CheckOrigin: func(request *http.Request) bool { return true },
}

func reader(connection *websocket.Conn) {
	for {
		// reads a message
		messageType, p, err := connection.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		// print that message
		fmt.Println(string(p))

		if err := connection.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}
	}
}

func serveWebSocket(writer http.ResponseWriter, request *http.Request) {
	fmt.Println(request.Host)

	// upgrading this connection to a WebSocket connection
	webSocket, err := upgrader.Upgrade(writer, request, nil)
	if err != nil {
		log.Println(err)
	}

	// listen for new messages coming through the WebSocket connection

	reader(webSocket)
}

func setRoutes() {
	http.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
		fmt.Fprintf(writer, "Server is serving")
	})

	http.HandleFunc("/ws", serveWebSocket)
}

func main() {
	fmt.Println("Initial tests v1")
	setRoutes()
	http.ListenAndServe(":8080", nil)
}
