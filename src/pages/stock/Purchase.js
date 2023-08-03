import React, { useState, useMemo } from 'react';
import CollapseTable from '../../components/CollapseTable';
import InfoCard from '../../components/InfoCard';
import './Stock.css';

function PurchaseHistory() {
  const purchases = [
    {
      purchaseDate: '2020-06-24',
      shareCount: 26,
      purchasePrice: 0.33,
      contractSum: 0,
      totalFee: 0,
      totalPrice: 8.62,
      details: {
        brokerageAccount: 'OCBC Securities',
        commission: 25,
        clearingFee: 0.003,
        accessFee: 0.001,
        settlementInstructionFee: 0.35
      }
    }
  ];

  const [purchasesPagination, setPurchasesPagination] = useState({
    offset: 0,
    limit: 5,
    total: purchases.length
  });

  const headers = [
    {
      key: 'purchaseDate',
      label: 'Purchase Date'
    },
    {
      key: 'shareCount',
      label: 'Share Count'
    },
    {
      key: 'purchasePrice',
      label: 'Purchase Price',
      formatter: (val) => `$${val.toFixed(2)}`
    },
    {
      key: 'contractSum',
      label: 'Contract Sum',
      formatter: (val) => `$${val.toFixed(2)}`
    },
    {
      key: 'totalFee',
      label: 'Total Fee',
      formatter: (val) => `$${val.toFixed(2)}`
    },
    {
      key: 'totalPrice',
      label: 'Total Price',
      formatter: (val) => `$${val.toFixed(2)}`
    }
  ];

  const paginatedPurchases = useMemo(() => {
    const { offset, limit, total } = purchasesPagination;
    const startIndex = offset;
    const endIndex = Math.min(startIndex + limit, total);
    return purchases.slice(startIndex, endIndex);
  });

  const rows = useMemo(() => {
    return paginatedPurchases.map((purchase) => {
      const heading = '';
      const fields = [
        {
          title: 'Brokerage Account',
          value: purchase.details.brokerageAccount
        },
        {
          title: 'Commission',
          value: `$${purchase.details.commission.toFixed(3)}`
        },
        {
          title: 'Clearing Fee',
          value: `$${purchase.details.clearingFee.toFixed(3)}`
        },
        {
          title: 'Access Fee',
          value: `$${purchase.details.accessFee.toFixed(3)}`
        },
        {
          title: 'Settlement Instruction Fee',
          value: `$${purchase.details.settlementInstructionFee.toFixed(3)}`
        }
      ];

      return {
        ...purchase,
        details: (
          <div className="details">
            <InfoCard heading={heading} fields={fields}></InfoCard>
          </div>
        )
      };
    });
  });

  const purchasesPageLeft = (e) => {
    e.preventDefault();
    const currentOffset = purchasesPagination.offset;
    const currentLimit = purchasesPagination.limit;
    const newOffset = Math.max(currentOffset - currentLimit, 0);
    setPurchasesPagination((prev) => {
      return { ...prev, offset: newOffset };
    });
  };

  const purchasesPageRight = (e) => {
    e.preventDefault();
    const currentOffset = purchasesPagination.offset;
    const currentLimit = purchasesPagination.limit;
    const currentTotal = purchasesPagination.total;
    const newOffset = Math.min(currentOffset + currentLimit, currentTotal);
    setPurchasesPagination((prev) => {
      return { ...prev, offset: newOffset };
    });
  };

  const rowActions = [];

  const expandedField = 'details';

  return (
    <div className="Purchase-history">
      <CollapseTable
        headers={headers}
        rows={rows}
        rowActions={rowActions}
        expandedField={expandedField}
        pagination={purchasesPagination}
        onPageLeft={purchasesPageLeft}
        onPageRight={purchasesPageRight}></CollapseTable>
    </div>
  );
}

export default PurchaseHistory;
