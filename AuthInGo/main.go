package main

import (
	"AuthInGo/app"
	"fmt"
)

func main() {

	cfg := app.NewConfig(":8080")
	app := app.NewApplication(cfg)

	fmt.Println("Starting server at port: ", cfg.Addr)
	app.Run()

}
