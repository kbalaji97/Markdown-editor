const express = require("express");
const cors = require("cors");
const {marked} = require("marked");

const app = express();
app.use(cors());
app.use(express.json());

// Markdown conversion endpoint
app.post("/convert", (req, res) => {
    const { markdown } = req.body;
    const html = marked(markdown || ""); // Convert Markdown to HTML
    res.json({ html });
});

app.listen(5000, () => console.log("Server running on port 5000"));
