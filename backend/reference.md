ts-node server.ts (database and server in one file)


1. Set up your project: You've already created your refSchedule directory with frontend and backend subdirectories.

2. Backend setup: Navigate to the backend directory. Initialize a new Node.js project by running npm init -y (or npm init for manual setup). Install Express.js and GraphQL libraries by running npm install express express-graphql graphql.

3. GraphQL schema: Create a new file for your GraphQL schema. Define types for Referee, Game, and Location, and define queries for fetching data.

4. GraphQL resolvers: Create a new file for your resolvers. Implement functions for handling your GraphQL queries.

5. Express.js server: Create a new file for your server. Set up an Express.js server and use the express-graphql middleware to connect your GraphQL schema and resolvers.

6. Test your API: Install the Postman extension in Visual Studio Code. Use it to send requests to your GraphQL API and check the responses.

7. Frontend setup: Navigate to the frontend directory. Create a new React.js application by running npx create-react-app .. Install the Apollo Client library by running npm install @apollo/client.

8. 9. React components: Create React components for displaying referees, games, and locations. Use Apollo Client to fetch data from your GraphQL API.

10. Authentication: Back in your backend directory, install Passport.js by running npm install passport. Implement authentication in your Express.js server.

11. Connect frontend and backend: In your React application, use Apollo Client to send authenticated requests to your GraphQL API.



Thank you for providing the context. Here's a summary of your project:

You're working on a basketball game scheduling application. The application is responsible for scheduling referees for basketball games. The scheduling is based on several factors:

Proximity to the location: The application considers the distance between the referee's location and the game location. The maxTravelDistance property in the User model likely represents the maximum distance a referee is willing to travel for a game.

Skill level: The application also considers the referee's skill level when scheduling games. The proficiency property in the User model likely represents this.

Availability: The application checks the referee's availability to ensure they are free to referee the game. The availability property in the User model likely represents this.

The application is built with TypeScript and uses Mongoose for MongoDB object modeling. The User.ts file you've shared defines a User model, which represents a referee in the application. The model includes properties for the referee's first name, last name, email, address, profile picture, maximum travel distance, proficiency level, availability, and the games they are assigned to.

In future sessions, you can refer to this summary to provide context about your project.


Think of your application as a LEGO city.

1. The server.ts file is like the baseplate of your LEGO city. It's the foundation that everything else is built on. In this file, you're setting up the connection to your MongoDB database, which is like laying the groundwork for your city. Without this baseplate, you wouldn't be able to build anything else.

2. The MongoDB database is like the storage box where all your LEGO bricks are kept. It's where all the data for your application is stored, and you can add, remove, or change bricks (data) as needed.

3. The mongoose.connect() function in the server.ts file is like opening the storage box. It establishes a connection to the MongoDB database, allowing you to access the bricks inside.

4. The graphqlServer.ts file is like the buildings and structures you build on your baseplate. This file defines your GraphQL API, which is like the layout of your city. It specifies what types of data (bricks) you can query and mutate (use), and how to fetch or change this data.

5. The Apollo Server created in the graphqlServer.ts file is like the city's town hall. It's the central hub that handles all GraphQL requests (instructions for what to build) and returns responses (the built structures).

6. The resolvers in the graphqlServer.ts file are like the construction workers in your city. They carry out the instructions specified in the GraphQL requests. For example, the createUser resolver is like a construction worker who's been instructed to build a new house (user). It creates a new User model (house blueprint), then calls user.save() to save the new user (build the house) in the MongoDB database (storage box).

7. The server.listen() function in the graphqlServer.ts file is like opening the city gates. It starts the Apollo Server, allowing it to start accepting GraphQL requests (building instructions).

So, when you run your application, the server.ts file is run first to establish a connection to the MongoDB database (open the storage box). Then, the graphqlServer.ts file is run to start the Apollo Server (open the city gates) and begin accepting GraphQL requests (building instructions).

TSC has a `watch` component that will automatically transcribe files from .ts to .js.
Pretty fancy but maybe only for personal projects.
Not good for a group project most likely.


