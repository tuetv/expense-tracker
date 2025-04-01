import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareIncomeBarChartData } from '../../utils/helper'


const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        console.log("Income transactions: ", transactions);
        const result = prepareIncomeBarChartData(transactions);
        console.log("Chart data: ", result);
        setChartData(result);

        return () => { };
    }, [transactions]);
    return (
        <div className='card'>
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className='text-lg'>Tổng quan thu nhập</h5>
                    <p className='text-xs text-gray-400 mt-0.5'>Theo dõi thu nhập của bạn theo thời gian và phân tích xu hướng thu nhập</p>
                </div>

                <button className='add-btn' onClick={onAddIncome}>
                    <LuPlus className='text-lg' />
                    Add Income
                </button>
            </div>

            <div className="mt-10">
                <CustomBarChart data={chartData} />
            </div>

        </div>
    )
}

export default IncomeOverview

