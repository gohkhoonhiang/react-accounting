import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import { useBudgetSheet } from './Context';

function BudgetSheet() {
  const budgetSheet = useBudgetSheet();

  return (
    <Card className="Page-form Budget-sheet" elevation={Elevation.TWO}>
      <h3>Budget Sheet</h3>
      <div className="Field-set">
        <div className="title">Start Date</div>
        <div className="value">{budgetSheet?.startDate || 'NA'}</div>
      </div>
      <div className="Field-set">
        <div className="title">End Date</div>
        <div className="value">{budgetSheet?.endDate || 'NA'}</div>
      </div>
      <div className="Field-set">
        <div className="title">Total Budgeted</div>
        <div className="value">{budgetSheet?.totalBudgeted?.toFixed(2) || '0.00'}</div>
      </div>
      <div className="Field-set">
        <div className="title">Actual Allocated</div>
        <div className="value">{budgetSheet?.actualAllocated?.toFixed(2) || '0.00'}</div>
      </div>
      <div className="Field-set">
        <div className="title">Balance To Allocate</div>
        <div className="value">{budgetSheet?.balancetoAllocate?.toFixed(2) || '0.00'}</div>
      </div>
    </Card>
  );
}

export default BudgetSheet;
