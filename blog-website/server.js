require('dotenv').config(); // Ensure this is at the top of your server.js file
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes'); // Ensure the path is correct

const app = express();
const PORT = process.env.PORT || 8080;


app.use(cors({
  origin: '*', 
}));
app.use(express.json());


app.use('/api/posts', postRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
