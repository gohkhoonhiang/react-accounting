import React, { useState, useRef, useCallback } from 'react';
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  NumericInput,
  InputGroup,
  MenuItem
} from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { DateInput } from '@blueprintjs/datetime';
import { filterItem, renderItem } from '../../utils/select.js';
import './Transfer.css';

function TransferExpense() {
  const bucketsList = [
    { value: 'ocbc360_alice', label: 'OCBC 360 (Alice)' },
    { value: 'ocbc360_bob', label: 'OCBC 360 (Bob)' }
  ];
  const [fromBucket, setFromBucket] = useState(null);

  const paidByList = [
    { value: 'alice', label: 'Alice' },
    { value: 'bob', label: 'Bob' }
  ];
  const [paidBy, setPaidBy] = useState(null);

  const accountsList = [
    { value: 'alice_cash', label: 'Alice Cash Account' },
    { value: 'bob_cash', label: 'Bob Cash Account' }
  ];
  const [toAccount, setToAccount] = useState(null);

  const categories = [
    { value: 'transport', label: 'Transport' },
    { value: 'groceries', label: 'Groceries' },
    { value: 'entertainment', label: 'Entertainment' }
  ];
  const [category, setCategory] = useState(null);

  const [transferAmount, setTransferAmount] = useState('');
  const transferAmountRef = useRef(null);

  const [transferDate, setTransferDate] = useState(null);
  const handleChange = useCallback(setTransferDate, []);
  const formatDate = useCallback((date) => date.toLocaleDateString(), []);
  const parseDate = useCallback((str) => new Date(str), []);

  const [description, setDescription] = useState('');

  const submitDisabled =
    fromBucket === null ||
    paidBy === null ||
    toAccount === null ||
    category === null ||
    transferAmount === '' ||
    description === '';

  function handleSubmit(e) {
    e.preventDefault();

    console.log({
      fromBucket,
      paidBy,
      toAccount,
      category,
      transferAmount,
      transferDate,
      description
    });
  }

  function clearFields() {
    setFromBucket(null);
    setPaidBy(null);
    setToAccount(null);
    setCategory(null);
    setTransferAmount('');
    setTransferDate(null);
    setDescription('');
    transferAmountRef.current.state.value = '';
  }

  return (
    <Card className="Transfer-form" elevation={Elevation.TWO}>
      <h3>Expense from Cash Account</h3>
      <FormGroup label="From Bucket" labelFor="from-bucket" labelInfo="(required)">
        <Select
          id="from-bucket"
          items={bucketsList}
          itemPredicate={filterItem}
          itemRenderer={renderItem}
          noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
          onItemSelect={setFromBucket}
        >
          <Button
            text={fromBucket ? fromBucket.label : 'Select bucket...'}
            rightIcon="double-caret-vertical"
            placeholder="Select from bucket"
          />
        </Select>
      </FormGroup>
      <FormGroup label="Paid By" labelFor="paid-by" labelInfo="(required)">
        <Select
          id="paid-by"
          items={paidByList}
          itemPredicate={filterItem}
          itemRenderer={renderItem}
          noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
          onItemSelect={setPaidBy}
        >
          <Button
            text={paidBy ? paidBy.label : 'Select paid by...'}
            rightIcon="double-caret-vertical"
            placeholder="Select paid by"
          />
        </Select>
      </FormGroup>
      <FormGroup label="To Account" labelFor="to-account" labelInfo="(required)">
        <Select
          id="to-account"
          items={accountsList}
          itemPredicate={filterItem}
          itemRenderer={renderItem}
          noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
          onItemSelect={setToAccount}
        >
          <Button
            text={toAccount ? toAccount.label : 'Select to account...'}
            rightIcon="double-caret-vertical"
            placeholder="Select to account"
          />
        </Select>
      </FormGroup>
      <FormGroup label="Category" labelFor="category" labelInfo="(required)">
        <Select
          id="category"
          items={categories}
          itemPredicate={filterItem}
          itemRenderer={renderItem}
          noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
          onItemSelect={setCategory}
        >
          <Button
            text={category ? category.label : 'Select category...'}
            rightIcon="double-caret-vertical"
            placeholder="Select category"
          />
        </Select>
      </FormGroup>
      <FormGroup label="Amount" labelFor="amount" labelInfo="(required)">
        <NumericInput
          ref={transferAmountRef}
          id="amount"
          placeholder="Transfer amount"
          allowNumericCharactersOnly={true}
          stepSize={0.01}
          minorStepSize={0.01}
          majorStepSize={1}
          onValueChange={(v) => setTransferAmount(v)}
        />
      </FormGroup>
      <FormGroup label="Transfer Date" labelFor="transaction-date" labelInfo="(required)">
        <DateInput
          id="transaction-date"
          formatDate={formatDate}
          onChange={handleChange}
          parseDate={parseDate}
          placeholder="DD/MM/YYYY"
          highlightCurrentDay={true}
          shortcuts={true}
          value={transferDate}
        />
      </FormGroup>
      <FormGroup label="Description" labelFor="description" labelInfo="(required)">
        <InputGroup
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormGroup>
      <div className="buttons">
        <Button intent="primary" disabled={submitDisabled} onClick={handleSubmit}>
          Submit
        </Button>
        <Button onClick={clearFields}>Clear</Button>
      </div>
    </Card>
  );
}

export default TransferExpense;
