### my-card-app
#### Task Goals
- Develop the post button feature that you developed in Task 5.1P using Firebase and save all posts and articles in a Fire store. 

-	Add one more component to the post page in which a user can upload their image for their article and save it via Firebase. 
-	Find Question page (appears on home page navigation bar) includes a list of questions as cards that will show the title, description, tag and date of questions. 
-	A user will see question details to answer the question or check solutions. The page has the following features: 
- The user can filter out questions based on date, tag, or question title. 
- The user can delete tasks that they do not want to see, and the question list will be updated accordingly. 
- When a user adds a new question, the question will be added to the list of questions. 
- When a user clicks on the selected question card, it will be expanded to show more details. 
- (Optional) A user can reorder the list. You could use React Draggable npm package to implement this feature. 


# FireBase Log in / Sign Up
-	Login & Registration Page for DEV@Deakin we application 
-	Login page allows a user to login to their existing account or redirect to the sign-up page to create a new account.
-	The application maintains a Firestore database to record all information of users, posts etc. 

### Initiate project
```
export NODE_OPTIONS=--openssl-legacy-provider 
npm start
```

<div align="center">
  <table>
    <tr>
      <td><img src="https://github.com/leakydishes/frontend_apps/blob/main/tasks/task_8/my-card-app/screenshots/screenshot_1.png" alt="Screenshot 1" width="350" height="auto"></td>
      <td><img src="https://github.com/leakydishes/frontend_apps/blob/main/tasks/task_8/my-card-app/screenshots/screenshot_2.png" alt="Screenshot 2" width="350" height="auto"></td>
      <td><img src="https://github.com/leakydishes/frontend_apps/blob/main/tasks/task_8/my-card-app/screenshots/screenshot_3.png" alt="Screenshot 3" width="350" height="auto"></td>
    </tr>
    <tr>
      <td><img src="https://github.com/leakydishes/frontend_apps/blob/main/tasks/task_8/my-card-app/screenshots/screenshot_4.png" alt="Screenshot 4" width="350" height="auto"></td>
      <td><img src="https://github.com/leakydishes/frontend_apps/blob/main/tasks/task_8/my-card-app/screenshots/screenshot_5.png" alt="Screenshot 5" width="350" height="auto"></td>
      <td><img src="https://github.com/leakydishes/frontend_apps/blob/main/tasks/task_8/my-card-app/screenshots/screenshot_6.png" alt="Screenshot 6" width="350" height="auto"></td>
    </tr>
  </table>
</div>

### Setup
1. Clone the repository:

```sh
git clone https://github.com/leakydishes/frontend_apps/tasks/task_8/my-card-app.git
cd iservice-app
```

2. Install dependencies:

```sh
npm install
npm install react-router-dom
npm install react-icons
```

3. Create .env file in the root directory

### Scripts
```sh
npm run build
```
Builds the app for production to the build folder.

```sh
npm start
```
this runs the server and React app concurrently!
Dev mode (front end) http://localhost:3000 
Dev mode (backend) http://localhost:8081


```sh
export NODE_OPTIONS=--openssl-legacy-provider`
```
OpenSSL and Node.js versions 16+ need this function

```sh
npx create-react-app my-card-app`
```
Creates react app called 'my-app'

