import React, { useState, useCallback, useRef } from 'react';
import {
  Button,
  FormGroup,
  NumericInput,
  MenuItem,
  Checkbox,
  Dialog,
  DialogBody,
  DialogFooter
} from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import { Select } from '@blueprintjs/select';
import { filterItem, renderItem } from '../../utils/select.js';
import '../Page.css';
import './Stock.css';

function BuyStockForm({ dialog, setDialog, stock }) {
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
    setPurchaseDate(null);
    setPurchasePrice('');
    setShareCount('');
    setContractSum('');
    setBrokerageAccount(null);
    setReinvest(false);
    purchasePriceRef.current.state.value = '';
    shareCountRef.current.state.value = '';
    contractSumRef.current.state.value = '';
  }

  const [purchaseDate, setPurchaseDate] = useState(null);
  const handlePurchaseDateChange = useCallback(setPurchaseDate, []);

  const formatDate = useCallback((date) => date.toLocaleDateString(), []);
  const parseDate = useCallback((str) => new Date(str), []);

  const [purchasePrice, setPurchasePrice] = useState('');
  const purchasePriceRef = useRef(null);

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

  const [reinvest, setReinvest] = useState(false);
  const handleReinvestChange = useCallback((e) => {
    e.preventDefault();
    setReinvest(!reinvest);
  }, []);

  const order = {
    purchaseDate,
    purchasePrice,
    shareCount,
    contractSum,
    brokerageAccount,
    reinvest
  };

  const dialogTitle = stock.name ? `Buy ${stock.name}` : 'Buy Stock';

  const submitDisabled =
    brokerageAccount === null ||
    purchaseDate === null ||
    purchasePrice === '' ||
    shareCount === '' ||
    contractSum === '';

  return (
    <Dialog title={dialogTitle} icon="edit" isOpen={dialog} onClose={handleClose}>
      <DialogBody className="Stock-form">
        <FormGroup label="Purchase Date" labelFor="purchase-date" labelInfo="(required)">
          <DateInput
            id="purchase-date"
            formatDate={formatDate}
            onChange={handlePurchaseDateChange}
            parseDate={parseDate}
            placeholder="DD/MM/YYYY"
            highlightCurrentDay={true}
            shortcuts={true}
            value={purchaseDate}
          />
        </FormGroup>
        <FormGroup label="Purchase Price" labelFor="purchase-price" labelInfo="(required)">
          <NumericInput
            ref={purchasePriceRef}
            id="purchase-price"
            placeholder="Purchase Price"
            allowNumericCharactersOnly={true}
            stepSize={0.01}
            minorStepSize={0.01}
            majorStepSize={1}
            onValueChange={(v) => setPurchasePrice(v)}
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
        <FormGroup label="Reinvest?" labelFor="reinvest">
          <Checkbox checked={reinvest} onChange={handleReinvestChange} />
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

export default BuyStockForm;
