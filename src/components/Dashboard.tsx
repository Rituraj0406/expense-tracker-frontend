import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { fetchTransactions } from '../features/transactions/transactionSlice'

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { transactions } = useAppSelector(state => state.transaction);

  useEffect(() => {
    dispatch(fetchTransactions({}));
  }, [dispatch]);

  return (
    <div>
      {transactions.map((t) => (
        <div key={t._id}>{t.category} - {t.amount}</div>
      ))}
    </div>
  )
}

export default Dashboard
