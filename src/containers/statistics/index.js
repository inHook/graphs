import React from 'react';

import {Graph} from "../../components/graph";
import bugs from "../../bugs";

export const Statistics = () => (
    <div className="statistics-container">
        <Graph bugs={bugs} />
    </div>
);