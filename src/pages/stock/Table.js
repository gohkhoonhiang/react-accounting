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
import StockDetails from './Details';
import EditStockForm from './EditStock';
import BuyStockForm from './Buy';
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
      ticker: 'SBJUN22.GX22060F',
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
    },
    {
      name: 'SSB Dec 2022',
      ticker: 'SBDEC22.GX22120S',
      totalPurchaseSum: 10000,
      shareCount: 10000,
      dividendPayout: 3486,
      unitPrice: 1,
      averageYield: 3.49,
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
      label: 'Total Purchase Sum',
      formatter: (val) => `$${val.toFixed(2)}`
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
          title: 'Ticker',
          value: stock.ticker
        },
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

  const [detailsDialog, setDetailsDialog] = useState(false);
  const [detailsDialogTitle, setDetailsDialogTitle] = useState('');

  const [editDialog, setEditDialog] = useState(false);
  const [editDialogStock, setEditDialogStock] = useState({});

  const [buyDialog, setBuyDialog] = useState(false);
  const [buyDialogStock, setBuyDialogStock] = useState({});

  const rowActions = [
    {
      icon: 'eye-open',
      click: (e, row) => {
        e.preventDefault();
        setDetailsDialog(true);
        setDetailsDialogTitle(row.name);
      }
    },
    {
      icon: 'edit',
      click: (e, row) => {
        e.preventDefault();
        setEditDialog(true);
        setEditDialogStock(row);
      }
    },
    {
      icon: 'import',
      click: (e, row) => {
        e.preventDefault();
        setBuyDialog(true);
        setBuyDialogStock(row);
      }
    },
    {
      icon: 'export',
      click: (e, row) => {
        e.preventDefault();
        setDetailsDialog(true);
        setDetailsDialogTitle(row.name);
      }
    },
    {
      icon: 'data-connection',
      click: (e, row) => {
        e.preventDefault();
        setDetailsDialog(true);
        setDetailsDialogTitle(row.name);
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

      <StockDetails
        dialog={detailsDialog}
        setDialog={setDetailsDialog}
        dialogTitle={detailsDialogTitle}></StockDetails>

      <EditStockForm
        dialog={editDialog}
        setDialog={setEditDialog}
        stock={editDialogStock}></EditStockForm>

      <BuyStockForm
        dialog={buyDialog}
        setDialog={setBuyDialog}
        stock={buyDialogStock}></BuyStockForm>
    </Card>
  );
}

export default StocksTable;
