import React, { useState } from 'react';
import { Card, Elevation, Checkbox, Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { Cell, Column, EditableCell2, Table2 } from '@blueprintjs/table';
import { filterItem, renderItem } from '../../utils/select.js';
import '../Page.css';
import './Budget.css';

function BudgetTable() {
  const initialBudgetRows = [
    {
      category: 'utilities',
      subCategory: 'electricity',
      remarks: 'SP',
      budgetedAmount: 100,
      actualAmount: null,
      allocated: false,
      allocatedAccount: null
    },
    {
      category: 'utilities',
      subCategory: 'broadband',
      remarks: 'MyRepublic',
      budgetedAmount: 36.99,
      actualAmount: 36.99,
      allocated: true,
      allocatedAccount: 'ocbc360_alice'
    }
  ];

  const allocatedAccounts = [
    { value: 'ocbc360_alice', label: 'OCBC 360 (Alice)' },
    { value: 'ocbc360_bob', label: 'OCBC 360 (Bob)' }
  ];

  const [budgetRows, setBudgetRows] = useState(initialBudgetRows);

  function updateBudgetRow(value, rowIndex, field, formatFn) {
    setBudgetRows((prev) => {
      const updated = [...prev];
      updated[rowIndex][field] = formatFn(value);
      return updated;
    });
  }

  const categoryRenderer = (rowIndex) => <Cell>{budgetRows[rowIndex].category}</Cell>;
  const subCategoryRenderer = (rowIndex) => <Cell>{budgetRows[rowIndex].subCategory}</Cell>;
  const remarksRenderer = (rowIndex) => <Cell>{budgetRows[rowIndex].remarks}</Cell>;

  const budgetedAmountRenderer = (rowIndex, columnIndex) => {
    return (
      <EditableCell2
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        value={budgetRows[rowIndex].budgetedAmount}
        onConfirm={handleBudgetedAmountConfirm}></EditableCell2>
    );
  };

  const handleBudgetedAmountConfirm = (value, rowIndex) => {
    updateBudgetRow(value, rowIndex, 'budgetedAmount', (v) => parseFloat(v));
  };

  const actualAmountRenderer = (rowIndex, columnIndex) => {
    return (
      <EditableCell2
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        value={budgetRows[rowIndex].actualAmount}
        onConfirm={handleActualAmountConfirm}></EditableCell2>
    );
  };

  const handleActualAmountConfirm = (value, rowIndex) => {
    updateBudgetRow(value, rowIndex, 'actualAmount', (v) => parseFloat(v));
  };

  const allocatedRenderer = (rowIndex, columnIndex) => (
    <Cell interactive={true} rowIndex={rowIndex} columnIndex={columnIndex}>
      <Checkbox
        checked={budgetRows[rowIndex].allocated}
        onChange={(e) => handleAllocatedChange(e, rowIndex)}
      />
    </Cell>
  );

  const handleAllocatedChange = (e, rowIndex) => {
    const value = !budgetRows[rowIndex].allocated;
    updateBudgetRow(value, rowIndex, 'allocated', (v) => v);
  };

  const allocatedAccountRenderer = (rowIndex, columnIndex) => {
    return (
      <Cell interactive={true} rowIndex={rowIndex} columnIndex={columnIndex}>
        <Select
          id="allocated-account"
          items={allocatedAccounts}
          itemPredicate={filterItem}
          itemRenderer={renderItem}
          noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
          onItemSelect={(v) => handleAllocatedAccountChange(v, rowIndex)}>
          <Button
            text={budgetRows[rowIndex].allocatedAccount ?? 'Select bucket...'}
            rightIcon="double-caret-vertical"
            placeholder="Select allocated account"
          />
        </Select>
      </Cell>
    );
  };

  const handleAllocatedAccountChange = (value, rowIndex) => {
    updateBudgetRow(value, rowIndex, 'allocatedAccount', (v) => v.value);
  };

  const submitDisabled = false;

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ budgetRows });
  }

  return (
    <Card className="Page-form Budget-table" elevation={Elevation.TWO}>
      <h3>Budgets</h3>
      <div className="input-container">
        <Table2 numRows={budgetRows.length} cellRendererDependencies={[budgetRows]}>
          <Column name="Category" cellRenderer={categoryRenderer} />
          <Column name="Sub-category" cellRenderer={subCategoryRenderer} />
          <Column name="Remarks" cellRenderer={remarksRenderer} />
          <Column name="Budgeted Amount" cellRenderer={budgetedAmountRenderer} />
          <Column name="Actual Amount" cellRenderer={actualAmountRenderer} />
          <Column name="Allocated?" cellRenderer={allocatedRenderer} />
          <Column name="Allocated Account" cellRenderer={allocatedAccountRenderer} />
        </Table2>
      </div>
      <div className="buttons">
        <Button intent="primary" disabled={submitDisabled} onClick={handleSubmit}>
          Update
        </Button>
      </div>
    </Card>
  );
}

export default BudgetTable;
