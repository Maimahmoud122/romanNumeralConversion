# 🏛️ Roman Numeral Converter API & Web UI

This project is a simple full-stack application that converts **Roman numerals** to **decimal numbers**, stores conversions in a MongoDB database, and displays them in a user-friendly HTML interface. You can also **view**, **update**, and **delete** conversions.

---

## 🚀 Features

- Convert Roman numerals to decimal
- Validate input and log errors
- Store each conversion in MongoDB
- Retrieve all conversions
- Get a single conversion by ID
- Update a conversion
- Delete a conversion
- Simple HTML + CSS frontend interface

---

## 🛠️ Tech Stack

| Layer       | Technology           |
|-------------|----------------------|
| Backend     | Node.js, Express     |
| Database    | MongoDB (via Mongoose) |
| Frontend    | HTML, CSS, JavaScript |
| Tools       | Postman, MongoSH     |

---

## 📁 Folder Structure

```
project-root/
├── client/                  # Frontend files
│   ├── index.html           # Main UI page
│   ├── style.css
│   └── script.js
├── roman_converter/
│   ├── controllers/         # API controller logic
│   │   └── converterController.js
│   ├── services/            # Business logic
│   │   └── servicesController.js
│   ├── models/              # Mongoose schema
│   │   └── Conversions.js
│   ├── middleware/          # Validation middleware
│   │   └── validateRoman.js
│   └── converter/           # Roman-to-decimal logic
│       └── toDecimal.js
├── index.js                 # Entry point & routes
├── package.json
└── README.md
```

## 📦 Installation & Setup

```bash
# 1. Clone the repo
git clone https://github.com/Maimahmoud122/romanNumeralConversion.git
cd roman-numeral-converter

# 2. Install dependencies
npm install

# 3. Start MongoDB locally (MongoDB must be installed)
# Example: mongod

# 4. Run the server
npm run dev

# 5. Open the UI
Open client/index.html in your browser


🔌 API Endpoints
POST /to-decimal
Convert Roman numeral to decimal and store it.

json
Copy
Edit
{
  "roman": "XIV"
}

GET /conversions
Retrieve all conversions.

GET /conversions/:id
Get a single conversion by its ID.

PUT /conversions/:id
Update a Roman numeral conversion.

json
Copy
Edit
{
  "roman": "XIX"
}

DELETE /conversions/:id
Delete a conversion by its ID.

🌐 Web Interface
Convert a Roman numeral

See list of conversions

Edit or delete entries

Refresh the list

Open client/index.html in your browser.

📬 Sample Usage (Postman)
POST → http://localhost:8000/to-decimal
{ "roman": "XIV" }

PUT → http://localhost:8000/conversions/64a...
{ "roman": "XIX" }

DELETE → http://localhost:8000/conversions/64a...

🧠 Validation
All inputs are validated via middleware. Invalid Roman numerals or missing fields are rejected and logged.

👨‍💻 Author
Developed by [ Mai Mahmoud , Sherouk Yasser]
GitHub :https://github.com/Maimahmoud122
        https://github.com/SheroukYasser

