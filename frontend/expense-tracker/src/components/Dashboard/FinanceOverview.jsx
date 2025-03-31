import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';
const COLOR = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
    const balanceData = [
        { name: "Số dư", amount: totalBalance },
        { name: "Tổng chi tiêu", amount: totalExpense },
        { name: "Tổng thu nhập", amount: totalIncome },
    ]
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className="text-lg">Tổng quan về tài chính</h5>
            </div>

            <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={`$${totalBalance}`}
                color={COLOR}
                showTextAnchor
            />
        </div>
    )
}

export default FinanceOverview
