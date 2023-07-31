import React from 'react';
import { MenuItem } from '@blueprintjs/core';

const filterItem = (query, item, _index, exactMatch) => {
  const normalizedLabel = item.label.toLowerCase();
  const normalizedValue = item.value.toLowerCase();
  const normalizedQuery = query.toLowerCase();
  const queryRegex = new RegExp(normalizedQuery, 'i');

  if (exactMatch) {
    return normalizedLabel === normalizedQuery;
  } else {
    return normalizedLabel.match(queryRegex) || normalizedValue.match(queryRegex);
  }
};

const renderItem = (item, { handleClick, handleFocus, modifiers }) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      key={item.value}
      label={item.label}
      onClick={handleClick}
      onFocus={handleFocus}
      roleStructure="listoption"
      text={item.label}
    />
  );
};

export { filterItem, renderItem };
