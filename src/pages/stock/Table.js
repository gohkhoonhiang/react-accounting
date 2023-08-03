import React, { useState, useMemo } from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import CollapseTable from '../../components/CollapseTable';
import InfoCard from '../../components/InfoCard';
import './Stock.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

function StocksTable() {
  const borderColors = [
    '#00364a',
    '#5e30eb',
    '#ff4013',
    '#fec700',
    '#77bb41',
    '#74a7fe',
    '#5a1c00',
    '#583400',
    '#4f5503'
  ];

  const stocks = [
    {
      name: 'SSB Jun 2022',
      totalPurchaseSum: 15000,
      shareCount: 15000,
      dividendPayout: 252,
      unitPrice: 1,
      averageYield: 2.4,
      monthsElapsed: 12,
      chart: {
        labels: Array.from(Array(10)).map((_, i) => 2022 + i),
        datasets: [
          {
            id: '1',
            label: 'Yield %',
            data: [0.42, 0.57, 0.85, 1.25, 1.28, 1.34, 1.47, 1.49, 1.62, 1.75],
            borderColor: borderColors[Math.floor(Math.random() * borderColors.length)]
          }
        ]
      }
    }
  ];

  const [stocksPagination, setStocksPagination] = useState({
    offset: 0,
    limit: 5,
    total: stocks.length
  });

  const headers = [
    {
      key: 'name',
      label: 'Name'
    },
    {
      key: 'totalPurchaseSum',
      label: 'Total Purchase Sum'
    },
    {
      key: 'shareCount',
      label: 'Current Share Count'
    }
  ];

  const paginatedStocks = useMemo(() => {
    const { offset, limit, total } = stocksPagination;
    const startIndex = offset;
    const endIndex = Math.min(startIndex + limit, total);
    return stocks.slice(startIndex, endIndex);
  });

  const rows = useMemo(() => {
    return paginatedStocks.map((stock) => {
      const heading = stock.name;
      const fields = [
        {
          title: 'Total Share Count',
          value: stock.shareCount
        },
        {
          title: 'Total Dividend Payout',
          value: `$${stock.dividendPayout.toFixed(2)}`
        },
        {
          title: 'Effective Unit Price',
          value: `$${stock.unitPrice.toFixed(2)}`
        },
        {
          title: 'Avg. Yield',
          value: `${stock.averageYield.toFixed(2)}%`
        },
        {
          title: 'Total Purchase Sum',
          value: `$${stock.totalPurchaseSum.toFixed(2)}`
        },
        {
          title: 'Months Since First Purchase',
          value: stock.monthsElapsed
        }
      ];

      return {
        ...stock,
        details: (
          <div className="details">
            <InfoCard heading={heading} fields={fields}></InfoCard>
            <div className="chart">
              <Line datasetIdKey="id" data={stock.chart}></Line>
            </div>
          </div>
        )
      };
    });
  });

  const rowActions = [
    {
      icon: 'eye-open',
      click: (e) => {
        e.preventDefault();
      }
    }
  ];

  const expandedField = 'details';

  const stocksPageLeft = (e) => {
    e.preventDefault();
    const currentOffset = stocksPagination.offset;
    const currentLimit = stocksPagination.limit;
    const newOffset = Math.max(currentOffset - currentLimit, 0);
    setStocksPagination((prev) => {
      return { ...prev, offset: newOffset };
    });
  };

  const stocksPageRight = (e) => {
    e.preventDefault();
    const currentOffset = stocksPagination.offset;
    const currentLimit = stocksPagination.limit;
    const currentTotal = stocksPagination.total;
    const newOffset = Math.min(currentOffset + currentLimit, currentTotal);
    setStocksPagination((prev) => {
      return { ...prev, offset: newOffset };
    });
  };

  return (
    <Card className="Page-form Stocks-table" elevation={Elevation.TWO}>
      <h3>Stocks</h3>
      <div className="input-container">
        <CollapseTable
          headers={headers}
          rows={rows}
          rowActions={rowActions}
          expandedField={expandedField}
          pagination={stocksPagination}
          onPageLeft={stocksPageLeft}
          onPageRight={stocksPageRight}></CollapseTable>
      </div>
    </Card>
  );
}

export default StocksTable;
