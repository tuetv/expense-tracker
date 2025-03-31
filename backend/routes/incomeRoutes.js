const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
    addIncome,
    getIncomes,
    deleteIncome,
    downloadIncomeExcel
} = require("../controller/incomeController");


const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getIncomes);
router.delete("/:id", protect, deleteIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel);

module.exports = router;