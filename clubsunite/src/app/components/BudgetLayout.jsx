"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function BudgetLayout() {
  const expenseInitialColumns = [
    { id: uuidv4(), name: "Expense Category" },
    { id: uuidv4(), name: "Budgeted Amount" },
    { id: uuidv4(), name: "Actual Amount" },
    { id: uuidv4(), name: "Variance" },
    { id: uuidv4(), name: "Notes" },
  ];
  const [expenseColumns, setExpenseColumns] = useState(expenseInitialColumns);
  const createExpenseEmptyRow = () => {
    const row = {};
    expenseColumns.forEach((col) => (row[col.id] = ""));
    return row;
  };
  const [expenseRows, setExpenseRows] = useState([createExpenseEmptyRow()]);

  const incomeInitialColumns = [
    { id: uuidv4(), name: "Income Source" },
    { id: uuidv4(), name: "Budgeted Amount" },
    { id: uuidv4(), name: "Actual Amount" },
    { id: uuidv4(), name: "Variance" },
    { id: uuidv4(), name: "Notes" },
  ];
  const [incomeColumns, setIncomeColumns] = useState(incomeInitialColumns);
  const createIncomeEmptyRow = () => {
    const row = {};
    incomeColumns.forEach((col) => (row[col.id] = ""));
    return row;
  };
  const [incomeRows, setIncomeRows] = useState([createIncomeEmptyRow()]);

  const getTotal = (rows, columns, targetName) => {
    const col = columns.find((col) => col.name === targetName);
    if (!col) return 0;
    return rows.reduce((sum, row) => {
      const val = parseFloat(row[col.id]) || 0;
      return sum + val;
    }, 0);
  };

  const incomeBudgeted = getTotal(incomeRows, incomeColumns, "Budgeted Amount");
  const incomeActual = getTotal(incomeRows, incomeColumns, "Actual Amount");
  const expenseBudgeted = getTotal(expenseRows, expenseColumns, "Budgeted Amount");
  const expenseActual = getTotal(expenseRows, expenseColumns, "Actual Amount");

  const netBudgeted = incomeBudgeted - expenseBudgeted;
  const netActual = incomeActual - expenseActual;
  const netVariance = netActual - netBudgeted;

  const updateColumnName = (columns, setColumns, colId, value) => {
    const newColumns = columns.map((col) =>
      col.id === colId ? { ...col, name: value } : col
    );
    setColumns(newColumns);
  };

  const addColumn = (columns, setColumns, rows, setRows) => {
    const newColumn = { id: uuidv4(), name: `Column ${columns.length + 1}` };
    setColumns([...columns, newColumn]);
    setRows(rows.map((row) => ({ ...row, [newColumn.id]: "" })));
  };

  const removeColumn = (columns, setColumns, rows, setRows) => {
    if (columns.length === 0) return;
    const colToRemove = columns[columns.length - 1];
    const newColumns = columns.slice(0, -1);
    setColumns(newColumns);
    setRows(
      rows.map((row) => {
        const { [colToRemove.id]: removed, ...newRow } = row;
        return newRow;
      })
    );
  };

  const updateCell = (rows, setRows, rowIndex, colId, value) => {
    const newRows = [...rows];
    newRows[rowIndex][colId] = value;
    setRows(newRows);
  };

  const addRow = (createEmptyRow, rows, setRows) => {
    setRows([...rows, createEmptyRow()]);
  };

  const removeRow = (rows, setRows) => {
    if (rows.length === 0) return;
    setRows(rows.slice(0, -1));
  };

  return (
    <div className="bg-gray-900 text-white max-w-2xl mx-auto p-8 rounded-lg space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <span className="font-semibold">Prepared By: </span>Sher Singh
        </div>
        <div>
          <span className="font-semibold">Date: </span>27 Feb 2025
        </div>
      </div>
      <section>
        <h2 className="text-2xl font-bold mb-4">Expenses</h2>
        <div className="flex space-x-2 mb-2">
          <button
            onClick={() => addColumn(expenseColumns, setExpenseColumns, expenseRows, setExpenseRows)}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >Add Column</button>
          <button
            onClick={() => removeColumn(expenseColumns, setExpenseColumns, expenseRows, setExpenseRows)}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >Remove Column</button>
        </div>
        <div className="overflow-auto">
          <table className="w-full border border-gray-700 text-sm">
            <thead className="bg-gray-800">
              <tr>
                {expenseColumns.map((col) => (
                  <th key={col.id} className="p-2 border-b border-gray-700">
                    <input
                      type="text"
                      value={col.name}
                      onChange={(e) => updateColumnName(expenseColumns, setExpenseColumns, col.id, e.target.value)}
                      className="bg-gray-800 text-white border border-gray-700 p-1 w-full"
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {expenseRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {expenseColumns.map((col) => (
                    <td key={col.id} className="p-2 border-b border-gray-700">
                      <input
                        type="text"
                        value={row[col.id] || ""}
                        onChange={(e) => updateCell(expenseRows, setExpenseRows, rowIndex, col.id, e.target.value)}
                        className="bg-gray-900 text-white border border-gray-700 p-1 w-full"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex space-x-2 mt-2">
          <button onClick={() => addRow(createExpenseEmptyRow, expenseRows, setExpenseRows)} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Add Expense Row</button>
          <button onClick={() => removeRow(expenseRows, setExpenseRows)} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">Remove Expense Row</button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Income</h2>
        <div className="flex space-x-2 mb-2">
          <button onClick={() => addColumn(incomeColumns, setIncomeColumns, incomeRows, setIncomeRows)} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">Add Column</button>
          <button onClick={() => removeColumn(incomeColumns, setIncomeColumns, incomeRows, setIncomeRows)} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">Remove Column</button>
        </div>
        <div className="overflow-auto">
          <table className="w-full border border-gray-700 text-sm">
            <thead className="bg-gray-800">
              <tr>
                {incomeColumns.map((col) => (
                  <th key={col.id} className="p-2 border-b border-gray-700">
                    <input
                      type="text"
                      value={col.name}
                      onChange={(e) => updateColumnName(incomeColumns, setIncomeColumns, col.id, e.target.value)}
                      className="bg-gray-800 text-white border border-gray-700 p-1 w-full"
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {incomeRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {incomeColumns.map((col) => (
                    <td key={col.id} className="p-2 border-b border-gray-700">
                      <input
                        type="text"
                        value={row[col.id] || ""}
                        onChange={(e) => updateCell(incomeRows, setIncomeRows, rowIndex, col.id, e.target.value)}
                        className="bg-gray-900 text-white border border-gray-700 p-1 w-full"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex space-x-2 mt-2">
          <button onClick={() => addRow(createIncomeEmptyRow, incomeRows, setIncomeRows)} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Add Income Row</button>
          <button onClick={() => removeRow(incomeRows, setIncomeRows)} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">Remove Income Row</button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Summary</h2>
        <div className="overflow-auto">
          <div className="flex justify-between items-center mb-8">
            <div><span className="font-semibold">Prepared By: </span>Sher Singh</div>
            <div><span className="font-semibold">Date: </span>27 Feb 2025</div>
          </div>
          <table className="w-full border border-gray-700 text-sm">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-2 border-b border-gray-700">Summary Item</th>
                <th className="p-2 border-b border-gray-700">Budgeted</th>
                <th className="p-2 border-b border-gray-700">Actual</th>
                <th className="p-2 border-b border-gray-700">Variance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-b border-gray-700">Total Income</td>
                <td className="p-2 border-b border-gray-700">{incomeBudgeted.toFixed(2)}</td>
                <td className="p-2 border-b border-gray-700">{incomeActual.toFixed(2)}</td>
                <td className="p-2 border-b border-gray-700">{(incomeActual - incomeBudgeted).toFixed(2)}</td>
              </tr>
              <tr>
                <td className="p-2 border-b border-gray-700">Total Expenses</td>
                <td className="p-2 border-b border-gray-700">{expenseBudgeted.toFixed(2)}</td>
                <td className="p-2 border-b border-gray-700">{expenseActual.toFixed(2)}</td>
                <td className="p-2 border-b border-gray-700">{(expenseActual - expenseBudgeted).toFixed(2)}</td>
              </tr>
              <tr className="font-bold text-green-400">
                <td className="p-2 border-b border-gray-700">Net Balance</td>
                <td className="p-2 border-b border-gray-700">{netBudgeted.toFixed(2)}</td>
                <td className="p-2 border-b border-gray-700">{netActual.toFixed(2)}</td>
                <td className="p-2 border-b border-gray-700">{netVariance.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}