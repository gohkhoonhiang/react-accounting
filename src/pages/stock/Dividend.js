import React, { useState } from 'react';
import SimpleTable from '../../components/SimpleTable';

function DividendHistory() {
  const headers = [
    {
      key: 'exDividendDate',
      label: 'Ex-Dividend Date'
    },
    {
      key: 'unitValue',
      label: 'Unit Value',
      formatter: (val) => `$${val.toFixed(3)}`
    },
    {
      key: 'holdingsAsOf',
      label: 'Holdings As Of'
    },
    {
      key: 'costAsOf',
      label: 'Cost As Of',
      formatter: (val) => `$${val.toFixed(2)}`
    },
    {
      key: 'eligiblePayout',
      label: 'Eligible Payout',
      formatter: (val) => `$${val.toFixed(2)}`
    },
    {
      key: 'yield',
      label: 'Yield',
      formatter: (val) => `${val.toFixed(2)}%`
    }
  ];

  const rows = [
    {
      exDividendDate: '2022-08-11',
      unitValue: 0.061,
      holdingsAsOf: 67502,
      costAsOf: 205565.41,
      eligiblePayout: 4117.62,
      yield: 2
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
    <div className="Dividend-history">
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

export default DividendHistory;
