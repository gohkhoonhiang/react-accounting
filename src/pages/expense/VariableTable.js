import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import { Column, Cell, Table, SelectionModes } from '@blueprintjs/table';
import './Expense.css';

function VariableExpensesTable() {
  const expenses = [
    {
      month: 'January',
      categories: {
        food: 181.87,
        groceries: 130.62,
        shopping: 0,
        selfcare: 1125,
        clothing: 0,
        oneoff: 0,
        improvement: 0,
        entertainment: 50.32,
        transport: 20.33,
        travel: 0,
        household: 59.9
      },
      total: 1568.03
    },
    {
      month: 'February',
      categories: {
        food: 181.87,
        groceries: 130.62,
        shopping: 0,
        selfcare: 1125,
        clothing: 0,
        oneoff: 0,
        improvement: 0,
        entertainment: 50.32,
        transport: 20.33,
        travel: 0,
        household: 59.9
      },
      total: 1568.03
    },
    {
      month: 'March',
      categories: {
        food: 181.87,
        groceries: 130.62,
        shopping: 0,
        selfcare: 1125,
        clothing: 0,
        oneoff: 0,
        improvement: 0,
        entertainment: 50.32,
        transport: 20.33,
        travel: 0,
        household: 59.9
      },
      total: 1568.03
    },
    {
      month: 'April',
      categories: {
        food: 181.87,
        groceries: 130.62,
        shopping: 0,
        selfcare: 1125,
        clothing: 0,
        oneoff: 0,
        improvement: 0,
        entertainment: 50.32,
        transport: 20.33,
        travel: 0,
        household: 59.9
      },
      total: 1568.03
    },
    {
      month: 'May',
      categories: {
        food: 181.87,
        groceries: 130.62,
        shopping: 0,
        selfcare: 1125,
        clothing: 0,
        oneoff: 0,
        improvement: 0,
        entertainment: 50.32,
        transport: 20.33,
        travel: 0,
        household: 59.9
      },
      total: 1568.03
    },
    {
      month: 'June',
      categories: {
        food: 181.87,
        groceries: 130.62,
        shopping: 0,
        selfcare: 1125,
        clothing: 0,
        oneoff: 0,
        improvement: 0,
        entertainment: 50.32,
        transport: 20.33,
        travel: 0,
        household: 59.9
      },
      total: 1568.03
    },
    {
      month: 'July',
      categories: {
        food: 181.87,
        groceries: 130.62,
        shopping: 0,
        selfcare: 1125,
        clothing: 0,
        oneoff: 0,
        improvement: 0,
        entertainment: 50.32,
        transport: 20.33,
        travel: 0,
        household: 59.9
      },
      total: 1568.03
    },
    {
      month: 'August',
      categories: {
        food: 181.87,
        groceries: 130.62,
        shopping: 0,
        selfcare: 1125,
        clothing: 0,
        oneoff: 0,
        improvement: 0,
        entertainment: 50.32,
        transport: 20.33,
        travel: 0,
        household: 59.9
      },
      total: 1568.03
    },
    {
      month: 'September',
      categories: {
        food: 181.87,
        groceries: 130.62,
        shopping: 0,
        selfcare: 1125,
        clothing: 0,
        oneoff: 0,
        improvement: 0,
        entertainment: 50.32,
        transport: 20.33,
        travel: 0,
        household: 59.9
      },
      total: 1568.03
    },
    {
      month: 'October',
      categories: {
        food: 181.87,
        groceries: 130.62,
        shopping: 0,
        selfcare: 1125,
        clothing: 0,
        oneoff: 0,
        improvement: 0,
        entertainment: 50.32,
        transport: 20.33,
        travel: 0,
        household: 59.9
      },
      total: 1568.03
    },
    {
      month: 'November',
      categories: {
        food: 181.87,
        groceries: 130.62,
        shopping: 0,
        selfcare: 1125,
        clothing: 0,
        oneoff: 0,
        improvement: 0,
        entertainment: 50.32,
        transport: 20.33,
        travel: 0,
        household: 59.9
      },
      total: 1568.03
    },
    {
      month: 'December',
      categories: {
        food: 181.87,
        groceries: 130.62,
        shopping: 0,
        selfcare: 1125,
        clothing: 0,
        oneoff: 0,
        improvement: 0,
        entertainment: 50.32,
        transport: 20.33,
        travel: 0,
        household: 59.9
      },
      total: 1568.03
    },
    {
      month: 'Category Total',
      categories: {
        food: 181.87,
        groceries: 130.62,
        shopping: 0,
        selfcare: 1125,
        clothing: 0,
        oneoff: 0,
        improvement: 0,
        entertainment: 50.32,
        transport: 20.33,
        travel: 0,
        household: 59.9
      },
      total: 1568.03
    },
    {
      month: 'Monthly Average',
      categories: {
        food: 181.87,
        groceries: 130.62,
        shopping: 0,
        selfcare: 1125,
        clothing: 0,
        oneoff: 0,
        improvement: 0,
        entertainment: 50.32,
        transport: 20.33,
        travel: 0,
        household: 59.9
      },
      total: 1568.03
    }
  ];

  const categories = [
    {
      key: 'food',
      name: 'Food',
      renderer: (rowIndex) => {
        return <Cell>${expenses[rowIndex].categories.food.toFixed(2)}</Cell>;
      }
    },
    {
      key: 'groceries',
      name: 'Groceries',
      renderer: (rowIndex) => {
        return <Cell>${expenses[rowIndex].categories.groceries.toFixed(2)}</Cell>;
      }
    },
    {
      key: 'shopping',
      name: 'Shopping',
      renderer: (rowIndex) => {
        return <Cell>${expenses[rowIndex].categories.shopping.toFixed(2)}</Cell>;
      }
    },
    {
      key: 'selfcare',
      name: 'Self Care',
      renderer: (rowIndex) => {
        return <Cell>${expenses[rowIndex].categories.selfcare.toFixed(2)}</Cell>;
      }
    },
    {
      key: 'clothing',
      name: 'Clothing',
      renderer: (rowIndex) => {
        return <Cell>${expenses[rowIndex].categories.clothing.toFixed(2)}</Cell>;
      }
    },
    {
      key: 'oneoff',
      name: 'One-off',
      renderer: (rowIndex) => {
        return <Cell>${expenses[rowIndex].categories.oneoff.toFixed(2)}</Cell>;
      }
    },
    {
      key: 'improvement',
      name: 'Improvement',
      renderer: (rowIndex) => {
        return <Cell>${expenses[rowIndex].categories.improvement.toFixed(2)}</Cell>;
      }
    },
    {
      key: 'entertainment',
      name: 'Entertainment',
      renderer: (rowIndex) => {
        return <Cell>${expenses[rowIndex].categories.entertainment.toFixed(2)}</Cell>;
      }
    },
    {
      key: 'transport',
      name: 'Transport',
      renderer: (rowIndex) => {
        return <Cell>${expenses[rowIndex].categories.transport.toFixed(2)}</Cell>;
      }
    },
    {
      key: 'travel',
      name: 'Travel',
      renderer: (rowIndex) => {
        return <Cell>${expenses[rowIndex].categories.travel.toFixed(2)}</Cell>;
      }
    },
    {
      key: 'household',
      name: 'Household',
      renderer: (rowIndex) => {
        return <Cell>${expenses[rowIndex].categories.household.toFixed(2)}</Cell>;
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
      <h3>Variable Expenses</h3>
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

export default VariableExpensesTable;
