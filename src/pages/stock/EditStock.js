import React, { useState, useEffect } from 'react';
import { Button, FormGroup, InputGroup, Dialog, DialogBody, DialogFooter } from '@blueprintjs/core';
import '../Page.css';
import './Stock.css';

function EditStockForm({ dialog, setDialog, stock }) {
  function handleSubmit(e) {
    e.preventDefault();
    setDialog(false);
  }

  function handleClose(e) {
    e.preventDefault();
    setDialog(false);
  }

  const [name, setName] = useState(stock.name);
  const [ticker, setTicker] = useState(stock.ticker);

  const dialogTitle = stock.name ? `Edit ${stock.name}` : 'Edit Stock';

  useEffect(() => {
    setName(stock.name);
    setTicker(stock.ticker);
  }, [stock]);

  return (
    <Dialog title={dialogTitle} icon="edit" isOpen={dialog} onClose={handleClose}>
      <DialogBody className="Stock-form">
        <FormGroup label="Name" labelFor="name" labelInfo="(required)">
          <InputGroup
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Ticker" labelFor="ticker" labelInfo="(required)">
          <InputGroup
            id="ticker"
            placeholder="Ticker"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
          />
        </FormGroup>
      </DialogBody>
      <DialogFooter
        className="Stock-form-footer"
        actions={
          <div className="actions">
            <Button intent="primary" text="Submit" onClick={handleSubmit} />
            <Button text="Close" onClick={handleClose} />
          </div>
        }
      />
    </Dialog>
  );
}

export default EditStockForm;
