import React from 'react';
import TransferBetween from './TransferBetween.js';
import TransferIn from './TransferIn.js';
import TransferOut from './TransferOut.js';
import TransferExpense from './TransferExpense.js';
import './Transfer.css';

function Transfer() {
  return (
    <div className="Transfer-page">
      <h2>Transfer</h2>
      <TransferBetween></TransferBetween>
      <TransferIn></TransferIn>
      <TransferOut></TransferOut>
      <TransferExpense></TransferExpense>
    </div>
  );
}

export default Transfer;
