import React, { useState } from 'react';
import { Card, Elevation, Button, Collapse } from '@blueprintjs/core';
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

  const [expandedRows, setExpandedRows] = useState({});

  function toggleRow(e, index) {
    e.preventDefault();

    setExpandedRows((prev) => {
      const updated = { ...prev };
      if (prev[index]) {
        delete updated[index];
      } else {
        updated[index] = true;
      }

      return updated;
    });
  }

  function rowExpanded(index) {
    return expandedRows[index];
  }

  return (
    <Card className="Page-form Accounts-table" elevation={Elevation.TWO}>
      <h3>Accounts</h3>
      <div className="input-container">
        <div className="table">
          <div className="row row-heading">
            <div className="col"></div>
            <div className="col">Name</div>
            <div className="col">Amount</div>
            <div className="col">Actions</div>
          </div>
          {accounts.map((account, i) => (
            <div key={i}>
              <div className="row">
                <div className="col">
                  {rowExpanded(i) ? (
                    <Button
                      small={true}
                      icon="chevron-up"
                      onClick={(e) => toggleRow(e, i)}></Button>
                  ) : (
                    <Button
                      small={true}
                      icon="chevron-down"
                      onClick={(e) => toggleRow(e, i)}></Button>
                  )}
                </div>
                <div className="col">{account.name}</div>
                <div className="col">{account.amount.toFixed(2)}</div>
                <div className="col">
                  <Button small={true} icon="eye-open"></Button>
                </div>
              </div>

              <div className="row row-full">
                <div className="col col-full">
                  <Collapse isOpen={rowExpanded(i)}>
                    <div className="table">
                      <div className="row row-heading">
                        <div className="col">Name</div>
                        <div className="col">Amount</div>
                        <div className="col">Actions</div>
                      </div>
                      {account.buckets.map((bucket, j) => (
                        <div className="row" key={j}>
                          <div className="col">{bucket.name}</div>
                          <div className="col">{bucket.amount.toFixed(2)}</div>
                          <div className="col">
                            <Button small={true} icon="eye-open"></Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Collapse>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default AccountsTable;
