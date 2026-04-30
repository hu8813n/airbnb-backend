package db

import (
	"AuthInGo/models"
	"database/sql"
	"fmt"
)

type UserRepository interface {
	Create() error
	GetUserById(_id string) error
}

type UserRepositoryImpl struct {
	db *sql.DB
}

func NewUserRepository(_db *sql.DB) UserRepository {

	return &UserRepositoryImpl{
		db: _db,
	}
}

func (u *UserRepositoryImpl) Create() error {
	// fmt.Println("Creating user in the repository layer")
	// query := `INSERT INTO users (username ,email, password) VALUES ("athoak", "ath.oak20@gmail.com", "hussien")`
	// err := u.db.QueryRow(query)

	// if err != nil {
	// 	fmt.Println("Error Executing Query", err)
	// }
	return nil

}

func (u *UserRepositoryImpl) GetUserById(_id string) error {

	fmt.Println("fetching user by id in the repository layer of id", _id)

	//Step 1 = Prepare the query
	query := "SELECT id , username, email, password , created_at , updated_at FROM users WHERE id = ?"

	//Step 2 = Execute the query
	row := u.db.QueryRow(query, _id)

	//Step 3 = Process the result
	user := &models.User{}
	err := row.Scan(&user.Id, &user.Username, &user.Email, &user.Password, &user.CreatedAt, &user.UpdatedAt)

	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("User not found")
		} else {
			fmt.Println("Error scanning row", err)
		}
		return err
	}

	fmt.Println("User Fetched Successfully", user)
	return nil
}
