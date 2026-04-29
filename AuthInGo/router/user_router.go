package router

import (
	"AuthInGo/controller"

	"github.com/go-chi/chi/v5"
)

type Router interface {
	Register(r chi.Router)
}

type UserRouter struct {
	UserController controller.UserController
}

func NewUserRouter(_userController *controller.UserController) Router {
	return &UserRouter{
		UserController: *_userController,
	}
}

func (ur *UserRouter) Register(r chi.Router) {
	r.Post("/signup", ur.UserController.RegisterUser)
}
