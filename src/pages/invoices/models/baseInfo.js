import moment from 'moment';

export default {
  namespace: 'baseInfo',
  state: {
    username: '',
    companyName: 'WINTRADING',
    address: '',
    date: moment(new Date()),
    dueDate: moment(new Date()),
    isPaid: false,
    invoiceNo: 1,
    gstNo: '88 - 166 - 469',
  },
  reducers: {
    save(
      state,
      {
        payload: { data: list, total, page },
      }
    ) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *fetch({ payload: data }, { put }) {
      yield put({
        type: 'save',
        payload: {
          data,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/invoices') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
