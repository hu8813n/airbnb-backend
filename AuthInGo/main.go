package main

import (
	"AuthInGo/app"
	"fmt"
)

func main() {

	cfg := app.NewConfig()
	app := app.NewApplication(cfg)
	fmt.Println("Starting server at port", cfg.Addr)
	app.Run()

}
