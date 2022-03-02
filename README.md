# An E-wallet backend
An wallet system RESTFUL api 

---

## Features

- User can Sign Up.
- User can Sign in.
- User can create wallet.
- Users can fund their wallet.
- Users can transfer funds to another user.
- Users can see all their transactions.
- Users can see all their fundings

---


---
## Backend
The api is hosted on [Heroku](https://uth-wallet.herokuapp.com/)

---
## Documentation
The api is documented with [Postman](https://documenter.getpostman.com/view/6265858/UVkjwyJB)


---
## Technologies Used
- Node.js
- Express.js
- Mongodb
- ESLint
- Mongoose
- Heroku
- Typescript




---
## API Information
The API is hosted on [https://uthdev-premier.herokuapp.com/](https://uthdev-premier.herokuapp.com/)

METHOD |  RESOURCE   |     DESCRIPTION                | ENDPOINTS
-------|-------------|--------------------------------|-----------
GET    | ----        | Home page                      |`/`
POST   | wallets     | Create a wallet                |`/wallets`
GET    | wallets     | Get wallet                     |`/wallets`
POST   | wallets     | fund wallet                    |`/wallets/fund-wallet`
GET    | wallets     | get wallet fundings            |`/wallets/fundings`
GET    | wallets     | get wallet transaction         |`/wallets/transactions`
POST   | wallets     | transfer funds to another      |`/wallets/transfer`


---
#### Clone

- Clone this repo to your local machine using `https://github.com/uthdev/e-wallet`


#### Setup

- Installing the project's dependencies:

> run the command below

```shell
$ npm install
```

> Then create a .env file in the root directory of the project

```shell
$ touch .env
```

> Then copy the content of the .env-example file in the root directory into .env file and fill in th required parameters

> To start the server, run the command below

```shell
$ npm start
```


---
## Author

Adeleke Gbolahan Uthman