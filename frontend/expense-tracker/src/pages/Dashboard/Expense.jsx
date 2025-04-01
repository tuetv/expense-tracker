import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal from '../../components/layouts/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // Get all Expense Details
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`

      );

      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error)
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;


    //Validation checks
    if (!category.trim()) {
      toast.error("Yêu cầu phải có loại chi tiêu");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) < 0) {
      toast.error("Tiền phải là một số dương");
      return;
    }


    if (!date) {
      toast.error("Yêu cầu phải có ngày");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Thêm chi tiêu thành công. huhu");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Lỗi thêm chi tiêu. hihi",
        error.response?.data?.messge || error.messge)
    }
  };

   // Delete Expense
   const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))

      setOpenDeleteAlert({show: false, data: null})
      toast.success("Xoá thành công nguồn thu. Huhu");
      fetchExpenseDetails();
    } catch (error) {
        console.error("Lỗi xoá thu nhập.Này khó nha bro", 
          error.response?.data?.messge || error.messge
        );
    }
  };

  // Handle download income details
  const handleDownloadIncomeDetails = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
          {
            responseType: "blob",
          }
        );

        // create a URL for the blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute("download", "expense_details.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Lỗi tải file excel', error);
        toast.error("Tải file Excel bị lỗi hùhù. Chúc may mắn lần sau.");
      }
  }

  useEffect(() => {
    fetchExpenseDetails();
    return () => {

    };
  }, [])
  return (
    <DashboardLayout activeMenu='Expense'>
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({show: true, data: id});
            }}
            onDownload={handleDownloadIncomeDetails}
          />

        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Thêm chi tiêu"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Xoá chi tiêu"
        >
          <DeleteAlert
            content="Bạn có chắc là muốn xoá không?"
            onDelete={() =>deleteExpense(openDeleteAlert.data)}
          />
        </Modal>



      </div>
    </DashboardLayout>
  )
}

export default Expense
