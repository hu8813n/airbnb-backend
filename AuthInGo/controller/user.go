package controller

import (
	"AuthInGo/services"
	"net/http"
)

type UserController struct {
	UserService services.UserService
}

func NewUserController(_userService services.UserService) *UserController {
	return &UserController{
		UserService: _userService,
	}
}

func (uc *UserController) RegisterUser(w http.ResponseWriter, r *http.Request) {

	uc.UserService.CreateUser() // call the service to create a user

	w.Write([]byte("User Registeration Endpoint"))
}
