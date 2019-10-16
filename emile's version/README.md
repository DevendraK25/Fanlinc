To run the program:
- in backend folder, do "$ sudo service mongodb start", then "$ npm run dev"
- in frontend folder, do "$ ng serve --o"

Testing in postman:
- POST /users/add
- GET /users (this is to get all users present in db)
- GET /users/{username}/{password} 
- POST /users/update/{username}
- DEL /users/delete/{username}

{} means replace by actual value

base URL: "http://localhost:8080/"

JSON body e.g:

{

	"username": string,
	"firstname": string,
	"lastname": string,
	"email": string,
	"password": string

}