import React, { useState, useCallback, useRef } from 'react';
import {
  Button,
  FormGroup,
  NumericInput,
  MenuItem,
  Dialog,
  DialogBody,
  DialogFooter
} from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import { Select } from '@blueprintjs/select';
import { filterItem, renderItem } from '../../utils/select.js';
import '../Page.css';
import './Stock.css';

function SellStockForm({ dialog, setDialog, stock }) {
  function handleSubmit(e) {
    e.preventDefault();
    console.log({ order });
    clearFields();
    setDialog(false);
  }

  function handleClose(e) {
    e.preventDefault();
    clearFields();
    setDialog(false);
  }

  function clearFields() {
    setSaleDate(null);
    setSalePrice('');
    setShareCount('');
    setContractSum('');
    setBrokerageAccount(null);
    salePriceRef.current.state.value = '';
    shareCountRef.current.state.value = '';
    contractSumRef.current.state.value = '';
  }

  const [saleDate, setSaleDate] = useState(null);
  const handleSaleDateChange = useCallback(setSaleDate, []);

  const formatDate = useCallback((date) => date.toLocaleDateString(), []);
  const parseDate = useCallback((str) => new Date(str), []);

  const [salePrice, setSalePrice] = useState('');
  const salePriceRef = useRef(null);

  const [shareCount, setShareCount] = useState('');
  const shareCountRef = useRef(null);

  const [contractSum, setContractSum] = useState('');
  const contractSumRef = useRef(null);

  const brokerageAccounts = [
    { value: 'dbs_vickers_cash', label: 'DBS Vickers Cash Upfront' },
    { value: 'dbs_vickers', label: 'DBS Vickers' },
    { value: 'ocbc_securities', label: 'OCBC Securities' }
  ];
  const [brokerageAccount, setBrokerageAccount] = useState(null);

  const order = {
    saleDate,
    salePrice,
    shareCount,
    contractSum,
    brokerageAccount
  };

  const dialogTitle = stock.name ? `Sell ${stock.name}` : 'Sell Stock';

  const submitDisabled =
    brokerageAccount === null ||
    saleDate === null ||
    salePrice === '' ||
    shareCount === '' ||
    contractSum === '';

  return (
    <Dialog title={dialogTitle} icon="edit" isOpen={dialog} onClose={handleClose}>
      <DialogBody className="Stock-form">
        <FormGroup label="Sale Date" labelFor="sale-date" labelInfo="(required)">
          <DateInput
            id="sale-date"
            formatDate={formatDate}
            onChange={handleSaleDateChange}
            parseDate={parseDate}
            placeholder="DD/MM/YYYY"
            highlightCurrentDay={true}
            shortcuts={true}
            value={saleDate}
          />
        </FormGroup>
        <FormGroup label="Sale Price" labelFor="sale-price" labelInfo="(required)">
          <NumericInput
            ref={salePriceRef}
            id="sale-price"
            placeholder="Sale Price"
            allowNumericCharactersOnly={true}
            stepSize={0.01}
            minorStepSize={0.01}
            majorStepSize={1}
            onValueChange={(v) => setSalePrice(v)}
          />
        </FormGroup>
        <FormGroup label="Share Count" labelFor="share-count" labelInfo="(required)">
          <NumericInput
            ref={shareCountRef}
            id="share-count"
            placeholder="Share Count"
            allowNumericCharactersOnly={true}
            stepSize={1}
            minorStepSize={1}
            majorStepSize={1}
            onValueChange={(v) => setShareCount(v)}
          />
        </FormGroup>
        <FormGroup label="Contract Sum" labelFor="contract-sum" labelInfo="(required)">
          <NumericInput
            ref={contractSumRef}
            id="contract-sum"
            placeholder="Contract Sum"
            allowNumericCharactersOnly={true}
            stepSize={0.01}
            minorStepSize={0.01}
            majorStepSize={1}
            onValueChange={(v) => setContractSum(v)}
          />
        </FormGroup>
        <FormGroup label="Brokerage Account" labelFor="brokerage-account" labelInfo="(required)">
          <Select
            id="brokerage-account"
            items={brokerageAccounts}
            itemPredicate={filterItem}
            itemRenderer={renderItem}
            noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
            onItemSelect={setBrokerageAccount}>
            <Button
              text={brokerageAccount ? brokerageAccount.label : 'Select brokerage account...'}
              rightIcon="double-caret-vertical"
              placeholder="Select brokerage account"
            />
          </Select>
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

export default SellStockForm;
