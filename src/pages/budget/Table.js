import React, { useState, useEffect } from 'react';
import { Card, Elevation, Checkbox, Button, ButtonGroup, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { Cell, Column, EditableCell2, Table2 } from '@blueprintjs/table';
import { filterItem, renderItem } from '../../utils/select.js';
import '../Page.css';
import './Budget.css';
import { useBudget, useBudgetDispatch, useBudgetSheet } from './Context.js';
import AddRowForm from './AddRow.js';
import AddBudgetForm from './AddBudget.js';
import DuplicateBudgetForm from './DuplicateBudget.js';

function BudgetTable() {
  const budgetSheet = useBudgetSheet();
  const budgets = useBudget();
  const dispatch = useBudgetDispatch();

  useEffect(() => {
    loadBudgetRows();
  }, [budgetSheet]);

  function loadBudgetRows() {
    const initialBudgets = [
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

    dispatch({ type: 'loaded', budgets: initialBudgets });
  }

  const allocatedAccounts = [
    { value: 'ocbc360_alice', label: 'OCBC 360 (Alice)' },
    { value: 'ocbc360_bob', label: 'OCBC 360 (Bob)' }
  ];

  function updateBudgetRow(value, rowIndex, field, formatFn) {
    dispatch({ type: 'update', budget: formatFn(value), rowIndex, field });
  }

  const categoryRenderer = (rowIndex) => <Cell>{budgets[rowIndex].category}</Cell>;
  const subCategoryRenderer = (rowIndex) => <Cell>{budgets[rowIndex].subCategory}</Cell>;
  const remarksRenderer = (rowIndex) => <Cell>{budgets[rowIndex].remarks}</Cell>;

  const budgetedAmountRenderer = (rowIndex, columnIndex) => {
    return (
      <EditableCell2
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        value={budgets[rowIndex].budgetedAmount}
        onConfirm={handleBudgetedAmountConfirm}
      ></EditableCell2>
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
        value={budgets[rowIndex].actualAmount}
        onConfirm={handleActualAmountConfirm}
      ></EditableCell2>
    );
  };

  const handleActualAmountConfirm = (value, rowIndex) => {
    updateBudgetRow(value, rowIndex, 'actualAmount', (v) => parseFloat(v));
  };

  const allocatedRenderer = (rowIndex, columnIndex) => (
    <Cell interactive={true} rowIndex={rowIndex} columnIndex={columnIndex}>
      <Checkbox
        checked={budgets[rowIndex].allocated}
        onChange={(e) => handleAllocatedChange(e, rowIndex)}
      />
    </Cell>
  );

  const handleAllocatedChange = (e, rowIndex) => {
    const value = !budgets[rowIndex].allocated;
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
          onItemSelect={(v) => handleAllocatedAccountChange(v, rowIndex)}
        >
          <Button
            text={allocatedAccountDisplay(budgets[rowIndex].allocatedAccount)}
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

  function allocatedAccountDisplay(value) {
    if (value === null) {
      return 'Select account...';
    }
    const account = allocatedAccounts.find((account) => {
      return account.value === value;
    });
    return account.label;
  }

  const submitDisabled = false;

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ budgets });
  }

  const [addRowDialog, setAddRowDialog] = useState(false);
  function openAddRowDialog(e) {
    e.preventDefault();
    setAddRowDialog(true);
  }

  const [addBudgetDialog, setAddBudgetDialog] = useState(false);
  function openAddBudgetDialog(e) {
    e.preventDefault();
    setAddBudgetDialog(true);
  }

  const [duplicateBudgetDialog, setDuplicateBudgetDialog] = useState(false);
  function openDuplicateBudgetDialog(e) {
    e.preventDefault();
    setDuplicateBudgetDialog(true);
  }

  return (
    <Card className="Page-form Budget-table" elevation={Elevation.TWO}>
      <h3>Budgets</h3>
      <ButtonGroup minimal={true} onMouseEnter={() => {}}>
        <Button icon="add" onClick={openAddBudgetDialog}>
          New Budget Sheet
        </Button>
        <Button icon="duplicate" onClick={openDuplicateBudgetDialog}>
          Duplicate Budget Sheet
        </Button>
      </ButtonGroup>
      <div className="input-container">
        <Table2
          numRows={budgets.length}
          cellRendererDependencies={[budgets]}
          defaultRowHeight={50}
          columnWidths={[null, null, null, null, null, null, 250]}
        >
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
        <Button onClick={openAddRowDialog}>Add Row</Button>
      </div>

      <AddBudgetForm dialog={addBudgetDialog} setDialog={setAddBudgetDialog}></AddBudgetForm>
      <DuplicateBudgetForm
        dialog={duplicateBudgetDialog}
        setDialog={setDuplicateBudgetDialog}
      ></DuplicateBudgetForm>
      <AddRowForm dialog={addRowDialog} setDialog={setAddRowDialog}></AddRowForm>
    </Card>
  );
}

export default BudgetTable;
