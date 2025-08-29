const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper: alternating caps from reverse string
function alternatingCapsReverse(str) {
  let rev = str.split("").reverse().join("");
  return rev
    .split("")
    .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
}

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];

    let oddNumbers = [];
    let evenNumbers = [];
    let alphabets = [];
    let specialChars = [];
    let sum = 0;
    let alphaConcat = "";

    data.forEach((item) => {
      if (/^-?\d+$/.test(item)) {
        // Numeric string
        let num = parseInt(item, 10);
        if (num % 2 === 0) {
          evenNumbers.push(item);
        } else {
          oddNumbers.push(item);
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        // Alphabets
        alphabets.push(item.toUpperCase());
        alphaConcat += item;
      } else {
        // Special chars
        specialChars.push(item);
      }
    });

    let response = {
      is_success: true,
      user_id: "bharath_a_09112002",
      email: "bharathmurari.503@gmail.com",
      roll_number: "22BCE1393",
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialChars,
      sum: sum.toString(),
      concat_string: alternatingCapsReverse(alphaConcat),
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      is_success: false,
      message: "Internal Server Error",
    });
  }
});

// Simple health check
app.get("/", (req, res) => {
  res.send("BFHL API is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
