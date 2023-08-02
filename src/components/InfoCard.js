import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';

function InfoCard({ heading, fields }) {
  return (
    <Card className="Page-form" elevation={Elevation.TWO}>
      <h3>{heading}</h3>
      <div className="fields">
        {fields.map((field, i) => (
          <div className="Field-set" key={i}>
            <div className="title">{field.title}</div>
            <div className="value">{field.value}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default InfoCard;
