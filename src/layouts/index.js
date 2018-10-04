import { Menu, Icon } from 'antd';
import Link from 'umi/link';

function BasicLayout(props) {
  return (
    <div>
      <Menu mode="horizontal" theme="dark">
        <Menu.Item key="/">
          <Link to="/home">
            <Icon type="home" />
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="/invoices">
          <Link to="/invoices">
            <Icon type="bars" />
            Invoices
          </Link>
        </Menu.Item>
        <Menu.Item key="/404">
          <Link to="/404">
            <Icon type="frown-circle" />
            404
          </Link>
        </Menu.Item>
      </Menu>
      {props.children}
    </div>
  );
}

export default BasicLayout;
