const express = require("express");
const indexRoute = require("./routes/indexRoute");
const path = require("node:path");

const app = express();

app.use("/api", indexRoute);

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
