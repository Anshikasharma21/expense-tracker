import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './models/User.js';
import Expense from './models/expenses.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello Anshika');
});

app.post('/api/create', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const fullName = req.body.fullName;

    if (!username || !password || !email || !fullName) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const userByEmail = await User.findOne({ email: email });
    if (userByEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const userByUsername = await User.findOne({ username: username });
    if (userByUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const user = new User({
      username: username,
      fullName: fullName,
      email: email,
      password: password
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(400).json({ message: 'Username not found' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post("/api/expenses", async (req, res) => {
  try {
    const email = req.body.email;
    const title = req.body.title;
    const amount = req.body.amount;
    const date = req.body.date;
    const description = req.body.description;
    const category = req.body.category;

    if (!email || !title || !amount || !date) {
      return res.status(400).json({
        message: "Please fill all required fields (email, title, amount, date)"
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const expense = new Expense(); 
    expense.userId = user._id;
    expense.title = title;
    expense.amount = amount;
    expense.date = date;
    expense.description = description;
    expense.category = category;

    await expense.save();

    res.status(201).json({
      message: "expenses added successfully"
    });

  } catch (error) {
    console.log("expenses ERROR:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
});


app.get("/api/expenses/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const expenseList = await Expense.find({ 
      userId: user._id
    });

    res.status(200).json({
      expenses: expenseList
    });

  } catch (error) {
    console.log("GET expenses ERROR:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
});


app.put("/api/expenses/:id", async (req, res) => {
  try {
    const expenseId = req.params.id; 


    const updateData = {
      title: req.body.title,
      amount: req.body.amount,
      date: req.body.date,
      description: req.body.description,
      category: req.body.category, 
    };

  
    const updatedExpense = await Expense.findByIdAndUpdate(expenseId, updateData, { new: true });

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({
      message: "Expense updated successfully",
      expense: updatedExpense
    });

  } catch (error) {
    console.error("UPDATE expenses ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});
app.get("/api/all-expenses", async (req, res) => {
  try {
    const expenseList = await Expense.find({}, {
      title: 1,
      amount: 1,
      date: 1,
      _id: 0 
    });

    res.status(200).json({
      expenses: expenseList
    });

  } catch (error) {
    console.log("GET ALL expenses ERROR:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});