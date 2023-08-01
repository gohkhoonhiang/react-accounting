import React, { useState, useCallback } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, FormGroup } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import '../Page.css';
import './Budget.css';
import { useBudgetSheetDispatch } from './Context.js';

function AddBudgetForm({ dialog, setDialog }) {
  const dispatch = useBudgetSheetDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: 'new', budgetSheet });
    setDialog(false);
  }

  function handleClose(e) {
    e.preventDefault();
    setDialog(false);
  }

  const [startDate, setStartDate] = useState(null);
  const handleStartDateChange = useCallback(setStartDate, []);

  const [endDate, setEndDate] = useState(null);
  const handleEndDateChange = useCallback(setEndDate, []);

  const formatDate = useCallback((date) => date.toLocaleDateString(), []);
  const parseDate = useCallback((str) => new Date(str), []);

  const budgetSheet = {
    startDate,
    endDate
  };

  return (
    <Dialog title="New Budget Sheet" icon="add" isOpen={dialog} onClose={handleClose}>
      <DialogBody className="Budget-row-form">
        <FormGroup label="Start Date" labelFor="start-date" labelInfo="(required)">
          <DateInput
            id="start-date"
            formatDate={formatDate}
            onChange={handleStartDateChange}
            parseDate={parseDate}
            placeholder="DD/MM/YYYY"
            highlightCurrentDay={true}
            shortcuts={true}
            value={startDate}
          />
        </FormGroup>
        <FormGroup label="End Date" labelFor="end-date" labelInfo="(required)">
          <DateInput
            id="end-date"
            formatDate={formatDate}
            onChange={handleEndDateChange}
            parseDate={parseDate}
            placeholder="DD/MM/YYYY"
            highlightCurrentDay={true}
            shortcuts={true}
            value={endDate}
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

export default AddBudgetForm;
