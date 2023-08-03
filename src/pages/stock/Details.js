import React, { useState } from 'react';
import { Tabs, Tab, Button, Dialog, DialogBody, DialogFooter } from '@blueprintjs/core';
import PurchaseHistory from './Purchase';
import SaleHistory from './Sale';
import DividendHistory from './Dividend';
import YieldHistory from './Yield';
import PriceHistory from './Price';

function StockDetails({ dialog, setDialog, dialogTitle }) {
  const [activeTabId, setActiveTabId] = useState('purchase');

  function closeDialog(e) {
    e.preventDefault();
    setDialog(false);
  }

  function handleTabChange(newTabId) {
    setActiveTabId(newTabId);
  }

  return (
    <Dialog
      className="Stock-details-dialog"
      title={dialogTitle}
      icon="list"
      isOpen={dialog}
      onClose={closeDialog}>
      <DialogBody>
        <Tabs onChange={handleTabChange} selectedTabId={activeTabId}>
          <Tab id="purchase" title="Purchase History" panel={<PurchaseHistory />} />
          <Tab id="sale" title="Sale History" panel={<SaleHistory />} />
          <Tab id="dividend" title="Dividend History" panel={<DividendHistory />} />
          <Tab id="yield" title="Yearly Yield" panel={<YieldHistory />} />
          <Tab id="price" title="Price History" panel={<PriceHistory />} />
          <Tabs.Expander />
        </Tabs>
      </DialogBody>
      <DialogFooter actions={<Button text="Close" onClick={closeDialog} />} />
    </Dialog>
  );
}

export default StockDetails;
