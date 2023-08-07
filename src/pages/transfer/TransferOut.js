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

function TransferOut() {
  const bucketsList = [
    { value: 'ocbc360_alice', label: 'OCBC 360 (Alice)' },
    { value: 'ocbc360_bob', label: 'OCBC 360 (Bob)' }
  ];
  const [fromBucket, setFromBucket] = useState(null);

  const [transferAmount, setTransferAmount] = useState('');
  const transferAmountRef = useRef(null);

  const [transferDate, setTransferDate] = useState(null);
  const handleChange = useCallback(setTransferDate, []);
  const formatDate = useCallback((date) => date.toLocaleDateString(), []);
  const parseDate = useCallback((str) => new Date(str), []);

  const [description, setDescription] = useState('');

  const submitDisabled = fromBucket === null || transferAmount === '' || description === '';

  function handleSubmit(e) {
    e.preventDefault();

    console.log({ fromBucket, transferAmount, transferDate, description });
  }

  function clearFields() {
    setFromBucket(null);
    setTransferAmount('');
    setTransferDate(null);
    setDescription('');
    transferAmountRef.current.state.value = '';
  }

  return (
    <Card className="Transfer-form" elevation={Elevation.TWO}>
      <h3>Transfer Out</h3>
      <FormGroup label="From Bucket" labelFor="from-bucket" labelInfo="(required)">
        <Select
          id="from-bucket"
          items={bucketsList}
          itemPredicate={filterItem}
          itemRenderer={renderItem}
          noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
          onItemSelect={setFromBucket}>
          <Button
            text={fromBucket ? fromBucket.label : 'Select bucket...'}
            rightIcon="double-caret-vertical"
            placeholder="Select from bucket"
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

export default TransferOut;
