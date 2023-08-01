import React from 'react';
import BudgetFilter from './Filter';
import BudgetSheet from './BudgetSheet';
import BudgetTable from './Table';
import '../Page.css';
import './Budget.css';
import { BudgetProvider, BudgetSheetProvider } from './Context';

function Budget() {
  return (
    <div className="Page Budget-page">
      <h2>Budget</h2>
      <BudgetSheetProvider>
        <BudgetProvider>
          <BudgetFilter></BudgetFilter>
          <BudgetSheet></BudgetSheet>
          <BudgetTable></BudgetTable>
        </BudgetProvider>
      </BudgetSheetProvider>
    </div>
  );
}

export default Budget;
