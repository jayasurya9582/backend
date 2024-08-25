const express = require("express");
const app = express();

app.use(express.json());

// GET Method
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST Method
app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;

    // Input validation
    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input: 'data' should be an array."
      });
    }

    const numbers = [];
    const alphabets = [];
    let highest_lowercase_alphabet = "";

    // Process the data array
    for (const item of data) {
      if (!isNaN(item)) {
        numbers.push(item);
      } else if (item.length === 1 && isNaN(item)) {
        alphabets.push(item);
        if (item === item.toLowerCase() && item >= highest_lowercase_alphabet) {
          highest_lowercase_alphabet = item;
        }
      }
    }

    res.json({
      is_success: true,
      user_id: "Jaya_Surya", // Example user ID
      email: "jayasurya.21bce9582@vitapstudent.ac.in", // Example email
      roll_number: "21BCE9582", // Example roll number
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highest_lowercase_alphabet ? [highest_lowercase_alphabet] : [],
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "An error occurred while processing your request."
    });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
