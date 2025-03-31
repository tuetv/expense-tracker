const xlsx = require('xlsx');
const Expense = require('../models/Expense');


// add expense
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;
        // vadidation: check for missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({ message: 'Thông tin cần nhập đủ' });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi thêm chi phí', error: err.message });
    }
}

exports.getExpenses = async (req, res) => {

    const userId = req.user.id;
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        res.status(200).json(expenses);

    } catch (err) {
        res.status(500).json({ message: 'Lỗi lấy chi phí', error: err.message });
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: 'Xóa chi phí thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi xóa chi phí', error: err.message });
    }
}

exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });

        // prepare data for excel
        const data = expenses.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Expense');
        xlsx.writeFile(wb, 'expense.xlsx');
        res.download('expense.xlsx');
    } catch (err) {
        res.status(500).json({ message: 'Lỗi tải file excel', error: err.message });
    }
}