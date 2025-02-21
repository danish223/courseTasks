const express = require("express");
const bookRoutes = require("./Routes/book");
const authRoutes = require("./Routes/auth");


const app = express();
app.use(express.json());
const PORT = 5000;

app.use("/api", bookRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
