// /backend/server.js
const app = require("./app"); // Import the fully configured Express app

// Define the port (defaults to 5000)
const PORT = process.env.PORT || 5000;

// Tell the server to start listening for incoming requests
app.listen(PORT, () => {
  console.log(`🚀 Server is running and listening on port ${PORT}`);
});
