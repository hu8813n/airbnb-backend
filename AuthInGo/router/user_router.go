package router

import (
	"AuthInGo/controller"

	"github.com/go-chi/chi/v5"
)

type Router interface {
	Register(r chi.Router)
	FindUserById(r chi.Router)
	FindAllUsers(r chi.Router)
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

func (ur *UserRouter) FindUserById(r chi.Router) {
	r.Get("/user/{id}", ur.UserController.GetUserById)
}

func (ur *UserRouter) FindAllUsers(r chi.Router) {
	r.Get("/users", ur.UserController.GetAllUsers)
}
