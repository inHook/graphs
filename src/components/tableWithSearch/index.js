import React from 'react';

import {BUG_KEYS} from "../../constants/bugKeys";

import "./style.scss";

export const TableWithSearch = ({keysBugs, searchBug, arrayData, tableSearchValidate, searchValues, className}) => (
    <div className={`ui-table-search ${className}__table-wrapper`}>
        <table className={`${className}__table`}>
            <thead>
            <tr>
                {keysBugs.map(key => (
                    <td className={`${className}__table__thead-cell`} key={key}>
                        <div className={`${className}__table__thead-key`}>{key}</div>
                        <input
                            className={`${className}__table__thead-search`}
                            type="text"
                            name={key}
                            onChange={e => searchBug(e)}
                        />
                    </td>
                ))}
            </tr>
            </thead>

            <tbody>
            {arrayData.map(bug => bug.bugs.map(bug => {
                const {ID} = BUG_KEYS;

                if (tableSearchValidate(bug, searchValues)) {
                    return (
                        <tr key={bug[ID]}>
                            {keysBugs.map(key => (
                                <td key={key}>{bug[key]}</td>
                            ))}
                        </tr>
                    );
                }

                return null;
            }))}
            </tbody>
        </table>
    </div>
);