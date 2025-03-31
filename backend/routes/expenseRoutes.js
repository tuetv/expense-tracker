const express = require("express");

const {
    addExpense,
    getExpenses,
    deleteExpense,
    downloadExpenseExcel
} = require("../controller/expenseController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getExpenses);
router.get("/downloadexcel", protect, downloadExpenseExcel);
router.delete("/:id", protect, deleteExpense);

module.exports = router;