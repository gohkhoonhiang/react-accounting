import React from 'react';
import BudgetFilter from './Filter';
import BudgetTable from './Table';
import '../Page.css';
import './Budget.css';

function Budget() {
  return (
    <div className="Page Budget-page">
      <h2>Budget</h2>
      <BudgetFilter></BudgetFilter>
      <BudgetTable></BudgetTable>
    </div>
  );
}

export default Budget;
