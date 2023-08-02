import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import SimpleTable from '../../components/SimpleTable';
import CollapseTable from '../../components/CollapseTable';
import './Account.css';

function AccountsTable() {
  const accounts = [
    {
      name: 'OCBC 360 (Alice)',
      amount: 20402.34,
      buckets: [
        {
          name: 'Daily expenses',
          amount: 829.29
        },
        {
          name: 'Vacation fund',
          amount: 1725.41
        },
        {
          name: 'Health fund',
          amount: 1934.72
        },
        {
          name: 'Savings',
          amount: 15912.92
        }
      ]
    },
    {
      name: 'OCBC 360 (Bob)',
      amount: 24937.71,
      buckets: [
        {
          name: 'PC fund',
          amount: 923.62
        },
        {
          name: 'Games fund',
          amount: 236.23
        },
        {
          name: 'Savings',
          amount: 23777.86
        }
      ]
    }
  ];

  const headers = [
    {
      key: 'name',
      label: 'Name'
    },
    {
      key: 'amount',
      label: 'Amount'
    }
  ];

  const expandedField = 'buckets';

  const bucketActions = [
    {
      icon: 'eye-open',
      click: (e, row, index) => {
        e.preventDefault();
        alert(`Opened bucket row ${index}: ${row.name}`);
      }
    }
  ];

  const rows = accounts.map((account) => {
    return {
      ...account,
      buckets: (
        <SimpleTable
          headers={headers}
          rows={account.buckets}
          rowActions={bucketActions}></SimpleTable>
      )
    };
  });

  const rowActions = [
    {
      icon: 'eye-open',
      click: (e, row, index) => {
        e.preventDefault();
        alert(`Opened account row ${index}: ${row.name}`);
      }
    }
  ];

  return (
    <Card className="Page-form Accounts-table" elevation={Elevation.TWO}>
      <h3>Accounts</h3>
      <div className="input-container">
        <CollapseTable
          headers={headers}
          rows={rows}
          rowActions={rowActions}
          expandedField={expandedField}></CollapseTable>
      </div>
    </Card>
  );
}

export default AccountsTable;
