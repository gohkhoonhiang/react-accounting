import React from 'react';
import BudgetFilter from './Filter';
import BudgetTable from './Table';
import '../Page.css';
import './Budget.css';
import { BudgetProvider } from './Context';

function Budget() {
  return (
    <div className="Page Budget-page">
      <h2>Budget</h2>
      <BudgetProvider>
        <BudgetFilter></BudgetFilter>
        <BudgetTable></BudgetTable>
      </BudgetProvider>
    </div>
  );
}

export default Budget;
