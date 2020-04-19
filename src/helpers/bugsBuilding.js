import {BUG_KEYS, months, QUANTITY} from "../constants/bugKeys";

// начальное преобразование JSON данных в объект для первоначального рендера графика
export const bugsBuilding = (bugs = []) => {
    const intervalObj = {};
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
        data: {
            monthArray,
            monthArrayWithIndex,
            arrayForGraphRead: arrayForGraph,
            arrayForGraphRender: arrayForGraph,
            systemTypes,
            criticalTypes,
            monthFrom: monthArray[0],
            monthTo: monthArray[monthArray.length - 1],
            keysBugs,
        },
        intervalObj,
    };
};