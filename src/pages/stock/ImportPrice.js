import React, { useState, useCallback } from 'react';
import { Button, FormGroup, HTMLSelect, Dialog, DialogBody, DialogFooter } from '@blueprintjs/core';
import { DateRangeInput } from '@blueprintjs/datetime';
import '../Page.css';
import './Stock.css';

function ImportPriceForm({ dialog, setDialog, stock }) {
  function handleSubmit(e) {
    e.preventDefault();
    console.log({ importOptions });
    clearFields();
    setDialog(false);
  }

  function handleClose(e) {
    e.preventDefault();
    clearFields();
    setDialog(false);
  }

  function clearFields() {
    setStartDate(null);
    setEndDate(null);
    setFrequency('monthly');
  }

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const dateRange = [startDate, endDate];
  const handleRangeChange = useCallback((newVal) => {
    setStartDate(newVal[0]);
    setEndDate(newVal[1]);
  }, []);

  const formatDate = useCallback((date) => date.toLocaleDateString(), []);
  const parseDate = useCallback((str) => new Date(str), []);

  const [frequency, setFrequency] = useState('monthly');
  const frequencies = [
    { value: 'daily', label: 'Daily' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ];
  const handleFrequencyChange = useCallback((e) => {
    e.preventDefault();

    setFrequency(e.target.value);
  }, []);

  const importOptions = {
    startDate,
    endDate,
    interval: frequency
  };

  const dialogTitle = stock.name ? `Import Price Data - ${stock.name}` : 'Import Price Data';

  const submitDisabled = startDate === null || endDate === null || frequency === '';

  return (
    <Dialog title={dialogTitle} icon="edit" isOpen={dialog} onClose={handleClose}>
      <DialogBody className="Stock-form">
        <FormGroup label="Start Date" labelFor="start-date" labelInfo="(required)">
          <DateRangeInput
            id="start-date"
            formatDate={formatDate}
            onChange={handleRangeChange}
            parseDate={parseDate}
            placeholder="DD/MM/YYYY"
            shortcuts={true}
            value={dateRange}
          />
        </FormGroup>
        <FormGroup label="Interval" labelFor="interval" labelInfo="(required)">
          <HTMLSelect
            value={frequency}
            placeholder="Choose interval"
            options={frequencies}
            onChange={handleFrequencyChange}
          />
        </FormGroup>
      </DialogBody>
      <DialogFooter
        className="Stock-form-footer"
        actions={
          <div className="actions">
            <Button
              intent="primary"
              text="Submit"
              disabled={submitDisabled}
              onClick={handleSubmit}
            />
            <Button text="Close" onClick={handleClose} />
          </div>
        }
      />
    </Dialog>
  );
}

export default ImportPriceForm;
