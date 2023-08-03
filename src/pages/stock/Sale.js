import React, { useState, useMemo } from 'react';
import CollapseTable from '../../components/CollapseTable';
import InfoCard from '../../components/InfoCard';
import './Stock.css';

function SaleHistory() {
  const sales = [
    {
      saleDate: '2023-01-03',
      shareCount: 10000,
      salePrice: 1,
      contractSum: 2,
      totalFee: 2,
      totalPrice: 10000,
      details: {
        brokerageAccount: 'DBS Vickers Cash Upfront',
        commission: 12,
        clearingFee: 3.25,
        accessFee: 0.75,
        settlementInstructionFee: 0.35
      }
    }
  ];

  const [salesPagination, setSalesPagination] = useState({
    offset: 0,
    limit: 5,
    total: sales.length
  });

  const headers = [
    {
      key: 'saleDate',
      label: 'Sale Date'
    },
    {
      key: 'shareCount',
      label: 'Share Count'
    },
    {
      key: 'salePrice',
      label: 'Sale Price',
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

  const paginatedSales = useMemo(() => {
    const { offset, limit, total } = salesPagination;
    const startIndex = offset;
    const endIndex = Math.min(startIndex + limit, total);
    return sales.slice(startIndex, endIndex);
  });

  const rows = useMemo(() => {
    return paginatedSales.map((sale) => {
      const heading = '';
      const fields = [
        {
          title: 'Brokerage Account',
          value: sale.details.brokerageAccount
        },
        {
          title: 'Commission',
          value: `$${sale.details.commission.toFixed(3)}`
        },
        {
          title: 'Clearing Fee',
          value: `$${sale.details.clearingFee.toFixed(3)}`
        },
        {
          title: 'Access Fee',
          value: `$${sale.details.accessFee.toFixed(3)}`
        },
        {
          title: 'Settlement Instruction Fee',
          value: `$${sale.details.settlementInstructionFee.toFixed(3)}`
        }
      ];

      return {
        ...sale,
        details: (
          <div className="details">
            <InfoCard heading={heading} fields={fields}></InfoCard>
          </div>
        )
      };
    });
  });

  const salesPageLeft = (e) => {
    e.preventDefault();
    const currentOffset = salesPagination.offset;
    const currentLimit = salesPagination.limit;
    const newOffset = Math.max(currentOffset - currentLimit, 0);
    setSalesPagination((prev) => {
      return { ...prev, offset: newOffset };
    });
  };

  const salesPageRight = (e) => {
    e.preventDefault();
    const currentOffset = salesPagination.offset;
    const currentLimit = salesPagination.limit;
    const currentTotal = salesPagination.total;
    const newOffset = Math.min(currentOffset + currentLimit, currentTotal);
    setSalesPagination((prev) => {
      return { ...prev, offset: newOffset };
    });
  };

  const rowActions = [];

  const expandedField = 'details';

  return (
    <div className="Sale-history">
      <CollapseTable
        headers={headers}
        rows={rows}
        rowActions={rowActions}
        expandedField={expandedField}
        pagination={salesPagination}
        onPageLeft={salesPageLeft}
        onPageRight={salesPageRight}></CollapseTable>
    </div>
  );
}

export default SaleHistory;