Get last test working.
Figure out what it does and how it manipulates Mongoose.
Basically, instead of connecting to an actual database, it's going to pretend to connect to a database and pretend that it works just fine. So we're importing 'jest' and jest is then going to call the function 'mock' on the real mongoose with a fake version of mongoose. That way we can just pretend that everything is working and that it's able to connect. Here is the code below that shows where it's mocking mongoose.

This is the test that we're trying to fix: deleteUser.test.ts
When trying to understand what it does:
// Mock the mongoose functions used in deleteUser
jest.mock('mongoose', () => ({
  // Mock the connect function
  connect: jest.fn(),
  // Mock the connection object with a close function
  connection: {
	close: jest.fn(),
  },
}));

By mocking the Mongoose connection, we are basically testing our code without connecting to a database, which could bring in additional problems. If we are able to successfully pass our tests, we know that our code works and if we do have errors when connecting to the database on a live server, we know that the issue is not within the code for that particular function (eg deleteUser). So, before connecting to a database, we know that our code works in isolation and that we are testing only what our code is supposed to do (deleteUser) whereas if we connected to a database and tested our code on a live server and had errors, we wouldn't be able to know if it was our deleteUser function causing problems, the database giving us problems, or establishing to the database giving us problems. It helps isolate the problems before going into production, which I like.


Just trying to catch myself up to speed. I closed all my terminal tabs so I don't become too reliant on those and I can navigate my own project again after too much time away.
I was able to breakdown the Postman content request. I need to always do a POST request with GraphQL. I also need to make sure I add the values: key `Content-Type` value: `application/json` regardless. And if I do the request as a GraphQL, I just send the Query as:
{
  allUsers {
    id
    firstName
    lastName
    phoneNumber
  }
}
This just tells the server that it is going to be responsible for handling the incoming HTTP request, parsing the request body, and interacting with the database. If you wrote a server to accept incoming data and then try multiple different parsing methods to determine what kind of data it's receiving and then do stuff with it, it would be too resource intensive. That's why we write programs to receive a specific type of data and we make sure that we label the content-type so that the server knows what it's receiving.


I commented back in the full user field to see why I originally commented out the users fields of address. Something made me comment it out and I don't recall. I also just found out that you can save Postman requests... I'll start doing that to make it easy on me and my memory.



GraphQL Overview
Imagine you have a restaurant menu. The menu lists different types of dishes (like appetizers, main courses, and desserts) and the ingredients in each dish. GraphQL is like a waiter who takes your order based on this menu. You can ask for exactly what you want, and the waiter (GraphQL) will bring it to you.

Key Concepts
Schema: Think of this as the menu. It defines what dishes (data) are available and what ingredients (fields) each dish has.

Types: These are the categories on the menu. For example, you might have a "User" type, which is like a category for a dish that includes fields like name, email, and address.

Queries: These are like asking the waiter for specific dishes. For example, you might ask for a list of all users or a specific user by their ID.

Mutations: These are like placing an order to add, change, or remove a dish from the menu. For example, you might want to add a new user, update an existing user's information, or delete a user.

Resolvers: These are the kitchen staff who prepare the dishes. They take the order (query or mutation) and fetch or modify the data accordingly.



Mongoose Overview
Mongoose is like the recipe book and pantry for a restaurant. It defines how dishes (data) should be prepared and stored.

Models: These are the recipes. They define what ingredients (fields) a dish (document) should have and how it should be prepared (stored in the database).

Schemas: These are the detailed instructions in the recipe. They specify the exact structure and rules for each dish.

Example
Let's say you have a restaurant that serves users (people) and locations (places).

Schema: The menu lists "User" and "Location" as available dishes.

Types:

A "User" type might include fields like first name, last name, phone number, email, address, and availability.
An "Address" type might include fields like street, city, state, and zip code.
Queries:

You can ask for a list of all users (allUsers).
You can ask for a specific user by their ID (userById).
Mutations:

You can add a new user (createUser).
You can update an existing user's information (updateUser).
You can delete a user (deleteUser).
Resolvers:

When you ask for all users, the resolver goes to the database, fetches the list of users, and returns it to you.
When you add a new user, the resolver takes the provided information, creates a new user in the database, and returns the newly created user.
Putting It All Together
When you interact with the GraphQL server, it's like placing an order at a restaurant. You specify exactly what you want (queries and mutations), and the server (waiter) uses the schema (menu) to understand your request. The resolvers (kitchen staff) then prepare the data according to the models and schemas (recipes) and return it to you.

