import React from 'react';
import {ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar} from "recharts";

import {BUG_KEYS, months, QUANTITY} from "../../constants/bugKeys";
import {TableWithSearch} from "../tableWithSearch";
import {Select} from "../ui/select";

import "./style.scss";

export class Graph extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            monthArray: [],
            monthArrayWithIndex: [],
            arrayForGraphRead: [],
            arrayForGraphRender: [],
            monthFrom: "",
            monthTo: "",
            systemTypes: [],
            criticalTypes: [],
            system: "",
            critical: "",
            keysBugs: [],
            search: {
                [BUG_KEYS.ID]: "",
                [BUG_KEYS.SYSTEM]: "",
                [BUG_KEYS.SUMMARY]: "",
                [BUG_KEYS.STATE]: "",
                [BUG_KEYS.FOUND_AT]: "",
                [BUG_KEYS.CRITICALITY]: "",
                [BUG_KEYS.DEFECT_TYPE]: "",
                [BUG_KEYS.DATE_OF_CREATION]: "",
                [BUG_KEYS.DATE_OF_CHANGE]: "",
                [BUG_KEYS.CLOSING_DATE]: "",
                [BUG_KEYS.DETECTION_METHOD]: "",
                [BUG_KEYS.REOPENS_AMOUNT]: "",
            },
        };
        this.intervalObj = {};
    }

    // запускаем bugsBuilding для преобразования входящего JSON (запускается один раз при монтировании)
    // так же bugsBuilding можно вызвать с новыми this.props.bugs в componentDidUpdate()
    componentDidMount() {
        const {bugs} = this.props;

        this.setState({
            ...this.bugsBuilding(bugs),
        });
    };

    // начальное преобразование JSON данных в объект для первоначального рендера графика
    bugsBuilding = (bugs = []) => {
        const {intervalObj} = this;
        const monthArray = [];
        const monthArrayWithIndex = [];
        const arrayForGraph = [];
        const systemTypes = [];
        const criticalTypes = [];
        const keysBugs = Array.isArray(bugs) && bugs.length && Object.keys(bugs[0]);

        Array.isArray(bugs) && bugs.sort((a, b) => new Date(a[BUG_KEYS.DATE_OF_CREATION]) - new Date(b[BUG_KEYS.DATE_OF_CREATION])).forEach((bug, index) => {
            const date = new Date(bug[BUG_KEYS.DATE_OF_CREATION]);
            const month = date.getMonth();
            const year = date.getFullYear();
            const monthAndYear = `${months[month]} ${year}`;
            const system = bug[BUG_KEYS.SYSTEM];
            const critical = bug[BUG_KEYS.CRITICALITY];

            if (!systemTypes.includes(system)) {
                systemTypes.push(system);
            }

            if (!criticalTypes.includes(critical)) {
                criticalTypes.push(critical);
            }

            if (!monthArray.includes(monthAndYear)) {
                monthArray.push(monthAndYear);
                monthArrayWithIndex.push(`${index}_${monthAndYear}`);

                const getIndex = monthArray.indexOf(monthAndYear);
                const getKeyWithIndex = monthArrayWithIndex[getIndex];

                intervalObj[getKeyWithIndex] = {
                    name: monthAndYear,
                    length: 0,
                    bugs: [],
                };
            }

            const getIndex = monthArray.indexOf(monthAndYear);
            const getKeyWithIndex = monthArrayWithIndex[getIndex];

            intervalObj[getKeyWithIndex].bugs.push(bug);
            intervalObj[getKeyWithIndex].length = intervalObj[getKeyWithIndex].bugs.length;
        });

        for (let key in intervalObj) {
            arrayForGraph.push({
                name: intervalObj[key].name,
                [QUANTITY]: intervalObj[key].length,
                bugs: intervalObj[key].bugs,
            })
        }

        return {
            monthArray,
            monthArrayWithIndex,
            arrayForGraphRead: arrayForGraph,
            arrayForGraphRender: arrayForGraph,
            systemTypes,
            criticalTypes,
            monthFrom: monthArray[0],
            monthTo: monthArray[monthArray.length - 1],
            keysBugs,
        };
    };

    // преобразование количества найденных дефектов на основе выбранной системы/критичности дефектов
    // данная фукнция срабатывает только на клик выбора системы/критичности
    bugsRebuilding = () => {
        const {intervalObj} = this;
        const {monthFrom, monthTo, monthArray, system, critical} = this.state;
        const getIndexMonthFrom = monthArray.indexOf(monthFrom);
        const getIndexMonthTo = monthArray.indexOf(monthTo);
        const arrayForGraphRender = [];

        for (let key in intervalObj) {
            const getMonthIndexOfIntervalObj = monthArray.indexOf(intervalObj[key].name);

            if (getMonthIndexOfIntervalObj >= getIndexMonthFrom && getMonthIndexOfIntervalObj <= getIndexMonthTo) {
                let filterBugs = [];

                if (system && critical) {
                    filterBugs = intervalObj[key].bugs.filter(bug => bug[BUG_KEYS.SYSTEM] === system && bug[BUG_KEYS.CRITICALITY] === critical);
                } else if (system && !critical) {
                    filterBugs = intervalObj[key].bugs.filter(bug => bug[BUG_KEYS.SYSTEM] === system);
                } else if (!system && critical) {
                    filterBugs = intervalObj[key].bugs.filter(bug => bug[BUG_KEYS.CRITICALITY] === critical);
                } else {
                    filterBugs = intervalObj[key].bugs.filter(bug => bug);
                }

                arrayForGraphRender.push({
                    name: intervalObj[key].name,
                    [QUANTITY]: filterBugs.length,
                    bugs: filterBugs,
                })
            }
        }

        this.setState({
            arrayForGraphRender,
        });
    };

    // срабатывает в момент корректировки интервала ОТ и ДО
    // метод не запускает не bugsBuilding, не bugsRebuilding, а просто преобразует массив arrayForGraphRender
    changeInterval = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value,
        }, () => {
            const {arrayForGraphRead, monthFrom, monthTo, monthArray} = this.state;
            const getIndexFrom = monthArray.indexOf(monthFrom);
            const getIndexTo = monthArray.indexOf(monthTo);

            if (getIndexTo >= getIndexFrom) {
                const arrayForGraphRender = arrayForGraphRead.slice(getIndexFrom, getIndexTo + 1);

                arrayForGraphRender && this.setState({
                    arrayForGraphRender,
                });
            }
        });
    };

    // обработчик события выбора системы/критичности с вызовом callback функции bugsRebuilding
    changeSystemOrCritical = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value,
        }, () => {
            this.bugsRebuilding();
        });
    };

    // обработчик поиска по колонкам
    searchBug = (e) => {
        const {name, value} = e.target;
        const {search} = this.state;

        this.setState({
            search: {
                ...search,
                [name]: value,
            },
        });
    };

    // валидация поиска в таблице по введённым значениям
    tableSearchValidate = (bug) => {
        const {ID, SYSTEM, SUMMARY, STATE, FOUND_AT, CRITICALITY, DEFECT_TYPE, DATE_OF_CREATION, DATE_OF_CHANGE, CLOSING_DATE, DETECTION_METHOD, REOPENS_AMOUNT} = BUG_KEYS;
        const {search} = this.state;

        if (bug[ID].toString().includes(search[ID]) &&
            bug[SYSTEM].includes(search[SYSTEM]) &&
            bug[SUMMARY].includes(search[SUMMARY]) &&
            bug[STATE].includes(search[STATE]) &&
            bug[FOUND_AT].includes(search[FOUND_AT]) &&
            bug[CRITICALITY].includes(search[CRITICALITY]) &&
            bug[DEFECT_TYPE].includes(search[DEFECT_TYPE]) &&
            (!bug[DATE_OF_CREATION] || (bug[DATE_OF_CREATION] && bug[DATE_OF_CREATION].includes(search[DATE_OF_CREATION]))) &&
            (!bug[DATE_OF_CHANGE] || (bug[DATE_OF_CHANGE] && bug[DATE_OF_CHANGE].includes(search[DATE_OF_CHANGE]))) &&
            (!bug[CLOSING_DATE] || (bug[CLOSING_DATE] && bug[CLOSING_DATE].includes(search[CLOSING_DATE]))) &&
            (!bug[DETECTION_METHOD] || (bug[DETECTION_METHOD] && bug[DETECTION_METHOD].includes(search[DETECTION_METHOD]))) &&
            (!bug[REOPENS_AMOUNT] || (bug[REOPENS_AMOUNT] && bug[REOPENS_AMOUNT].includes(search[REOPENS_AMOUNT])))) {
            return true;
        }
    };

    render() {
        const {arrayForGraphRender, monthArray, monthFrom, monthTo, systemTypes, criticalTypes, system, critical, keysBugs} = this.state;

        return (
            <>
                <div className="statistics">
                    <div className="statistics__graph">
                        <ComposedChart width={800} height={400} data={arrayForGraphRender}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Bar dataKey={`${QUANTITY}`} barSize={20} fill="#413ea0" />
                        </ComposedChart>
                    </div>

                    <div className="settings">
                        <div className="settings__placeholder">Настройка периода статистики</div>

                        <Select
                            placeholder="Выбрать месяц ОТ:"
                            name="monthFrom"
                            value={monthFrom}
                            onChange={this.changeInterval}
                            optionValues={monthArray}
                        />

                        <Select
                            placeholder="Выбрать месяц ДО:"
                            name="monthTo"
                            value={monthTo}
                            onChange={this.changeInterval}
                            optionValues={monthArray}
                        />

                        <Select
                            placeholder="Выбрать систему:"
                            name="system"
                            value={system}
                            onChange={this.changeSystemOrCritical}
                            optionValues={systemTypes}
                            renderWithEmptyOption
                        />

                        <Select
                            placeholder="Выбрать критичность:"
                            name="critical"
                            value={critical}
                            onChange={this.changeSystemOrCritical}
                            optionValues={criticalTypes}
                            renderWithEmptyOption
                        />

                    </div>
                </div>

                <TableWithSearch
                    keysBugs={keysBugs}
                    searchBug={this.searchBug}
                    arrayData={arrayForGraphRender}
                    tableSearchValidate={this.tableSearchValidate}
                    className="statistics"
                />

            </>

        )
    };

}