const express = require("express");
const app = express();
const usuarioRouter = require("./routes/usuario.router");

// Add middleware and other routes as needed

app.use("/usuarios", usuarioRouter);

// Handle other endpoints or invalid requests
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Handle errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
