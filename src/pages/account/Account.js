import React from 'react';
import AccountsSummary from './Summary';
import AccountsTable from './Table';

function Account() {
  return (
    <div className="Page">
      <h2>Accounts</h2>
      <AccountsSummary></AccountsSummary>
      <AccountsTable></AccountsTable>
    </div>
  );
}

export default Account;
