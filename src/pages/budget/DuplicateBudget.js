import React, { useState, useCallback, useMemo } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, FormGroup, HTMLSelect } from '@blueprintjs/core';
import '../Page.css';
import './Budget.css';
import { years, months, formatDateYYYYMMDD } from './utils.js';

function DuplicateBudgetForm({ dialog, setDialog }) {
  function handleSubmit(e) {
    e.preventDefault();
    sendData();
    clearFields();
    setDialog(false);
  }

  function handleClose(e) {
    e.preventDefault();
    clearFields();
    setDialog(false);
  }

  function clearFields() {
    setFromBudgetPeriod({
      year: today.getFullYear().toString(),
      month: months[today.getMonth() + 1]
    });

    setToBudgetPeriod({
      year: nextMonth.getFullYear().toString(),
      month: months[nextMonth.getMonth() + 1]
    });
  }

  function sendData() {
    console.log({ budgetSheet, fromBudgetPeriod, toBudgetPeriod });
  }

  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const [fromBudgetPeriod, setFromBudgetPeriod] = useState({
    year: today.getFullYear().toString(),
    month: months[today.getMonth() + 1]
  });

  const [toBudgetPeriod, setToBudgetPeriod] = useState({
    year: nextMonth.getFullYear().toString(),
    month: months[nextMonth.getMonth() + 1]
  });

  const fromBudgetYear = useMemo(() => fromBudgetPeriod.year, [fromBudgetPeriod]);
  const fromBudgetMonth = useMemo(() => fromBudgetPeriod.month, [fromBudgetPeriod]);

  const toBudgetYear = useMemo(() => toBudgetPeriod.year, [toBudgetPeriod]);
  const toBudgetMonth = useMemo(() => toBudgetPeriod.month, [toBudgetPeriod]);

  const handleFromYearChange = useCallback((e) => {
    e.preventDefault();

    const year = e.target.value;
    setFromBudgetPeriod((prev) => {
      return { ...prev, year };
    });
  }, []);

  const handleFromMonthChange = useCallback((e) => {
    e.preventDefault();

    const month = e.target.value;
    setFromBudgetPeriod((prev) => {
      return { ...prev, month };
    });
  }, []);

  const handleToYearChange = useCallback((e) => {
    e.preventDefault();

    const year = e.target.value;
    setToBudgetPeriod((prev) => {
      return { ...prev, year };
    });
  }, []);

  const handleToMonthChange = useCallback((e) => {
    e.preventDefault();

    const month = e.target.value;
    setToBudgetPeriod((prev) => {
      return { ...prev, month };
    });
  }, []);

  const startDate = useMemo(() => {
    if (toBudgetYear === '' || toBudgetMonth === '') {
      return;
    }

    const date = new Date(`${toBudgetYear}-${toBudgetMonth}-01`);
    return date;
  }, [toBudgetYear, toBudgetMonth]);

  const endDate = useMemo(() => {
    if (startDate === null) {
      return;
    }

    const date = new Date(startDate);
    date.setMonth(date.getMonth() + 1);
    date.setDate(date.getDate() - 1);
    return date;
  }, [startDate]);

  const budgetSheet = useMemo(() => {
    if (
      startDate === null ||
      startDate === undefined ||
      endDate === null ||
      endDate === undefined
    ) {
      return {};
    }

    return {
      startDate: formatDateYYYYMMDD(startDate),
      endDate: formatDateYYYYMMDD(endDate)
    };
  }, [startDate, endDate]);

  return (
    <Dialog title="New Budget Sheet" icon="add" isOpen={dialog} onClose={handleClose}>
      <DialogBody className="Budget-sheet-form">
        <FormGroup
          className="budget-period"
          label="From Budget Period"
          labelFor="from-budget-period">
          <HTMLSelect
            value={fromBudgetYear}
            placeholder="Choose year"
            options={years}
            onChange={handleFromYearChange}
          />
          <HTMLSelect
            value={fromBudgetMonth}
            placeholder="Choose month"
            options={months}
            onChange={handleFromMonthChange}
          />
        </FormGroup>
        <FormGroup className="budget-period" label="To Budget Period" labelFor="to-budget-period">
          <HTMLSelect
            value={toBudgetYear}
            placeholder="Choose year"
            options={years}
            onChange={handleToYearChange}
          />
          <HTMLSelect
            value={toBudgetMonth}
            placeholder="Choose month"
            options={months}
            onChange={handleToMonthChange}
          />
        </FormGroup>
      </DialogBody>
      <DialogFooter
        className="Budget-sheet-form-footer"
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

export default DuplicateBudgetForm;
