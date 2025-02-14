const express = require("express");
const bookRoutes = require("./Routes/book");
const userRoutes = require("./Routes/user");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Book routes
app.use("/books", bookRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
