import { BUG_KEYS } from "../constants/bugKeys";

// валидация поиска в таблице по введённым значениям
export const tableSearchValidate = (bug, searchValues) => {
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

  if (
    bug[ID].toString().includes(searchValues[ID]) &&
    bug[SYSTEM].includes(searchValues[SYSTEM]) &&
    bug[SUMMARY].includes(searchValues[SUMMARY]) &&
    bug[STATE].includes(searchValues[STATE]) &&
    bug[FOUND_AT].includes(searchValues[FOUND_AT]) &&
    bug[CRITICALITY].includes(searchValues[CRITICALITY]) &&
    bug[DEFECT_TYPE].includes(searchValues[DEFECT_TYPE]) &&
    (!bug[DATE_OF_CREATION] ||
      (bug[DATE_OF_CREATION] &&
        bug[DATE_OF_CREATION].includes(searchValues[DATE_OF_CREATION]))) &&
    (!bug[DATE_OF_CHANGE] ||
      (bug[DATE_OF_CHANGE] &&
        bug[DATE_OF_CHANGE].includes(searchValues[DATE_OF_CHANGE]))) &&
    (!bug[CLOSING_DATE] ||
      (bug[CLOSING_DATE] &&
        bug[CLOSING_DATE].includes(searchValues[CLOSING_DATE]))) &&
    (!bug[DETECTION_METHOD] ||
      (bug[DETECTION_METHOD] &&
        bug[DETECTION_METHOD].includes(searchValues[DETECTION_METHOD]))) &&
    (!bug[REOPENS_AMOUNT] ||
      (bug[REOPENS_AMOUNT] &&
        bug[REOPENS_AMOUNT].includes(searchValues[REOPENS_AMOUNT])))
  ) {
    return true;
  }
};
