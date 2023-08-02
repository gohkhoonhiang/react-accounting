import React from 'react';
import { useBudgetSheet } from './Context';
import InfoCard from '../../components/InfoCard';

function BudgetSheet() {
  const budgetSheet = useBudgetSheet();

  const heading = 'Budget Sheet';

  const fields = [
    {
      title: 'Start Date',
      value: budgetSheet?.startDate || 'NA'
    },
    {
      title: 'End Date',
      value: budgetSheet?.endDate || 'NA'
    },
    {
      title: 'Total Budgeted',
      value: budgetSheet?.totalBudgeted?.toFixed(2) || '0.00'
    },
    {
      title: 'Actual Allocated',
      value: budgetSheet?.actualAllocated?.toFixed(2) || '0.00'
    },
    {
      title: 'Balance to Allocate',
      value: budgetSheet?.balancetoAllocate?.toFixed(2) || '0.00'
    }
  ];

  return <InfoCard heading={heading} fields={fields}></InfoCard>;
}

export default BudgetSheet;
