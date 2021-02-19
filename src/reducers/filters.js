import moment from 'moment';

// Filters Reducer
const filtersReducerDefaultState = {
  text: '',
  dueDateItem: 'pme', // pme or vtc
  sortBy: 'pmeDueDate', // name or employeeId or pmeDueDate or vtcDueDate
  unit: 'BCCL-3-NAKC', // Setting the unit for filtering employees data on basis of unit,BCCL-3-NAKC is default one
  startDate: moment().subtract(10, 'years'),
  endDate: moment(),
};
export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return { ...state, text: action.text };
    case 'SET_SORT_BY_NAME':
      return { ...state, sortBy: 'name' };
    case 'SET_SORT_BY_EMPLOYEE_ID':
      return { ...state, sortBy: 'employeeId' };
    case 'SET_SORT_BY_PME_DUE_DATE':
      return { ...state, sortBy: 'pmeDueDate' };
    case 'SET_SORT_BY_VTC_DUE_DATE':
      return { ...state, sortBy: 'vtcDueDate' };
    case 'SET_UNIT':
      return { ...state, unit: action.unit };
    case 'SET_DUE_DATE_ITEM_BY_PME':
      return { ...state, dueDateItem: 'pme' };
    case 'SET_DUE_DATE_ITEM_BY_VTC':
      return { ...state, dueDateItem: 'vtc' };
    case 'SET_START_DATE':
      return { ...state, startDate: action.startDate };
    case 'SET_END_DATE':
      return { ...state, endDate: action.endDate };
    default:
      return state;
  }
};
