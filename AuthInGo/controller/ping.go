package controller

import (
	"net/http"
)

func PingHandler(w http.ResponseWriter, r *http.Request) {
	response := `{"message": "pong"}`

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(response))
}
