# Email App API

This API allows users to send email.

## Endpoints

## BaseUrl = ['https://email-app-server.vercel.app/api/v1']

## Documentation = ["https://email-app-server.vercel.app/api-docs/"]

### Register user

Url: BaseUrl/:register

Method: `POST`

BODY : `{
  "first_name": "string",
  "last_name": "string"
  "email":"string",
  "password":"string"
} `

This endpoing Registers New User.

### Get User Received Messages

This Route gets all the users received messages.

Url: BaseUrl/get-user-messages

Method: `GET`

### Read Message

Url: BaseUrl/read-mail

Method: `PUT`

BODY : `{
  "mailId": "string"
} `
