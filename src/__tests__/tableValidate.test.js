import { tableSearchValidate } from "../helpers/tableValidate";
import { BUG_KEYS } from "../constants/bugKeys";

describe("Table search validate function test", () => {
  let bug, searchValues;
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

  test("Should return TRUE with empty search values", () => {
    bug = {
      [ID]: 5917,
      [SUMMARY]: "just text",
      [SYSTEM]: "System1",
      [DATE_OF_CREATION]: "2017-08-31 00:00:00.0000000",
      [DATE_OF_CHANGE]: "2017-08-31 19:32:18.0000000",
      [CLOSING_DATE]: null,
      [CRITICALITY]: "Высокий",
      [DETECTION_METHOD]: "Регрессионное тестирование",
      [FOUND_AT]: "IntegrationTest",
      [STATE]: "Открыт",
      [DEFECT_TYPE]: "ПО",
      [REOPENS_AMOUNT]: "0",
    };

    searchValues = {
      [ID]: "",
      [SUMMARY]: "",
      [SYSTEM]: "",
      [DATE_OF_CREATION]: "",
      [DATE_OF_CHANGE]: "",
      [CLOSING_DATE]: "",
      [CRITICALITY]: "",
      [DETECTION_METHOD]: "",
      [FOUND_AT]: "",
      [STATE]: "",
      [DEFECT_TYPE]: "",
      [REOPENS_AMOUNT]: "",
    };

    expect(tableSearchValidate(bug, searchValues)).toBe(true);
  });

  test("Should return UNDEFINED with search values", () => {
    bug = {
      [ID]: 5917,
      [SUMMARY]: "just text",
      [SYSTEM]: "System1",
      [DATE_OF_CREATION]: "2017-08-31 00:00:00.0000000",
      [DATE_OF_CHANGE]: "2017-08-31 19:32:18.0000000",
      [CLOSING_DATE]: null,
      [CRITICALITY]: "Высокий",
      [DETECTION_METHOD]: "Регрессионное тестирование",
      [FOUND_AT]: "IntegrationTest",
      [STATE]: "Открыт",
      [DEFECT_TYPE]: "ПО",
      [REOPENS_AMOUNT]: "0",
    };

    searchValues = {
      [ID]: "",
      [SUMMARY]: "just text",
      [SYSTEM]: "System1",
      [DATE_OF_CREATION]: "2012",
      [DATE_OF_CHANGE]: "2015",
      [CLOSING_DATE]: "2013",
      [CRITICALITY]: "Средний",
      [DETECTION_METHOD]: "Не назначен",
      [FOUND_AT]: "UAT",
      [STATE]: "Закрыт",
      [DEFECT_TYPE]: "ПО",
      [REOPENS_AMOUNT]: "",
    };

    expect(tableSearchValidate(bug, searchValues)).toBe(undefined);
  });
});
