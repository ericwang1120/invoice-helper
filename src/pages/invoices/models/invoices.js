import moment from 'moment';

export default {
  namespace: 'invoices',
  state: {
    list: [],
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
          dispatch({
            type: 'fetch',
            payload: [
              {
                id: 1,
                description: 'Aptamil Gold+ 4 Junior',
                rate: 170.0,
                quantity: 1,
              },
            ],
          });
        }
      });
    },
  },
};
