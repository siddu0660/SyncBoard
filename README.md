# SyncBoard

SyncBoard is a platform for managing objectives, collaborating in groups, and playing games when bored. 
The app is created using React Vite App.The technologies and libraries used are :
* React JS
* Tailwind CSS
* MongoDB
* Express JS
* Firebase
* Framer-Motion
* Lottie 
* Redux JS ( State Management)

## Features

SyncBoard contains some cool features to amplify performance :
### Whiteboard
* Whiteboard allows users to change the pen, erase, and highlight with different colors.
* Additionally, the canvas can be downloaded as a transparent png.
* The canvas operates on the notion of storing elements as stacks, providing an additional option of undo and redo.

### Objectives
* Individuals can add and delete to-dos and objectives.
* Each task includes a title, description, and deadline.
* The Analytics section displays the amount of completed and pending tasks.
* A calendar is useful to keep track of tasks and relax on weekdays!!

### Games
* The facility of games is added to ensure flexibility in work.
* This section contains Tic-Tac-Toe , Snake and Sudoku games.

## Usage

To use the project on local system , the steps to follow are 

#### Clone the directory and move to the cloned directory 
``` bash
git clone https://github.com/siddu0660/SyncBoard
cd SyncBoard
```
#### Download node modules for client side appilication
``` bash
cd client
npm install
```
#### Download node modules for server side appilication
``` bash
cd backend
npm install
```
#### Use .env for both client and backend sections which should be in format of
* Client side env includes firebase configuration and backend api url 
  ``` env
  VITE_API_KEY=
  VITE_AUTH_DOMAIN=
  VITE_DATABASE_URL=
  VITE_PROJECT_ID=
  VITE_STORAGE_BUCKET=
  VITE_MESSAGING_SENDER_ID=
  VITE_APP_ID=
  VITE_MEASUREMENT_ID=
  VITE_API_URL=
  ```
* Backend side env include api port and mongodb connection string
  ``` env
  API_PORT=
  MONGODB_URI=
  ```

#### Run commands 
* Client side React app
``` bash
cd client
npm run dev
```

* Server side app
``` bash
cd backend
node server.js
```
 
