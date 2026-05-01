package controller

import (
	"AuthInGo/services"
	"encoding/json"
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

func (uc *UserController) GetUserById(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	uc.UserService.GetUserByIdService(id) //
	w.Write([]byte("User Retireived Succesfully"))
}

func (uc *UserController) GetAllUsers(w http.ResponseWriter, r *http.Request) {
	users, err := uc.UserService.GetAllUserService()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(users)
}
