import { connect } from 'dva';
import React from 'react';
import { Table, Popconfirm } from 'antd';
import styles from './Invoices.css';
import InvoiceModal from './InvoiceModal';
import TopToolbar from './TopToolbar';

class Invoices extends React.Component {
  deleteHandler(id) {
    this.props.dispatch({
      type: 'users/remove',
      payload: id,
    });
  }

  editHandler(id, values) {
    this.props.dispatch({
      type: 'users/patch',
      payload: { id, values },
    });
  }

  render() {
    const {
      list: dataSource,
      onDelete: deleteHandler,
      onEdit: editHandler,
      onCreate: createHandler,
      onClearAll: clearAllHandler,
      updateBaseInfo,
      baseInfo,
    } = this.props;

    const columns = [
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: text => <a href="">{text}</a>,
      },
      {
        title: 'Rate',
        dataIndex: 'rate',
        key: 'rate',
        render: text => (Math.round(text * 100) / 100).toFixed(2),
      },
      { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
      {
        title: 'Operation',
        key: 'operation',
        render: (text, record) => (
          <span className={styles.operation}>
            <InvoiceModal record={record} onOk={this.editHandler}>
              <a>Edit</a>
            </InvoiceModal>
            <Popconfirm
              title="Confirm to delete?"
              onConfirm={this.deleteHandler.bind(null, record.id)}
            >
              <a href="">Delete</a>
            </Popconfirm>
          </span>
        ),
      },
    ];

    return (
      <div>
        {/* <TopToolbar
          createHandler={createHandler}
          clearAllHandler={clearAllHandler}
          update={updateBaseInfo}
          baseInfo={baseInfo}
        /> */}
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { list, total, page } = state.invoices;
  return {
    list,
    total,
    page,
    loading: state.loading.models.users,
  };
}

export default connect(mapStateToProps)(Invoices);
