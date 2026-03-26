import mongoose from 'mongoose';

const expensesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },       
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  category: { type: String }
});

export default mongoose.model('Expenses', expensesSchema);