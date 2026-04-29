package router

import (
	"AuthInGo/controller"
	"github.com/go-chi/chi/v5"
)

func SetupRouter() *chi.Mux {
	router := chi.NewRouter()

	//Define your routes here

	router.Get("/ping", controller.PingHandler)

	return router
}
