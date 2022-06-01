## 1. Run project
To make sure that there are no errors that relate to NodeJS version happens on local machine, I created a docker-compose.yaml file which contains a both web and mongodb components. So, just type that command "docker-compose up -d" at the root folder to start these components.

* Note: Please make sure that docker has already been installed on your local machine.

## 2. GraphQL API Endpoints:

* Note: After started project, you can use GraphQL tool to run the following APIs by accesing to this link: http://localhost:3000/graphql (Local link).

——— USER ———

#### Create User:

```
mutation {
  createUser(createUserInput: { 
    fullName: "steven", 
    phone: "0334567891",
    gender: "male",
    age: 22
  })
  {
    _id
    fullName
    phone
    age
    gender
    totalAmount
  }
}
```

#### Update User Information:

```
mutation {
   updateUser(updateUserInput: {
    _id: "<user id>",
    fullName: "steven", 
    phone: "0334567891",
    gender: "male",
    age: 22
  })
  {
    _id
    fullName
    phone
    age
    gender
    totalAmount
  }
}
```

#### Get User Detail:

```
query {
   user(id: "<user id>") {
    _id
    fullName
    phone
    age
    gender
    totalAmount
  }
}
```

——— ORDER ———

#### Create Order:

```
mutation {
  createOrder(createOrderInput: {
    user: "<user id>", 
    amount: 500,
    interestRate: 1
  })
  {
    _id
    user
    code
    amount
    interestRate
    accruedAmount
  }
}
```

#### Get User's orders

```
query {
   orders(user: "<user id>") {
    _id
    user
    code
    amount
    interestRate
    accruedAmount
  }
}
```

#### Get Order Detail:

```
query {
  order(id: "<order id>") {
    _id
    user
    code
    amount
    interestRate
    accruedAmount
  }
}
```

## DB SCHEMA

```
users ( 
  _id ObjectId (Primary Key)
  fullName String
  phone String
  age Number
  gender String (Enum: ["male", "female", "other"])
); 

orders ( 
    _id ObjectId (Primary Key)
    user ObjectId (FK)
    code String
    amount Number
    interestRate Number
)
```
