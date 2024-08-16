

- for font used fornt sans 
- npm i color (for better show configuration on terminal)

# Technologies Used

* React.js
* Node.js
* Express.js
* MongoDB
* JSON Web Tokens (JWT) for authentication
* WebSocket 

# API Endpoints
## Authentication

### Sign Up: 
- POST /signup: Sign up a user

### Login
 - POST /login: Login a user

### Get all users
  - GET '/' : Get all users

## Chat Endpoints

### One-on-One Chat
- **POST** `/`
  - **Description**: Initiate a one-on-one chat session.
  - **Middleware**: Requires JWT authentication.

### Fetch Chats
- **GET** `/`
  - **Description**: Retrieve a list of chat sessions for the authenticated user.
  - **Middleware**: Requires JWT authentication.

### Create Group Chat
- **POST** `/group`
  - **Description**: Create a new group chat.
  - **Middleware**: Requires JWT authentication.

### Rename Group
- **PUT** `/rename`
  - **Description**: Rename an existing group chat.
  - **Middleware**: Requires JWT authentication.

### Remove from Group
- **PUT** `/groupremove`
  - **Description**: Remove a user from a group chat.
  - **Middleware**: Requires JWT authentication.

### Add to Group
- **PUT** `/groupadd`
  - **Description**: Add a user to a group chat.
  - **Middleware**: Requires JWT authentication.

