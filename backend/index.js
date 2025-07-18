import express from "express";
const app = express();

const port = 5000;

app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "This is test route!",
  });
});
app.listen(port, () => {
     console.log(`Server running on ${port}`);
});