import { bugsBuilding } from "../helpers/bugsBuilding";
import { BUG_KEYS } from "../constants/bugKeys";

describe("BugsBuilding function test:", () => {
  let array, emptyArray;
  const {
    ID,
    SYSTEM,
    SUMMARY,
    STATE,
    FOUND_AT,
    CRITICALITY,
    DEFECT_TYPE,
    DATE_OF_CREATION,
    DATE_OF_CHANGE,
    CLOSING_DATE,
    DETECTION_METHOD,
    REOPENS_AMOUNT,
  } = BUG_KEYS;

  beforeEach(() => {
    array = [
      {
        [ID]: 102,
        [SYSTEM]: "System2",
        [SUMMARY]: "just text",
        [STATE]: "Закрыт",
        [FOUND_AT]: "SystemTest",
        [CRITICALITY]: "Низкий",
        [DEFECT_TYPE]: "ПО",
        [DATE_OF_CREATION]: "2015-03-17 00:00:00.0000000",
        [DATE_OF_CHANGE]: "2017-01-12 19:56:14.0000000",
        [CLOSING_DATE]: "2015-04-22 00:00:00.0000000",
        [DETECTION_METHOD]: "Не назначен",
        [REOPENS_AMOUNT]: null,
      },
      {
        [ID]: 103,
        [SYSTEM]: "System2",
        [SUMMARY]: "just text",
        [STATE]: "Закрыт",
        [FOUND_AT]: "SystemTest",
        [CRITICALITY]: "Низкий",
        [DEFECT_TYPE]: "ПО",
        [DATE_OF_CREATION]: "2015-03-18 00:00:00.0000000",
        [DATE_OF_CHANGE]: "2016-03-25 16:32:31.0000000",
        [CLOSING_DATE]: "2016-03-25 00:00:00.0000000",
        [DETECTION_METHOD]: "Не назначен",
        [REOPENS_AMOUNT]: null,
      },
    ];
    emptyArray = [];
  });

  test("should return correct data", () => {
    const results = {
      data: {
        monthArray: ["Март 2015"],
        monthArrayWithIndex: ["0_Март 2015"],
        arrayForGraphRead: [
          {
            name: "Март 2015",
            "Количество зарегистрированных дефектов": 2,
            bugs: [
              {
                [ID]: 102,
                [SYSTEM]: "System2",
                [SUMMARY]: "just text",
                [STATE]: "Закрыт",
                [FOUND_AT]: "SystemTest",
                [CRITICALITY]: "Низкий",
                [DEFECT_TYPE]: "ПО",
                [DATE_OF_CREATION]: "2015-03-17 00:00:00.0000000",
                [DATE_OF_CHANGE]: "2017-01-12 19:56:14.0000000",
                [CLOSING_DATE]: "2015-04-22 00:00:00.0000000",
                [DETECTION_METHOD]: "Не назначен",
                [REOPENS_AMOUNT]: null,
              },
              {
                [ID]: 103,
                [SYSTEM]: "System2",
                [SUMMARY]: "just text",
                [STATE]: "Закрыт",
                [FOUND_AT]: "SystemTest",
                [CRITICALITY]: "Низкий",
                [DEFECT_TYPE]: "ПО",
                [DATE_OF_CREATION]: "2015-03-18 00:00:00.0000000",
                [DATE_OF_CHANGE]: "2016-03-25 16:32:31.0000000",
                [CLOSING_DATE]: "2016-03-25 00:00:00.0000000",
                [DETECTION_METHOD]: "Не назначен",
                [REOPENS_AMOUNT]: null,
              },
            ],
          },
        ],
        arrayForGraphRender: [
          {
            name: "Март 2015",
            "Количество зарегистрированных дефектов": 2,
            bugs: [
              {
                [ID]: 102,
                [SYSTEM]: "System2",
                [SUMMARY]: "just text",
                [STATE]: "Закрыт",
                [FOUND_AT]: "SystemTest",
                [CRITICALITY]: "Низкий",
                [DEFECT_TYPE]: "ПО",
                [DATE_OF_CREATION]: "2015-03-17 00:00:00.0000000",
                [DATE_OF_CHANGE]: "2017-01-12 19:56:14.0000000",
                [CLOSING_DATE]: "2015-04-22 00:00:00.0000000",
                [DETECTION_METHOD]: "Не назначен",
                [REOPENS_AMOUNT]: null,
              },
              {
                [ID]: 103,
                [SYSTEM]: "System2",
                [SUMMARY]: "just text",
                [STATE]: "Закрыт",
                [FOUND_AT]: "SystemTest",
                [CRITICALITY]: "Низкий",
                [DEFECT_TYPE]: "ПО",
                [DATE_OF_CREATION]: "2015-03-18 00:00:00.0000000",
                [DATE_OF_CHANGE]: "2016-03-25 16:32:31.0000000",
                [CLOSING_DATE]: "2016-03-25 00:00:00.0000000",
                [DETECTION_METHOD]: "Не назначен",
                [REOPENS_AMOUNT]: null,
              },
            ],
          },
        ],
        systemTypes: ["System2"],
        criticalTypes: ["Низкий"],
        monthFrom: "Март 2015",
        monthTo: "Март 2015",
        keysBugs: [
          "ID",
          "System",
          "Summary",
          "Состояние",
          "Найдено при",
          "Критичность",
          "Тип Дефекта",
          "Дата создания",
          "Дата изменения",
          "Дата закрытия",
          "Метод обнаружения",
          "reopens_amount",
        ],
      },
      intervalObj: {
        "0_Март 2015": {
          name: "Март 2015",
          length: 2,
          bugs: [
            {
              [ID]: 102,
              [SYSTEM]: "System2",
              [SUMMARY]: "just text",
              [STATE]: "Закрыт",
              [FOUND_AT]: "SystemTest",
              [CRITICALITY]: "Низкий",
              [DEFECT_TYPE]: "ПО",
              [DATE_OF_CREATION]: "2015-03-17 00:00:00.0000000",
              [DATE_OF_CHANGE]: "2017-01-12 19:56:14.0000000",
              [CLOSING_DATE]: "2015-04-22 00:00:00.0000000",
              [DETECTION_METHOD]: "Не назначен",
              [REOPENS_AMOUNT]: null,
            },
            {
              [ID]: 103,
              [SYSTEM]: "System2",
              [SUMMARY]: "just text",
              [STATE]: "Закрыт",
              [FOUND_AT]: "SystemTest",
              [CRITICALITY]: "Низкий",
              [DEFECT_TYPE]: "ПО",
              [DATE_OF_CREATION]: "2015-03-18 00:00:00.0000000",
              [DATE_OF_CHANGE]: "2016-03-25 16:32:31.0000000",
              [CLOSING_DATE]: "2016-03-25 00:00:00.0000000",
              [DETECTION_METHOD]: "Не назначен",
              [REOPENS_AMOUNT]: null,
            },
          ],
        },
      },
    };
    const resultOfEmptyArray = {
      data: {
        monthArray: [],
        monthArrayWithIndex: [],
        arrayForGraphRead: [],
        arrayForGraphRender: [],
        systemTypes: [],
        criticalTypes: [],
        keysBugs: 0,
      },
      intervalObj: {},
    };

    expect(bugsBuilding(array)).toEqual(results);
    expect(bugsBuilding(emptyArray)).toEqual(resultOfEmptyArray);
  });
});
