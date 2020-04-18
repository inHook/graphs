import React from 'react';

import "./style.scss";

export const Select = ({placeholder, value, name, onChange, optionValues, renderWithEmptyOption}) => (
    <div className="select-custom">
        <div>{placeholder}</div>
        <select className="select-custom__select" value={value} name={name} onChange={e => onChange(e)}>
            {renderWithEmptyOption && (
                <option value="" />
            )}
            {optionValues.length && optionValues.map(value => (
                <option key={value} value={value}>{value}</option>
            ))}
        </select>
    </div>
);