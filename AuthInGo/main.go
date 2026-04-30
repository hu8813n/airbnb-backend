package main

import (
	"AuthInGo/app"
	config "AuthInGo/config/db"
	"fmt"
)

func main() {

	cfg := app.NewConfig()
	app := app.NewApplication(cfg)
	config.SetupDB()

	fmt.Println("Starting server at port", cfg.Addr)
	app.Run()

}
