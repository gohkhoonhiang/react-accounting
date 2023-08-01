import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { Button, Card, Elevation, FormGroup, HTMLSelect } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import '../Page.css';
import './Budget.css';
import { useBudgetSheetDispatch } from './Context';
import { minDate, maxDate, years, months, formatDateYYYYMMDD } from './utils.js';

function BudgetFilter() {
  const dispatch = useBudgetSheetDispatch();

  const today = new Date();
  const [budgetPeriod, setBudgetPeriod] = useState({
    year: today.getFullYear().toString(),
    month: months[today.getMonth() + 1]
  });
  const budgetYear = useMemo(() => budgetPeriod.year, [budgetPeriod]);
  const budgetMonth = useMemo(() => budgetPeriod.month, [budgetPeriod]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const formatDate = useCallback((date) => formatDateYYYYMMDD(date), []);
  const parseDate = useCallback((str) => new Date(str), []);

  function setPeriodStartEnd() {
    if (budgetYear === '' || budgetMonth === '') {
      return;
    }

    let periodStart, periodEnd;

    const year = budgetYear;
    const month = budgetMonth;

    periodStart = new Date(`${year}-${month}-01`);
    periodEnd = new Date(periodStart);
    periodEnd.setMonth(periodEnd.getMonth() + 1);
    periodEnd.setDate(periodEnd.getDate() - 1);

    setStartDate(formatDateYYYYMMDD(periodStart));
    setEndDate(formatDateYYYYMMDD(periodEnd));
  }

  function loadBudgetSheet() {
    const sheet = {
      startDate,
      endDate,
      totalBudgeted: 0,
      totalAllocated: 0,
      balanceToAllocate: 0
    };
    dispatch({ type: 'loaded', budgetSheet: sheet });
  }

  useEffect(() => {
    setPeriodStartEnd();
  }, [budgetYear, budgetMonth]);

  const handleYearChange = useCallback((e) => {
    e.preventDefault();

    const year = e.target.value;
    setBudgetPeriod((prev) => {
      return { ...prev, year };
    });
  }, []);

  const handleMonthChange = useCallback((e) => {
    e.preventDefault();

    const month = e.target.value;
    setBudgetPeriod((prev) => {
      return { ...prev, month };
    });
  }, []);

  const handleStartDateChange = useCallback(setStartDate, []);
  const handleEndDateChange = useCallback(setEndDate, []);

  function validDateRange() {
    if (startDate === '' || startDate === null || endDate === '' || endDate === null) {
      return true;
    }
    return new Date(endDate) >= new Date(startDate);
  }

  const submitDisabled = budgetYear === '' || budgetMonth === '' || !validDateRange();

  function handleSubmit(e) {
    e.preventDefault();
    loadBudgetSheet();
    console.log({ budgetPeriod, startDate, endDate });
  }

  function clearFields() {
    setBudgetPeriod({
      year: today.getFullYear().toString(),
      month: months[today.getMonth() + 1]
    });
  }

  return (
    <Card className="Page-form Budget-filter" elevation={Elevation.TWO}>
      <h3>Filters</h3>
      <div className="input-container">
        <FormGroup className="budget-period" label="Budget Period" labelFor="budget-period">
          <HTMLSelect
            value={budgetYear}
            placeholder="Choose year"
            options={years}
            onChange={handleYearChange}
          />
          <HTMLSelect
            value={budgetMonth}
            placeholder="Choose month"
            options={months}
            onChange={handleMonthChange}
          />
        </FormGroup>
        <FormGroup label="Start Date" labelFor="start-date">
          <DateInput
            id="start-date"
            formatDate={formatDate}
            onChange={handleStartDateChange}
            parseDate={parseDate}
            minDate={minDate}
            maxDate={maxDate}
            placeholder="YYYY-MM-DD"
            highlightCurrentDay={true}
            shortcuts={true}
            value={startDate}
          />
        </FormGroup>
        <FormGroup label="End Date" labelFor="end-date">
          <DateInput
            id="end-date"
            formatDate={formatDate}
            onChange={handleEndDateChange}
            parseDate={parseDate}
            minDate={minDate}
            maxDate={maxDate}
            placeholder="YYYY-MM-DD"
            highlightCurrentDay={true}
            shortcuts={true}
            value={endDate}
          />
        </FormGroup>
      </div>
      <div className="buttons">
        <Button intent="primary" disabled={submitDisabled} onClick={handleSubmit}>
          Submit
        </Button>
        <Button onClick={clearFields}>Reset</Button>
      </div>
    </Card>
  );
}

export default BudgetFilter;
