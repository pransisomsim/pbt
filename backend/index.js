const express = require('express');
const app = express();

const userRoutes = require('./src/routes/userRoutes');
const accountRoutes = require('./src/routes/accountRoutes')
const transactionRoutes = require('./src/routes/transactionRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes')

app.use(express.json());
const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/user', userRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/categories', categoryRoutes);


app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Internal Server Error"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
