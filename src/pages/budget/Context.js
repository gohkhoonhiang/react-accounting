import React from 'react';
import { createContext, useContext, useReducer } from 'react';

const BudgetSheetContext = createContext(null);
const BudgetSheetDispatchContext = createContext(null);

const BudgetContext = createContext(null);
const BudgetDispatchContext = createContext(null);

function budgetSheetReducer(state, action) {
  switch (action.type) {
    case 'loaded': {
      return action.budgetSheet;
    }
    case 'new': {
      return action.budgetSheet;
    }
    default: {
      console.error(`Unknown action: ${action.type}`);
      return state;
    }
  }
}

function budgetReducer(state, action) {
  switch (action.type) {
    case 'loaded': {
      return action.budgets;
    }
    case 'add': {
      return [...state, action.budget];
    }
    case 'update': {
      const { budget, rowIndex, field } = action;
      state[rowIndex][field] = budget;
      return state;
    }
    default: {
      console.error(`Unknown action: ${action.type}`);
      return state;
    }
  }
}

export function BudgetSheetProvider({ children }) {
  const [budgetSheet, dispatch] = useReducer(budgetSheetReducer, []);

  return (
    <BudgetSheetContext.Provider value={budgetSheet}>
      <BudgetSheetDispatchContext.Provider value={dispatch}>
        {children}
      </BudgetSheetDispatchContext.Provider>
    </BudgetSheetContext.Provider>
  );
}

export function useBudgetSheet() {
  return useContext(BudgetSheetContext);
}

export function useBudgetSheetDispatch() {
  return useContext(BudgetSheetDispatchContext);
}

export function BudgetProvider({ children }) {
  const [budgets, dispatch] = useReducer(budgetReducer, []);

  return (
    <BudgetContext.Provider value={budgets}>
      <BudgetDispatchContext.Provider value={dispatch}>{children}</BudgetDispatchContext.Provider>
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  return useContext(BudgetContext);
}

export function useBudgetDispatch() {
  return useContext(BudgetDispatchContext);
}
