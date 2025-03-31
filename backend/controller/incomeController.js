const User = require('../models/User');
const Income = require('../models/Income');
const xlsx = require('xlsx');
// Add Income Source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body;

        if (!source || !amount || !date) {
            {
                return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
            }
        }
            const newIncome = new Income({
                userId,
                icon,
                source,
                amount,
                date
            });

            await newIncome.save();
            res.status(201).json(newIncome);

        } catch (err) {
        res.status(500).json({ message: 'Lỗi thêm nguồn thu', error: err.message })
    };
};


    // get all income source
    exports.getIncomes = async (req, res) => {
        const userId = req.user.id;
        try {
            const income = await Income.find({ userId }).sort({ date: -1 });
            res.status(200).json(income);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi lấy nguồn thu', error: err.message });
        }
    }


    // delete income
    exports.deleteIncome = async (req, res) => {
        try {
            await Income.findByIdAndDelete(req.params.id);
            res.json({ message: 'Xóa nguồn thu thành công' });
            
        } catch (err) {
            res.status(500).json({message: 'Lỗi xóa nguồn thu', error: err.message});
        }
    }

    // download income excel

    exports.downloadIncomeExcel = async (req, res) => {
        const userId = req.user.id;

        try {
            const income = await Income.find({userId}).sort({date: -1});

            //Prepare data for Excel
            const data= income.map((item) => (
                {
                    'Ngày': item.date,
                    'Nguồn thu': item.source,
                    'Số tiền': item.amount,
                }
            ));

            const wb = xlsx.utils.book_new();
            const ws = xlsx.utils.json_to_sheet(data);
            xlsx.utils.book_append_sheet(wb, ws, 'Income');
            xlsx.writeFile(wb, 'income_details.xlsx');
            res.download('income_details.xlsx');
        } catch (error) {
            res.status(500).json({message: 'Lỗi xuất Excel', error: error.message});
        }
    }

