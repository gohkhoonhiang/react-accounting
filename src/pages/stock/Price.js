import React, { useState } from 'react';
import SimpleTable from '../../components/SimpleTable';

function PriceHistory() {
  const headers = [
    {
      key: 'priceDate',
      label: 'Price Date'
    },
    {
      key: 'unitPrice',
      label: 'Unit Price',
      formatter: (val) => `$${val.toFixed(4)}`
    }
  ];

  const rows = [
    {
      priceDate: '2023-07-31',
      unitPrice: 3.447
    }
  ];

  const actions = [];

  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 5,
    total: rows.length
  });

  const pageLeft = (e) => {
    e.preventDefault();
    const currentOffset = pagination.offset;
    const currentLimit = pagination.limit;
    const newOffset = Math.max(currentOffset - currentLimit, 0);
    setPagination((prev) => {
      return { ...prev, offset: newOffset };
    });
  };

  const pageRight = (e) => {
    e.preventDefault();
    const currentOffset = pagination.offset;
    const currentLimit = pagination.limit;
    const currentTotal = pagination.total;
    const newOffset = Math.min(currentOffset + currentLimit, currentTotal);
    setPagination((prev) => {
      return { ...prev, offset: newOffset };
    });
  };

  return (
    <div className="Price-history">
      <SimpleTable
        headers={headers}
        rows={rows}
        rowActions={actions}
        pagination={pagination}
        onPageLeft={pageLeft}
        onPageRight={pageRight}
      ></SimpleTable>
    </div>
  );
}

export default PriceHistory;
