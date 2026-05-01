package db

import (
	"AuthInGo/models"
	"database/sql"
	"fmt"
)

type UserRepository interface {
	Create() (*models.User, error)
	GetUserById(_id string) (*models.User, error)
	GetAll() ([]models.User, error)
	DeleteById(_id int64) error
}

type UserRepositoryImpl struct {
	db *sql.DB
}

func NewUserRepository(_db *sql.DB) UserRepository {

	return &UserRepositoryImpl{
		db: _db,
	}
}

func (u *UserRepositoryImpl) Create() (*models.User, error) {
	// fmt.Println("Creating user in the repository layer")
	query := `INSERT INTO users (username ,email, password) VALUES (?, ?, ?)`
	result, err := u.db.Exec(query, "testuser", "test@test.com", "123456")

	if err != nil {
		fmt.Println("Error Inserting user", err)
		return nil, err
	}

	rowsAffected, rowErr := result.RowsAffected()

	if rowErr != nil {
		fmt.Println("Error getting rows afffected", rowErr)
		return nil, rowErr
	}

	if rowsAffected == 0 {
		fmt.Println("No rows affected, User Not created")
		return nil, nil
	}

	fmt.Println("User Created Successfully, rowsAffected:", rowsAffected)

	return nil, nil

}

func (u *UserRepositoryImpl) GetUserById(_id string) (*models.User, error) {

	fmt.Println("fetching user by id in the repository layer of id", _id)

	//Step 1 = Prepare the query
	query := "SELECT id , username, email, created_at , updated_at FROM users WHERE id = ?"

	//Step 2 = Execute the query
	row := u.db.QueryRow(query, _id)

	//Step 3 = Process the result
	user := &models.User{}
	err := row.Scan(&user.Id, &user.Username, &user.Email, &user.CreatedAt, &user.UpdatedAt)

	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("User not found")
		} else {
			fmt.Println("Error scanning row", err)
		}
		return nil, err
	}

	fmt.Println("User Fetched Successfully", user)
	return user, nil
}

func (u *UserRepositoryImpl) GetAll() ([]models.User, error) {

	query := "SELECT id , username, email, created_at , updated_at FROM users"

	rows, err := u.db.Query(query)

	if err != nil {
		fmt.Println("Error fetching users", err)
		return nil, err
	}

	users := []models.User{}

	for rows.Next() {
		user := &models.User{}
		if err := rows.Scan(&user.Id, &user.Username, &user.Email, &user.CreatedAt, &user.UpdatedAt); err != nil {
			fmt.Println("Error scanning row", err)
			return nil, err
		}
		users = append(users, *user)
		fmt.Println("User Fetched Successfully", user)
	}

	return users, nil
}

func (u *UserRepositoryImpl) DeleteById(_id int64) error {
	//TODO implement me
	return nil
}
