import React, { useState, useMemo } from 'react';
import { Card, Elevation, Button, Dialog, DialogBody, DialogFooter } from '@blueprintjs/core';
import SimpleTable from '../../components/SimpleTable';
import CollapseTable from '../../components/CollapseTable';
import './Account.css';

function AccountsTable() {
  const [accountTransactionsDialog, setAccountTransactionsDialog] = useState(false);
  const [accountTransactionsDialogTitle, setAccountTransactionsDialogTitle] =
    useState('Account Transactions');
  const [currentAccount, setCurrentAccount] = useState({});

  const [accountTransactionsPagination, setAccountTransactionsPagination] = useState({
    offset: 0,
    limit: 5,
    total: currentAccount?.transactions?.length || 0
  });

  const accountTransactions = useMemo(() => {
    if (Object.keys(currentAccount).length > 0) {
      const { offset, limit, total } = accountTransactionsPagination;
      const startIndex = offset;
      const endIndex = Math.min(startIndex + limit, total);
      return currentAccount.transactions.slice(startIndex, endIndex);
    } else {
      return [];
    }
  });

  const [bucketTransactionsDialog, setBucketTransactionsDialog] = useState(false);
  const [bucketTransactionsDialogTitle, setBucketTransactionsDialogTitle] =
    useState('Bucket Transactions');
  const [currentBucket, setCurrentBucket] = useState({});

  const [bucketTransactionsPagination, setBucketTransactionsPagination] = useState({
    offset: 0,
    limit: 5,
    total: currentBucket?.transactions?.length || 0
  });

  const bucketTransactions = useMemo(() => {
    if (Object.keys(currentBucket).length > 0) {
      const { offset, limit, total } = bucketTransactionsPagination;
      const startIndex = offset;
      const endIndex = Math.min(startIndex + limit, total);
      return currentBucket.transactions.slice(startIndex, endIndex);
    } else {
      return [];
    }
  });

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
              amount: -7.23
            },
            {
              description: 'Fairprice',
              transactionDate: '2023-01-16',
              amount: -23.73
            },
            {
              description: 'Giant',
              transactionDate: '2023-01-21',
              amount: -37.92
            },
            {
              description: 'Kopitiam',
              transactionDate: '2023-01-25',
              amount: -13.84
            },
            {
              description: 'Fairprice',
              transactionDate: '2023-01-25',
              amount: -28.45
            },
            {
              description: 'Koufu',
              transactionDate: '2023-01-26',
              amount: -13.73
            },
            {
              description: 'Fairprice',
              transactionDate: '2023-01-26',
              amount: -20.35
            }
          ]
        },
        {
          name: 'Vacation fund',
          amount: 1725.41,
          transactions: [
            {
              description: 'Booking.com',
              transactionDate: '2023-01-23',
              amount: -2396.23
            }
          ]
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
        setCurrentBucket(row);
        setBucketTransactionsDialogTitle(`${row.name} - Transactions`);
        setBucketTransactionsPagination({ offset: 0, limit: 5, total: row.transactions.length });
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
        setCurrentAccount(row);
        setAccountTransactionsDialogTitle(`${row.name} - Transactions`);
        setAccountTransactionsPagination({ offset: 0, limit: 5, total: row.transactions.length });
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

  const accountTransactionsPageLeft = (e) => {
    e.preventDefault();
    const currentOffset = accountTransactionsPagination.offset;
    const currentLimit = accountTransactionsPagination.limit;
    const newOffset = Math.max(currentOffset - currentLimit, 0);
    setAccountTransactionsPagination((prev) => {
      return { ...prev, offset: newOffset };
    });
  };

  const accountTransactionsPageRight = (e) => {
    e.preventDefault();
    const currentOffset = accountTransactionsPagination.offset;
    const currentLimit = accountTransactionsPagination.limit;
    const currentTotal = accountTransactionsPagination.total;
    const newOffset = Math.min(currentOffset + currentLimit, currentTotal);
    setAccountTransactionsPagination((prev) => {
      return { ...prev, offset: newOffset };
    });
  };

  const bucketTransactionsPageLeft = (e) => {
    e.preventDefault();
    const currentOffset = bucketTransactionsPagination.offset;
    const currentLimit = bucketTransactionsPagination.limit;
    const newOffset = Math.max(currentOffset - currentLimit, 0);
    setBucketTransactionsPagination((prev) => {
      return { ...prev, offset: newOffset };
    });
  };

  const bucketTransactionsPageRight = (e) => {
    e.preventDefault();
    const currentOffset = bucketTransactionsPagination.offset;
    const currentLimit = bucketTransactionsPagination.limit;
    const currentTotal = bucketTransactionsPagination.total;
    const newOffset = Math.min(currentOffset + currentLimit, currentTotal);
    setBucketTransactionsPagination((prev) => {
      return { ...prev, offset: newOffset };
    });
  };

  function closeAccountTransactionsDialog(e) {
    e.preventDefault();
    setAccountTransactionsDialog(false);
    setCurrentAccount({});
    setAccountTransactionsPagination({ offset: 0, limit: 5, total: 0 });
  }

  function closeBucketTransactionsDialog(e) {
    e.preventDefault();
    setBucketTransactionsDialog(false);
    setCurrentBucket({});
    setBucketTransactionsPagination({ offset: 0, limit: 5, total: 0 });
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
            rowActions={[]}
            pagination={accountTransactionsPagination}
            onPageLeft={accountTransactionsPageLeft}
            onPageRight={accountTransactionsPageRight}></SimpleTable>
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
            rowActions={[]}
            pagination={bucketTransactionsPagination}
            onPageLeft={bucketTransactionsPageLeft}
            onPageRight={bucketTransactionsPageRight}></SimpleTable>
        </DialogBody>
        <DialogFooter actions={<Button text="Close" onClick={closeBucketTransactionsDialog} />} />
      </Dialog>
    </Card>
  );
}

export default AccountsTable;
