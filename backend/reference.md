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
