const express = require("express");
const indexRoute = require("./routes/indexRoute");
const itemRoute = require("./routes/itemRoute");
const categoryRoute = require("./routes/categoryRoute");
const path = require("node:path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", indexRoute);
app.use("/api/items", itemRoute);
app.use("/api/category", categoryRoute);

// important for production (so we don't need to use localhost):
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  // route catch (not needed in development because vite handles it):
  app.get("/{*splat}", (req, res) => {
    // serve index.html file:
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });
}

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on ${PORT}`);
});