package app

import (
	dbConfig "AuthInGo/config/db"
	config "AuthInGo/config/env"
	"AuthInGo/controller"
	repo "AuthInGo/db/repositories"
	"AuthInGo/router"
	"AuthInGo/services"
	"fmt"
	"net/http"
	"time"
)

type Config struct {
	Addr string
}

func NewConfig() Config {
	port := config.GetString("port", ":8080")
	return Config{
		Addr: port,
	}
}

type Application struct {
	Config Config
	Store  repo.Storage
}

// constructor for application
func NewApplication(config Config) *Application {
	return &Application{
		Config: config,
		Store:  *repo.NewStorage(),
	}
}

func (app *Application) Run() error {

	db, err := dbConfig.SetupDB()

	if err != nil {
		fmt.Println("Error COnnecting to DB", err)
		return err
	}

	ur := repo.NewUserRepository(db)
	us := services.NewUserService(ur)
	uc := controller.NewUserController(us)
	uRouter := router.NewUserRouter(uc)
	server := &http.Server{
		Addr:         app.Config.Addr,
		Handler:      router.SetupRouter(uRouter), //Tofo: setup chi router here
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second, // set write timeout to 10 second

	}
	return server.ListenAndServe()
}
