import React from 'react';
import ExpensesSummary from './Summary';
import VariableExpensesTable from './VariableTable';
import RecurringExpensesTable from './RecurringTable';

function Expense() {
  return (
    <div className="Page">
      <h2>Expenses</h2>
      <ExpensesSummary></ExpensesSummary>
      <VariableExpensesTable></VariableExpensesTable>
      <RecurringExpensesTable></RecurringExpensesTable>
    </div>
  );
}

export default Expense;
