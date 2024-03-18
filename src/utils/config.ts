require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const SECRET = process.env.SECRET;

export default { PORT, MONGODB_URL, SECRET };
