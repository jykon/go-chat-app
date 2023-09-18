FROM golang:1.21.1
WORKDIR /
COPY go.mod ./
COPY go.sum ./
COPY main.go ./
RUN go mod download

RUN go build -o /gochat

EXPOSE 8080

CMD ["/gochat"]