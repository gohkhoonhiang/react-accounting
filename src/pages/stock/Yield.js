import React, { useState } from 'react';
import SimpleTable from '../../components/SimpleTable';

function YieldHistory() {
  const headers = [
    {
      key: 'year',
      label: 'Year'
    },
    {
      key: 'averageCost',
      label: 'Avg. Cost',
      formatter: (val) => `$${val.toFixed(2)}`
    },
    {
      key: 'averagePrice',
      label: 'Avg. Price',
      formatter: (val) => `$${val.toFixed(2)}`
    },
    {
      key: 'totalPayout',
      label: 'Total Payout',
      formatter: (val) => `$${val.toFixed(2)}`
    },
    {
      key: 'yieldPerCost',
      label: 'Yield / Cost',
      formatter: (val) => `${val.toFixed(2)}%`
    },
    {
      key: 'yieldPerPrice',
      label: 'Yield / Price',
      formatter: (val) => `${val.toFixed(2)}%`
    }
  ];

  const rows = [
    {
      year: '2022',
      averageCost: 3.22,
      averagePrice: 3.28,
      totalPayout: 0.11,
      yieldPerCost: 3.47,
      yieldPerPrice: 3.42
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
    <div className="Yield-history">
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

export default YieldHistory;
