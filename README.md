# Duckr #

Twitter like application built with ReactJS + Redux

<!-- MarkdownTOC bracket="round" autoanchor="flase" -->

- [Features](#user-content-features)
- [Dependencies](#user-content-dependencies)
- [Getting Started](#user-content-getting-started)
	- [Locally](#user-content-locally)
	- [Build Project](#user-content-build-project)

<!-- /MarkdownTOC -->

[Live version can be found here.](https://duckr-wb.firebaseapp.com/)

## Features ##

- Hot module replacement
- CSS modules
- ESLint
- Webpack configuration for production
- Use of ES6 features
- Immutability with immutable.js
- Firebase Backend
- Authentication
- Realtime Updates
- Error Handling
- High Order Components

## Dependencies ##
- firebase (_^4.8.0_)
- history (_^4.7.2_)
- immutable (_^3.8.2_)
- react (_^16.1.1_)
- react-dom (_^16.1.1_)
- react-icons (_^2.2.7_)
- react-immutable-proptypes (_^2.1.0_)
- react-modal (_^2.2.2_)
- react-redux (_^5.0.6_)
- react-router-dom (_^4.2.2_)
- react-router-redux (_^5.0.0-alpha.9_)
- redux (_^3.7.2_)
- redux-thunk (_^2.2.0_)

## Getting Started ##
### Locally ###
1. Clone this repository
2. In terminal, switch current working directory to repository
3. Make sure you have NPM installed. Simply install [NodeJs](https://nodejs.org/en/download/)
4. Install packages needed for project by typing in terminal ``` npm i ```
5. To view project locally start dev server by typing in terminal ``` npm run start ```

### Build Project ###
1. After following instructions for setting up the project locally, to build for production, in your terminal type ``` npm run production ```
2. (Optional) If you wish to host the project online, you can use Firebase (firebase-tools can automate this for you.)
	1. Create a [Firebase Account](https://firebase.google.com/) 
	2. Create a Firebase project on your [Firebase console](https://console.firebase.google.com/)
	3. Initialize Firebase project from terminal by typing ``` npm run firebase-init ```
	4. When step iii. runs you will be asked a series of questions
	5. First question, select **Hosting**
	6. Second question, select the project name you created in step ii.
	7. Third question, type **dist** as your public directory to use (the production code)
	8. Forth question, type **Y** for firebase to configure project as a single page application
	9. Fifth questions, type **N** to not overwrite dist/index.html
	10. Firebase should now be initialized, to deploy project to Firebase, in your terminal type ``` npm run firebase-deploy ```
