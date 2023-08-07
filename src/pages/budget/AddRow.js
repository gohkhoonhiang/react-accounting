import React, { useState, useRef } from 'react';
import {
  Button,
  FormGroup,
  InputGroup,
  NumericInput,
  MenuItem,
  Dialog,
  DialogBody,
  DialogFooter
} from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { filterItem, renderItem } from '../../utils/select.js';
import '../Page.css';
import './Budget.css';
import { useBudgetDispatch } from './Context.js';

function AddRowForm({ dialog, setDialog }) {
  const dispatch = useBudgetDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: 'add', budget });
    setDialog(false);
  }

  function handleClose(e) {
    e.preventDefault();
    setDialog(false);
  }

  const categories = [
    { value: 'transport', label: 'Transport' },
    { value: 'groceries', label: 'Groceries' },
    { value: 'entertainment', label: 'Entertainment' }
  ];
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [remarks, setRemarks] = useState('');

  const [budgetedAmount, setBudgetedAmount] = useState('');
  const budgetedAmountRef = useRef(null);

  const budget = {
    category: category?.value,
    subCategory: subCategory?.value,
    remarks,
    budgetedAmount,
    actualAmount: null,
    allocated: false,
    allocatedAccount: null
  };

  return (
    <Dialog title="Add Budget Row" icon="add" isOpen={dialog} onClose={handleClose}>
      <DialogBody className="Budget-row-form">
        <FormGroup label="Category" labelFor="category" labelInfo="(required)">
          <Select
            id="category"
            items={categories}
            itemPredicate={filterItem}
            itemRenderer={renderItem}
            noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
            onItemSelect={setCategory}>
            <Button
              text={category ? category.label : 'Select category...'}
              rightIcon="double-caret-vertical"
              placeholder="Select category"
            />
          </Select>
        </FormGroup>
        <FormGroup label="Sub-category" labelFor="sub-category" labelInfo="(required)">
          <Select
            id="sub-category"
            items={categories}
            itemPredicate={filterItem}
            itemRenderer={renderItem}
            noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
            onItemSelect={setSubCategory}>
            <Button
              text={subCategory ? subCategory.label : 'Select sub-category...'}
              rightIcon="double-caret-vertical"
              placeholder="Select sub-category"
            />
          </Select>
        </FormGroup>
        <FormGroup label="Remarks" labelFor="remarks" labelInfo="(required)">
          <InputGroup
            id="remarks"
            placeholder="Remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Budgeted Amount" labelFor="budgeted-amount" labelInfo="(required)">
          <NumericInput
            ref={budgetedAmountRef}
            id="budgeted-ammount"
            placeholder="Budgeted amount"
            allowNumericCharactersOnly={true}
            stepSize={0.01}
            minorStepSize={0.01}
            majorStepSize={1}
            onValueChange={(v) => setBudgetedAmount(v)}
          />
        </FormGroup>
      </DialogBody>
      <DialogFooter
        className="Budget-row-form-footer"
        actions={
          <div className="actions">
            <Button intent="primary" text="Submit" onClick={handleSubmit} />{' '}
            <Button text="Close" onClick={handleClose} />
          </div>
        }
      />
    </Dialog>
  );
}

export default AddRowForm;
