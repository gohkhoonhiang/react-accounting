import React from 'react';
import { Button } from '@blueprintjs/core';
import './Paginator.css';

function Paginator({ offset, limit, total, onPageLeft, onPageRight }) {
  const startCount = Math.min(Math.max(offset + 1, 0), total);
  const endCount = Math.min(offset + limit, total);

  const pageLeftDisabled = startCount < limit;
  const pageRightDisabled = endCount === total;

  return (
    <div className="Paginator">
      <div className="page-numbers">
        <div className="start-count">{startCount}</div>
        <div>-</div>
        <div className="end-count">{endCount}</div>
        <div>of</div>
        <div className="total-count">{total}</div>
      </div>

      <div className="pagers">
        <div className="pager pager-left">
          <Button
            small={true}
            icon="chevron-left"
            disabled={pageLeftDisabled}
            onClick={onPageLeft}></Button>
        </div>
        <div className="pager pager-right">
          <Button
            small={true}
            icon="chevron-right"
            disabled={pageRightDisabled}
            onClick={onPageRight}></Button>
        </div>
      </div>
    </div>
  );
}

export default Paginator;
