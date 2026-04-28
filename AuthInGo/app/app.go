package app

import (
	config "AuthInGo/config/env"
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
}

func NewApplication(config Config) *Application {
	return &Application{
		Config: config,
	}
}

func (app *Application) Run() error {
	server := &http.Server{
		Addr:         app.Config.Addr,
		Handler:      nil, //Tofo: setup chi router here
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second, // set write timeout to 10 second

	}
	return server.ListenAndServe()
}
