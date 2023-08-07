import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import { Column, Cell, Table, SelectionModes } from '@blueprintjs/table';
import './Expense.css';

function RecurringExpensesTable() {
  const expenses = [
    {
      month: 'January',
      categories: {
        insurance: 524.29,
        utilities: 67.11,
        parents: 500,
        tax: 0,
        housing: 570
      },
      total: 1661.4
    },
    {
      month: 'February',
      categories: {
        insurance: 524.29,
        utilities: 67.11,
        parents: 500,
        tax: 0,
        housing: 570
      },
      total: 1661.4
    },
    {
      month: 'March',
      categories: {
        insurance: 524.29,
        utilities: 67.11,
        parents: 500,
        tax: 0,
        housing: 570
      },
      total: 1661.4
    },
    {
      month: 'April',
      categories: {
        insurance: 524.29,
        utilities: 67.11,
        parents: 500,
        tax: 0,
        housing: 570
      },
      total: 1661.4
    },
    {
      month: 'May',
      categories: {
        insurance: 524.29,
        utilities: 67.11,
        parents: 500,
        tax: 0,
        housing: 570
      },
      total: 1661.4
    },
    {
      month: 'June',
      categories: {
        insurance: 524.29,
        utilities: 67.11,
        parents: 500,
        tax: 0,
        housing: 570
      },
      total: 1661.4
    },
    {
      month: 'July',
      categories: {
        insurance: 524.29,
        utilities: 67.11,
        parents: 500,
        tax: 0,
        housing: 570
      },
      total: 1661.4
    },
    {
      month: 'August',
      categories: {
        insurance: 524.29,
        utilities: 67.11,
        parents: 500,
        tax: 0,
        housing: 570
      },
      total: 1661.4
    },
    {
      month: 'September',
      categories: {
        insurance: 524.29,
        utilities: 67.11,
        parents: 500,
        tax: 0,
        housing: 570
      },
      total: 1661.4
    },
    {
      month: 'October',
      categories: {
        insurance: 524.29,
        utilities: 67.11,
        parents: 500,
        tax: 0,
        housing: 570
      },
      total: 1661.4
    },
    {
      month: 'November',
      categories: {
        insurance: 524.29,
        utilities: 67.11,
        parents: 500,
        tax: 0,
        housing: 570
      },
      total: 1661.4
    },
    {
      month: 'December',
      categories: {
        insurance: 524.29,
        utilities: 67.11,
        parents: 500,
        tax: 0,
        housing: 570
      },
      total: 1661.4
    },
    {
      month: 'Category Total',
      categories: {
        insurance: 524.29,
        utilities: 67.11,
        parents: 500,
        tax: 0,
        housing: 570
      },
      total: 1661.4
    },
    {
      month: 'Monthly Average',
      categories: {
        insurance: 524.29,
        utilities: 67.11,
        parents: 500,
        tax: 0,
        housing: 570
      },
      total: 1661.4
    }
  ];

  const categories = [
    {
      key: 'insurance',
      name: 'Insurance',
      renderer: (rowIndex) => {
        return <Cell>${expenses[rowIndex].categories.insurance.toFixed(2)}</Cell>;
      }
    },
    {
      key: 'utilities',
      name: 'Utilities',
      renderer: (rowIndex) => {
        return <Cell>${expenses[rowIndex].categories.utilities.toFixed(2)}</Cell>;
      }
    },
    {
      key: 'parents',
      name: 'Parents',
      renderer: (rowIndex) => {
        return <Cell>${expenses[rowIndex].categories.parents.toFixed(2)}</Cell>;
      }
    },
    {
      key: 'tax',
      name: 'Tax',
      renderer: (rowIndex) => {
        return <Cell>${expenses[rowIndex].categories.tax.toFixed(2)}</Cell>;
      }
    },
    {
      key: 'housing',
      name: 'Housing',
      renderer: (rowIndex) => {
        return <Cell>${expenses[rowIndex].categories.housing.toFixed(2)}</Cell>;
      }
    }
  ];

  const columnWidths = [120]
    .concat(Array.from(Array(categories.length)).map(() => 100))
    .concat([100]);

  const monthCellRenderer = (rowIndex) => {
    return <Cell>{expenses[rowIndex].month}</Cell>;
  };

  const monthTotalCellRenderer = (rowIndex) => {
    return <Cell>${expenses[rowIndex].total.toFixed(2)}</Cell>;
  };

  return (
    <Card className="Page-form Expenses-table" elevation={Elevation.TWO}>
      <h3>Recurring Expenses</h3>
      <div className="input-container">
        <Table
          numRows={expenses.length}
          cellRendererDependencies={[expenses]}
          columnWidths={columnWidths}
          enableRowHeader={false}
          enableColumnResizing={false}
          enableRowResizing={false}
          selectionModes={SelectionModes.NONE}
        >
          <Column name="Month" cellRenderer={monthCellRenderer} />
          {categories.map((category, i) => (
            <Column key={i} name={category.name} cellRenderer={category.renderer} />
          ))}
          <Column name="Month Total" cellRenderer={monthTotalCellRenderer} />
        </Table>
      </div>
    </Card>
  );
}

export default RecurringExpensesTable;
