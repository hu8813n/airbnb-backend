package services

import (
	db "AuthInGo/db/repositories"
	"fmt"
)

type UserService interface {
	CreateUser() error
}

// UserService is not directly dependent on the UserRepository, but it is injected with an interface that defines the methods it needs.
//
//	This allows for better separation of concerns and makes it easier to test the service layer by mocking the repository layer.
type UserServiceImpl struct {
	userRepository db.UserRepository
}

// constructor for UserServiceImpl
// The NewUserService function takes a UserRepository as an argument and returns a new instance of UserServiceImpl with the repository injected.
// It does not create a new instance of UserRepositoryImpl directly,
//
//	but instead relies on the caller to provide an implementation of the UserRepository interface.
//	This allows for greater flexibility and makes it easier to swap out different implementations of the repository if needed.
func NewUserService(_userRepository db.UserRepository) UserService {
	return &UserServiceImpl{
		userRepository: _userRepository,
	}
}

func (u *UserServiceImpl) CreateUser() error {
	fmt.Println("Creating user in the service layer")
	u.userRepository.Create() // call the create method of the repository to create a user in the database
	return nil
}