This way, you get exactly the data you need, no more, no less, just like getting the perfect dish at a restaurant.


As a refresher, here is an overview of the tech stack. Ideally, I'll revisit this enough that I won't need such a lengthy refresher sessions, but just in case, here it is.
What is tripping me up is there are multiple definitions of each thing. Like we have `user.ts` where we define a user and we also have `type User` definted in our graphqlServer.ts. Here is the restaurant analogy to try to sort between the two:


GraphQL Schema (Menu):

-Purpose: Defines what data clients can request and how they can interact with it.
-Analogy: Think of it as the menu in a restaurant. It tells customers what pizzas are available, what sizes they come in, what toppings they can choose, and the price.
-Example: The menu lists a "Margherita Pizza" with options for size (small, medium, large) and toppings (basil, mozzarella, tomatoes).

Mongoose Model (Recipe Book):

-Purpose: Defines how data is stored, validated, and retrieved from the database.
-Analogy: Think of it as the recipe book in the kitchen. It provides detailed instructions on how to make each pizza, including the ingredients, measurements, and steps.
-Example: The recipe book has a detailed recipe for "Margherita Pizza" that includes the exact amount of basil, mozzarella, and tomatoes needed for each size.

Combining the Concepts
While it might seem like you could combine these definitions, they serve different roles and are used in different parts of the application. Here's a more detailed explanation:

GraphQL Schema (Menu)
-Defines the structure of the data for the API.
-Ensures clients know what data they can request and what fields are required.

Example:
A pizza has a name, size, toppings, and price.
Clients can query for a pizza and get these details.

Mongoose Model (Recipe Book)
-Defines how the data is stored and validated in the database.
-Ensures data integrity and consistency.

Example:
A pizza document in the database must have a name, size, toppings, and price.
The toppings must be stored as an array of objects with specific fields.


Summary
GraphQL Schema (Menu): Defines the structure of the data for the API, ensuring clients know what data they can request.
Mongoose Model (Recipe Book): Defines how the data is stored and validated in the database, ensuring data integrity and consistency.
Both are necessary because they serve different purposes: one for defining the API and the other for managing the data storage and validation. This separation of concerns helps maintain a clean and organized codebase.


This problem of this test is winning. I can't get it to work. I am able to create, view all, and delete users by just running the files. I am able to create, view all, and delete users in Postman. It's just the test to confirm the deleteing of a user that is throwing a TypeError in the original user.ts file but that doesn't make sense to me because I am able to invoke those functions with no errors.

I added a mutation to deleteUser since that seems like a major oversight. I also cleaned up a lot of dead code that has been commented out for months it seems. Now that I can delete, create, and view in postman and through the terminal, but test still does not work and I think I'm going to call it here for the day. I'll continue to lose to the test tomorrow.


----Schemas VS Models VS Interfaces----
The document is a built-in Mongoose object. It has methods such as `.save()` and `.remove()` already built it. So when I am creating a new user, I inherit the properties and methods of the document. And then I add additional properties on top of those such as `firstName` and `lastName`. Then, when I create a user, I can call `.save()` and my user will be saved to the database. `This is for typescript only` and if I were to actually called `.save()`, it would still work and be created successfully because I imported mongoose and called `mongoose.model` which has the `.save()` method built in as well.
The point of the interface is to inherit from Document, but what is inherited (eg `.save()`) will be included later. This just defines the shape of the user data and provides type checking at compile-time in Typescript.
The schema defines the structure of the data and gives the requirements for the data to be valid.
The interface will check the data at compile-time.
Finally, the model is an interface to interact with MongoDB.
This allows CRUD and we use this to create a new user instance and save it to the database.
The model will check the data using the rules given by the schema and they will be checked at runtime.

- **Interface**: Defines the TypeScript fields and provides type checking at compile-time.
- **Schema**: Specifies the rules and structure for the fields.
- **Model**: Creates instances and ensures the fields adhere to the schema at runtime.
- **Instance**: Represents an object that can be saved as a document in the database.
