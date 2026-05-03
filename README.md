AI CODE REVIEW

AI-powered code snippet manager with authentication, CRUD operations, and secure user-based access control using JWT.

⚠️ This project uses an external API (DeepSeek).
You must generate your own API key and configure it in the .env file.

🚀 FEATURES
🔐 JWT Authentication
👤 Register and login
🛡️ Protected routes
✍️ Create snippets
📄 View your own snippets
✏️ Edit snippets
❌ Delete snippets
🔒 User access control

🛠️ TECHNOLOGIES

- Node.js
- Express
- MongoDb + Mongoose
- EJS
- JWT(jsonwebtoken)
- dotenv

⚙️ Installation

git clone <!--your-repository-->
cd project-name
npm install

CREATE .env FILE

DEEPSEEK_API_KEY=your_deepseek_api_key
JWT_SECRET=supersecretkey
PORT=3000
MONGO_URI=tu_mongo_uri

Running

npm start

STATUS

Under development (improvements are being made to the user interface and validation)

💼 Author

Project developed as part of backend learning.
