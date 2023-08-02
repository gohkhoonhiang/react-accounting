import React, { useState } from 'react';
import { Card, Elevation, Button, Dialog, DialogBody, DialogFooter } from '@blueprintjs/core';
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
          amount: 829.29,
          transactions: [
            {
              description: 'Kopitiam',
              transactionDate: '2023-01-12',
              amount: 7.23
            }
          ]
        },
        {
          name: 'Vacation fund',
          amount: 1725.41,
          transactions: []
        },
        {
          name: 'Health fund',
          amount: 1934.72,
          transactions: []
        },
        {
          name: 'Savings',
          amount: 15912.92,
          transactions: []
        }
      ],
      transactions: [
        {
          description: 'Payment to google.com',
          transactionDate: '2023-01-23',
          amount: -21.42
        },
        {
          description: 'Interest credited',
          transactionDate: '2023-01-31',
          amount: 112.73
        }
      ]
    },
    {
      name: 'OCBC 360 (Bob)',
      amount: 24937.71,
      buckets: [
        {
          name: 'PC fund',
          amount: 923.62,
          transactions: []
        },
        {
          name: 'Games fund',
          amount: 236.23,
          transactions: []
        },
        {
          name: 'Savings',
          amount: 23777.86,
          transactions: []
        }
      ],
      transactions: [
        {
          description: 'Payment to grab.com',
          transactionDate: '2023-01-16',
          amount: 27.24
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
      click: (e, row) => {
        e.preventDefault();
        setBucketTransactions(row.transactions);
        setBucketTransactionsDialogTitle(`${row.name} - Transactions`);
        setBucketTransactionsDialog(true);
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
      click: (e, row) => {
        e.preventDefault();
        setAccountTransactions(row.transactions);
        setAccountTransactionsDialogTitle(`${row.name} - Transactions`);
        setAccountTransactionsDialog(true);
      }
    }
  ];

  const transactionHeaders = [
    {
      key: 'description',
      label: 'Description'
    },
    {
      key: 'transactionDate',
      label: 'Transaction Date'
    },
    {
      key: 'amount',
      label: 'Amount'
    }
  ];

  const [accountTransactionsDialog, setAccountTransactionsDialog] = useState(false);
  const [accountTransactionsDialogTitle, setAccountTransactionsDialogTitle] =
    useState('Account Transactions');
  const [accountTransactions, setAccountTransactions] = useState([]);

  function closeAccountTransactionsDialog(e) {
    e.preventDefault();
    setAccountTransactionsDialog(false);
  }

  const [bucketTransactionsDialog, setBucketTransactionsDialog] = useState(false);
  const [bucketTransactionsDialogTitle, setBucketTransactionsDialogTitle] =
    useState('Bucket Transactions');
  const [bucketTransactions, setBucketTransactions] = useState([]);

  function closeBucketTransactionsDialog(e) {
    e.preventDefault();
    setBucketTransactionsDialog(false);
  }

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

      <Dialog
        className="Account-transactions-dialog"
        title={accountTransactionsDialogTitle}
        icon="list"
        isOpen={accountTransactionsDialog}
        onClose={closeAccountTransactionsDialog}>
        <DialogBody>
          <SimpleTable
            headers={transactionHeaders}
            rows={accountTransactions}
            rowActions={[]}></SimpleTable>
        </DialogBody>
        <DialogFooter actions={<Button text="Close" onClick={closeAccountTransactionsDialog} />} />
      </Dialog>

      <Dialog
        className="Bucket-transactions-dialog"
        title={bucketTransactionsDialogTitle}
        icon="list"
        isOpen={bucketTransactionsDialog}
        onClose={closeBucketTransactionsDialog}>
        <DialogBody>
          <SimpleTable
            headers={transactionHeaders}
            rows={bucketTransactions}
            rowActions={[]}></SimpleTable>
        </DialogBody>
        <DialogFooter actions={<Button text="Close" onClick={closeBucketTransactionsDialog} />} />
      </Dialog>
    </Card>
  );
}

export default AccountsTable;
