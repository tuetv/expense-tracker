import React, { useState } from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddExpenseForm = ({ onAddExpense }) => {
  const [income, setIncome] = useState({
    category: '',
    amount: '',
    date: '',
    icon: '',
  });

  const hanldeChange = (key, value) => setIncome({ ...income, [key]: value });
  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => hanldeChange('icon', selectedIcon)}
      />

      <Input
        value={income.category}
        onChange={({ target }) => hanldeChange('category', target.value)}
        label="Category"
        placeholder="Tiền mẹ cho này, tiền ba cho này, tiền bà cho này ..."
        type='text'
      />

      <Input
        value={income.amount}
        onChange={({ target }) => hanldeChange('amount', target.value)}
        label="Amount"
        placeholder
        type='number'
      />

      <Input
        value={income.date}
        onChange={({ target }) => hanldeChange('date', target.value)}
        label="Date"
        placeholder
        type='date'
      />

      <div className='flex justify-end mt-6'>
        <button
          type='button'
          className='add-btn add-btn-fill'
          onClick={() => onAddExpense(income)}
        >
          Add Expense
        </button>
      </div>


    </div>
  )
}

export default AddExpenseForm
