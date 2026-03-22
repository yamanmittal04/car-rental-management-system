============================================
  CAR RENTAL PROJECT - HOW TO RUN
============================================

REQUIREMENTS (install these first):
  - Node.js from https://nodejs.org  (download LTS version)
  - MongoDB from https://www.mongodb.com/try/download/community

--------------------------------------------
STEP 1 - Start MongoDB
--------------------------------------------
Open Command Prompt and run:
  mongod

Leave this window open. Open a NEW Command Prompt for next steps.

--------------------------------------------
STEP 2 - Start the Server (Backend)
--------------------------------------------
Open Command Prompt, go into the server folder:
  cd server
  npm install
  npm run dev

You should see:
  Server running on port 5000
  MongoDB Connected: 127.0.0.1

Leave this window open. Open ANOTHER new Command Prompt.

--------------------------------------------
STEP 3 - Start the Client (Frontend)
--------------------------------------------
Open Command Prompt, go into the client folder:
  cd client
  npm install
  npm start

Your browser will open at http://localhost:3000

--------------------------------------------
STEP 4 - Create Admin Account
--------------------------------------------
1. Register normally on the website
2. Open Command Prompt and run:
     mongosh
     use car_rental_db
     db.users.updateOne({ email: "your@email.com" }, { $set: { role: "admin" } })
     exit
3. Log out and log back in - you will go to Admin Panel

--------------------------------------------
SUMMARY: You need 3 windows open at once
--------------------------------------------
  Window 1: mongod          (MongoDB)
  Window 2: npm run dev     (Server - port 5000)
  Window 3: npm start       (Client - port 3000)

============================================
