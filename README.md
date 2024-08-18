# Chat App

A real-time messaging platform enabling seamless one-on-one and group chat functionality. Features include secure user authentication, dynamic chat creation and management, and comprehensive message handling. Built with a focus on performance and user experience, utilizing WebSocket for real-time communication and JWT for secure access.

## Features

### User Management
- **Sign Up**: Register a new user.
- **Login**: Authenticate a user and provide access credentials.
- **Get All Users**: Retrieve a list of all users. *(Requires JWT authentication)*

### Chat Functionality
- **One-on-One Chat**: Initiate a one-on-one chat session. *(Requires JWT authentication)*
- **Fetch Chats**: Retrieve a list of chat sessions for the authenticated user. *(Requires JWT authentication)*
- **Create Group Chat**: Create a new group chat. *(Requires JWT authentication)*
- **Rename Group**: Rename an existing group chat. *(Requires JWT authentication)*
- **Remove from Group**: Remove a user from a group chat. *(Requires JWT authentication)*
- **Add to Group**: Add a user to a group chat. *(Requires JWT authentication)*

### Messaging
- **Send Message**: Send a message to a specific chat. *(Requires JWT authentication)*
- **Get All Messages**: Retrieve all messages from a specific chat, identified by `chatId`. *(Requires JWT authentication)*

## Technologies Used

- React.js
- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) for authentication
- WebSocket 

## API Endpoints

### Authentication

#### Sign Up
- **POST** `/signup`
  - **Description**: Register a new user.

#### Login
- **POST** `/login`
  - **Description**: Login a user.

#### Get All Users
- **GET** `/`
  - **Description**: Retrieve a list of all users.
  - **Middleware**: Requires JWT authentication.

### Chat Endpoints

#### One-on-One Chat
- **POST** `/`
  - **Description**: Initiate a one-on-one chat session.
  - **Middleware**: Requires JWT authentication.

#### Fetch Chats
- **GET** `/`
  - **Description**: Retrieve a list of chat sessions for the authenticated user.
  - **Middleware**: Requires JWT authentication.

#### Create Group Chat
- **POST** `/group`
  - **Description**: Create a new group chat.
  - **Middleware**: Requires JWT authentication.

#### Rename Group
- **PUT** `/rename`
  - **Description**: Rename an existing group chat.
  - **Middleware**: Requires JWT authentication.

#### Remove from Group
- **PUT** `/groupremove`
  - **Description**: Remove a user from a group chat.
  - **Middleware**: Requires JWT authentication.

#### Add to Group
- **PUT** `/groupadd`
  - **Description**: Add a user to a group chat.
  - **Middleware**: Requires JWT authentication.

### Messaging Endpoints

#### Send Message
- **POST** `/`
  - **Description**: Send a message to the specified chat.
  - **Middleware**: Requires JWT authentication.

#### Get All Messages
- **GET** `/:chatId`
  - **Description**: Retrieve all messages from a specific chat, identified by `chatId`.
  - **Middleware**: Requires JWT authentication.

 #### SCREENSHOT
 ![Login1](https://github.com/user-attachments/assets/4edfa330-6f5d-4006-9768-98af390cd791)

![signup1](https://github.com/user-attachments/assets/2cf9116d-7c8a-486f-b886-ef3f559623c1)

![home12](https://github.com/user-attachments/assets/c8f1d329-2a30-42f9-9e5f-f3dbb064e8fa)

![group1](https://github.com/user-attachments/assets/904910b8-caa1-44b8-98ed-ed8da67cecd9)

