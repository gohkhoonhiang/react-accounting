import React, { useState } from 'react';
import { Button, Collapse } from '@blueprintjs/core';
import Paginator from './Paginator';
import './CollapseTable.css';

function CollapseTable({
  headers,
  rows,
  rowActions,
  expandedField,
  pagination,
  onPageLeft,
  onPageRight
}) {
  const [expandedRows, setExpandedRows] = useState({});

  function toggleRow(e, index) {
    e.preventDefault();

    setExpandedRows((prev) => {
      const updated = { ...prev };
      if (prev[index]) {
        delete updated[index];
      } else {
        updated[index] = true;
      }

      return updated;
    });
  }

  function rowExpanded(index) {
    return expandedRows[index];
  }

  return (
    <div className="Collapse-table">
      <div className="row row-heading">
        <div className="col"></div>
        {headers.map((header, i) => (
          <div className="col" key={i}>
            {header.label}
          </div>
        ))}
        {rowActions.length > 0 ? <div className="col">Actions</div> : <></>}
      </div>
      {rows.length > 0 ? (
        rows.map((row, j) => (
          <div key={j}>
            <div className="row">
              <div className="col">
                {rowExpanded(j) ? (
                  <Button small={true} icon="chevron-up" onClick={(e) => toggleRow(e, j)}></Button>
                ) : (
                  <Button
                    small={true}
                    icon="chevron-down"
                    onClick={(e) => toggleRow(e, j)}></Button>
                )}
              </div>
              {headers.map((header, k) => (
                <div className="col" key={k}>
                  {header.formatter ? header.formatter(row[header.key]) : row[header.key]}
                </div>
              ))}
              {rowActions.length > 0 ? (
                <div className="col">
                  {rowActions.map((action, l) => (
                    <Button
                      small={true}
                      icon={action.icon}
                      onClick={(e) => action.click(e, row, j)}
                      key={l}></Button>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="row row-full">
              <div className="col col-full">
                <Collapse isOpen={rowExpanded(j)}>{row[expandedField]}</Collapse>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="row row-no-data">
          <div className="col">No data.</div>
        </div>
      )}
      {pagination ? (
        <div className="row row-footer">
          <Paginator
            offset={pagination.offset}
            limit={pagination.limit}
            total={pagination.total}
            onPageLeft={onPageLeft}
            onPageRight={onPageRight}></Paginator>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CollapseTable;
