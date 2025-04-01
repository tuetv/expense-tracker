import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import { prepareExpenseLineChartData } from '../../utils/helper';
import CustomLineChart from '../Charts/CustomLineChart';

const ExpenseOverview = ({transactions, onExpenseIncome}) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() =>
    {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);

        return () => {}
    }, [transactions]);
    
  return (
    <div className='card'>
      <div className="flex items-center justify-between">
        <div className=''>
            <h5 className='text-lg'>Tổng quan về chi phí</h5>
            <p className='text-xs text-gray-400 mt-0.5'>Theo dõi xu hướng chi tiêu của bạn theo thời gian và có được cái "nhìn sâu sắc" về cách dùng tiền của bạn</p>
        </div>

        <button className='add-btn' onClick={onExpenseIncome}>
            <LuPlus className='text-lg'/> Thêm chi tiêu

        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart
            data={chartData}
        />
      </div>
    </div>
  )
}

export default ExpenseOverview
