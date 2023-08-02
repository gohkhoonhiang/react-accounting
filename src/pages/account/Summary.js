import React from 'react';
import InfoCard from '../../components/InfoCard';

function AccountsSummary() {
  const summary = {
    totalAccountBalance: 100000,
    totalAssetBalance: 20000,
    yearlyIncome: 30000,
    yearlyYield: 3,
    monthlyIncome: 2500
  };

  const heading = 'Accounts Summary';

  const fields = [
    {
      title: 'Total Account Balance',
      value: `$${summary.totalAccountBalance.toFixed(2)}`
    },
    {
      title: 'Total Asset Balance',
      value: `$${summary.totalAssetBalance.toFixed(2)}`
    },
    {
      title: 'Approx. Yearly Income',
      value: `$${summary.yearlyIncome.toFixed(2)}`
    },
    {
      title: 'Avg. Yearly Yield',
      value: `${summary.yearlyIncome.toFixed(2)}%`
    },
    {
      title: 'Approx. Monthly Income',
      value: `$${summary.monthlyIncome.toFixed(2)}`
    }
  ];

  return <InfoCard heading={heading} fields={fields}></InfoCard>;
}

export default AccountsSummary;
