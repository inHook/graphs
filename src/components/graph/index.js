import React from 'react';
import {ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar} from "recharts";

import {bugsBuilding} from "../../helpers/bugsBuilding";
import {tableSearchValidate} from "../../helpers/tableValidate";
import {BUG_KEYS, QUANTITY} from "../../constants/bugKeys";
import {TableWithSearch} from "../tableWithSearch";
import {Select} from "../ui/select";
import {Loader} from "../ui/loader";

import "./style.scss";

export class Graph extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loader: true,
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
            searchValues: {
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
        const {data, intervalObj} = bugsBuilding(bugs);

        this.intervalObj = intervalObj;

        setTimeout(() => {
            this.setState({
                ...data,
                loader: false,
            });
        }, 0);
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
            loader: false,
        });
    };

    // срабатывает в момент корректировки интервала ОТ и ДО
    // метод не запускает не bugsBuilding, не bugsRebuilding, а просто преобразует массив arrayForGraphRender
    changeInterval = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value,
            loader: true,
        }, () => {
            setTimeout(() => {
                const {arrayForGraphRead, monthFrom, monthTo, monthArray} = this.state;
                const getIndexFrom = monthArray.indexOf(monthFrom);
                const getIndexTo = monthArray.indexOf(monthTo);

                if (getIndexTo >= getIndexFrom) {
                    const arrayForGraphRender = arrayForGraphRead.slice(getIndexFrom, getIndexTo + 1);

                    arrayForGraphRender && this.setState({
                        arrayForGraphRender,
                        loader: false,
                    });
                } else {
                    this.setState({
                        loader: false,
                    })
                }
            }, 0);
        });
    };

    // обработчик события выбора системы/критичности с вызовом callback функции bugsRebuilding
    changeSystemOrCritical = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value,
            loader: true,
        }, () => {
            setTimeout(() => {
                this.bugsRebuilding();
            }, 0);
        });
    };

    // обработчик поиска по колонкам
    searchBug = (e) => {
        const {name, value} = e.target;
        const {searchValues} = this.state;

        this.setState({
            searchValues: {
                ...searchValues,
                [name]: value,
            },
        });
    };

    render() {
        const {arrayForGraphRender, monthArray, monthFrom, monthTo, systemTypes, criticalTypes, system, critical, keysBugs, searchValues, loader} = this.state;

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

                {loader ? (
                    <div className="statistics__header">
                        <h1>Построение графика</h1>
                        <Loader />
                    </div>
                ) : (
                    <TableWithSearch
                        keysBugs={keysBugs}
                        searchBug={this.searchBug}
                        arrayData={arrayForGraphRender}
                        tableSearchValidate={tableSearchValidate}
                        searchValues={searchValues}
                        className="statistics"
                    />
                )}
            </>
        )
    };
}