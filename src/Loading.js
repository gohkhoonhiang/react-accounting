import React from 'react';
import { Spinner } from '@blueprintjs/core';

function Loading() {
  return (
    <div className="loading">
      <Spinner aria-label="Loading..." size="100" />
    </div>
  );
}

export default Loading;
