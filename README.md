# Watch List

This Project is made with ReactJs and it allows users to build a watch list from an database of movies.

## Demonstration Purposes Only

This application is meant to demonstrate my technical skill level and is not for profit or any commercial purposes. If you are cloning the repository and running locally then use npm install to fetch necessary dependancies. I recommend using the test account provided in the homepage when running this application. If you would like to test login authentication then create an account with a temporary or fake email address as I cannot ensure the security of firebase when handling your private emails.

## Api Credit

An external API is used in this project known as The Movie Database(TMDB) and all credit for movie data goes to TMDB.

## Notable Features
* Login Authentication
* Private Routing / Conditional rendering
* Organized display of fetched API data
* Database Storage related to user decisions using firebase firestore

## React 

The application is built using the Javascript framework, React. Hooks utilized in this application are useState, useEffect, useReducer, useContext, and useRef.

### useReducer
This hook is used in the src/components/MovieLists/Browse.js to handle the onClick function for category change while browsing movies. The dispatch function send the type of category based on the button pressed.

### useContext
useContext is used throughout our application to contain the authentication state. The context is created in src/components/authentication/authorization.js then the context is used in the many routes to contain the state of our current user as well as hold the authentication functions such as log in and log out.

### useState, useEffect, useRef
The above hooks are used frequently throughout the application. useRef is used to hold a refference to values such as user input emails and passwords. useState holds the user watchList fetched from the database, the loading state, and the error state just to name a few. useEffect is used to ensure that our API data is fetched from either firebase or TMDB and any changes to that data will run the useEffect function because of the dependancy array with the most notable example being src/components/MovieLists/Browse.js.

### Contributors

- Brenden T Johnson <BrendenJ7@hotmail.com>


