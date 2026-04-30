package config

import (
	env "AuthInGo/config/env"
	"database/sql"
	"fmt"

	"github.com/go-sql-driver/mysql"
)

func SetupDB() (*sql.DB, error) {

	cfg := mysql.NewConfig()

	cfg.User = env.GetString("DB_User", "root")
	cfg.Passwd = env.GetString("DB_Password", "root123")
	cfg.Net = env.GetString("DB_Net", "tcp")
	cfg.Addr = env.GetString("DB_Addr", "127.0.0.1:3306")
	cfg.DBName = env.GetString("DBName", "auth_dev")

	fmt.Println("Connecting to db", cfg.DBName, cfg.FormatDSN())

	//sql.Open() helps us to connect the db
	db, err := sql.Open("mysql", cfg.FormatDSN())

	if err != nil {
		fmt.Printf("Error connecting to database: %v\n", err)
		return nil, err
	}

	fmt.Println("Try Connecting to DB")
	//db.ping() for chechking whether connection is establised or not
	pingErr := db.Ping()

	if pingErr != nil {
		fmt.Printf("Error connecting to database: %v\n", pingErr)
		return nil, pingErr
	}

	fmt.Println("Successfully connected to database", cfg.DBName)

	return db, nil
}

//Task : try to make db queries
