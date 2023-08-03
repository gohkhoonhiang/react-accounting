import React from 'react';
import InfoCard from '../../components/InfoCard';

function ExpensesSummary() {
  const summary = {
    year: 2023,
    totalExpenses: 14482.71,
    totalVariableExpenses: 5835.66,
    totalRecurringExpenses: 8647.05,
    monthlyTotalExpenses: 2068.96,
    monthlyVariableExpenses: 833.67,
    monthlyRecurringExpenses: 1235.29
  };

  const heading = 'Expenses Summary';

  const fields = [
    {
      title: 'Year',
      value: summary.year
    },
    {
      title: 'Total Expenses',
      value: `$${summary.totalExpenses.toFixed(2)}`
    },
    {
      title: 'Total Variable Expenses',
      value: `$${summary.totalVariableExpenses.toFixed(2)}`
    },
    {
      title: 'Total Recurring Expenses',
      value: `$${summary.totalRecurringExpenses.toFixed(2)}`
    },
    {
      title: 'Avg. Monthly Total Expenses',
      value: `$${summary.monthlyTotalExpenses.toFixed(2)}`
    },
    {
      title: 'Avg. Monthly Variable Expenses',
      value: `$${summary.monthlyVariableExpenses.toFixed(2)}`
    },
    {
      title: 'Avg. Monthly Recurring Expenses',
      value: `$${summary.monthlyRecurringExpenses.toFixed(2)}`
    }
  ];

  return <InfoCard heading={heading} fields={fields}></InfoCard>;
}

export default ExpensesSummary;
