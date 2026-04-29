package db

//This Storage struct helps to create objects of repositories and inject them into the service layer.
//  It is a common pattern in Go to facilitate dependency injection and manage database connections and repositories in a clean way.
//It removes the need to create individual repository instances in the service layer, and instead provides a centralized place to manage them.
type Storage struct { //facilitates dependency injection for repositories
	UserRepository UserRepository
}

func NewStorage() *Storage {

	return &Storage{
		UserRepository: &UserRepositoryImpl{},
	}
}
