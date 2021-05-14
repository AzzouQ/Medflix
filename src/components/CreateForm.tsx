import React, { useState } from 'react';
import { Button, Row, Col, Form, Input } from 'antd';
import { t } from '../locales';

const CreateForm = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  
  const addVideoTitle = t('ADD_VIDEO_TITLE');
  const addVideoTitlePlaceholder = t('ADD_VIDEO_TITLE_PLACEHOLDER');
  const addVideoDesc = t('DESC_TITLE');
  const addVideodescPlaceholder = t('DESC_PLACEHOLDER');
  const upload = t('UPLOAD');

  return (
    <Form name={'title'} size={'middle'} layout={'vertical'}>
      <Row gutter={20}>
        <Col span={24}>
          <Form.Item name={'title'} label={addVideoTitle} required={true}>
            <Input
              name={'title'}
              placeholder={addVideoTitlePlaceholder}
              value={title}
              onChange={(e) => setTitle(e.target.value!)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Form.Item name={'description'} label={addVideoDesc} required={true}>
            <Input.TextArea
              aria-multiline
              value={desc}
              onChange={(e) => setDesc(e.target.value!)}
              name={'description'}
              placeholder={addVideodescPlaceholder}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Form.Item name={'upload'}>
            <Button
              type={'primary'}
              style={{ width: '100%', backgroundColor: 'pink' }}
              onClick={undefined}
            >
              {upload}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateForm;
