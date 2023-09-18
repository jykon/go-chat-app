package main

import (
	"fmt"
	"net/http"

	"github.com/jykon/go-chat-app/pkg/websocket"
)

func serveWs(pool *websocket.Pool, writer http.ResponseWriter, request *http.Request) {
	fmt.Println("We hit the EndPoint, boys")
	conn, err := websocket.Upgrade(writer, request)
	if err != nil {
		fmt.Fprintf(writer, "%+v\n", err)
	}

	client := &websocket.Client{
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
}

func setRoutes() {
	pool := websocket.NewPool()
	go pool.Start()

	http.HandleFunc("/ws", func(writer http.ResponseWriter, request *http.Request) {
		serveWs(pool, writer, request)
	})
}

func main() {
	fmt.Println("Now Distributed Application v1")
	setRoutes()
	http.ListenAndServe(":8080", nil)
}
