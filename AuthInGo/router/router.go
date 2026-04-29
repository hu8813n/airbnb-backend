package router

import (
	"AuthInGo/controller"
	"github.com/go-chi/chi/v5"
)

func SetupRouter(UserRouter Router) *chi.Mux {
	chiRouter := chi.NewRouter()

	//Define your routes here

	chiRouter.Get("/ping", controller.PingHandler)
	UserRouter.Register(chiRouter)

	return chiRouter
}
