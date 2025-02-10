<h1 align="center">Welcome to LibraryFriends 👋</h1>
<p>
</p>

LibraryFriends is an online community dedicated to connecting book lovers, promoting reading, and sharing knowledge. Catalogue your personal library, connect with your friends and exchange books! This project was developed over three weeks for the [WBS Coding School](https://www.wbscodingschool.com/) web development course as a showcase of our learnings. We are planning to refactor and add features so the site can be used by the public. 

### ✨ Demo

[libraryfriends.onrender.com](https://libraryfriends.onrender.com/)

*Please allow a few minutes for the initial loading time since we are using Render's free tier.* 

## Technologies Used

### Backend

<p>
  <img alt="JavaScript" src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
  <img alt="NodeJS" src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white" />
  <img alt="ExpressJS" src="https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB" />
  <img alt="MongoDB" src="https://img.shields.io/badge/-MongoDB-4DB33D?style=flat&logo=mongodb&logoColor=FFFFFF" />
  <img alt="JSON Web Token" src="https://img.shields.io/badge/JWT-black?style=plastic&logo=JSON%20web%20tokens" />
</p>

### Frontend
<p>
  <img alt="HTML5" src="https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" />
  <img alt="CSS3" src="https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" />
  <img alt="JavaScript" src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
  <img alt="React" src="https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff&style=flat" alt="Vite">
  <img alt="TailwindCSS" src="https://img.shields.io/badge/-TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/DaisyUI-1AD1A5?logo=daisyui&logoColor=fff&style=flat" alt="DaisyUI">
</p>

## Running the project locally

### Requirements

To run the project on your machine, you will need the following:

1. [Node.js](https://nodejs.org/en) with the [Node package managae (npm)](https://www.npmjs.com/package/npm)
2. access to a [MongoDB](https://www.mongodb.com/) database and its connection string
3. an API key for the [Google Books API](https://developers.google.com/books/docs/overview)

### Steps

1. Clone the repository to your machine.
2. Navigate to the `server` directory.
3. Create a `.env` file and set it up with the following variables:
   ```
   MONGO_URI= //your MongoDB connection string
   JWT_SECRET= //a secret string to generate a JSON Web Token (https://jwt.io/) for authentication
   CLIENT_URL= //the URL for the client (frontend), e.g. http://localhost:5173
   PORT= //the port you want the server to run on, e.g. 80000
   ```
4. Install all necessary dependencies by running `npm install` in your terminal.
5. Start the server with `npm run dev` for testing or `npm run start` in your terminal.
6. Navigate to the `client` directory.
7. Create a `.env` file and set it up with the following variables:
   ```
   VITE_APP_API_URL= //the URL of the server, e.g. http://localhost:8000
   VITE_APP_BOOKS_API_KEY= //your Google Books API key
   VITE_APP_BOOKS_API_URL=https://www.googleapis.com/books/v1/volumes? //don't change this URL
   ```
8. Install all necessary dependencies by running `npm install` in your terminal.
9. Start the client with `npm run dev` for testing or `npm run build` in your terminal.
10. Navigate to the client URL in your browser.



## Authors

👤 **Lisa Helbig, Parvin Rao Mageswararao and Ruth Meißner**


## Show your support

Give a ⭐️ if this project helped you!
