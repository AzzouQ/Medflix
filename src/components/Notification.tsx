import { Button, notification, Divider, Space } from 'antd';
import {
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
} from '@ant-design/icons';
import React from 'react';
import { NotificationPlacement } from 'antd/lib/notification';

const Context = React.createContext({ name: 'Default' });

const Notification = () => {
  const [api, contextHolder] = notification.useNotification();


  return (
    <Context.Provider value={{ name: 'Ant Design' }}>
      {contextHolder}
    </Context.Provider>
  );
};

export default Notification;
