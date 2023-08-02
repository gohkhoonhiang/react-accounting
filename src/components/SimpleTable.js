import React from 'react';
import { Button } from '@blueprintjs/core';
import './SimpleTable.css';

function SimpleTable({ headers, rows, rowActions }) {
  return (
    <div className="Simple-table">
      <div className="row row-heading">
        {headers.map((header, i) => (
          <div className="col" key={i}>
            {header.label}
          </div>
        ))}
        {rowActions.length > 0 ? <div className="col">Actions</div> : <></>}
      </div>
      {rows.length > 0 ? (
        rows.map((row, i) => (
          <div className="row" key={i}>
            {headers.map((header, j) => (
              <div className="col" key={j}>
                {row[header.key]}
              </div>
            ))}
            {rowActions.length > 0 ? (
              <div className="col">
                {rowActions.map((action, j) => (
                  <Button
                    small={true}
                    icon={action.icon}
                    onClick={(e) => action.click(e, row, i)}
                    key={j}></Button>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
        ))
      ) : (
        <div className="row row-no-data">
          <div className="col">No data.</div>
        </div>
      )}
    </div>
  );
}

export default SimpleTable;
