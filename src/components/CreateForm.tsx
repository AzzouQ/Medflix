import React, { useState } from 'react';
import { Button, Row, Col, Form, Input } from 'antd';
import { t } from '../i18n';

const CreateForm = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <Form name={'title'} size={'middle'} layout={'vertical'}>
      <Row gutter={20}>
        <Col span={24}>
          <Form.Item
            name={'title'}
            label={t`form.create.title.label`}
            required={true}
          >
            <Input
              name={'title'}
              placeholder={t`form.create.title.placeholder`}
              value={title}
              onChange={(e) => setTitle(e.target.value!)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Form.Item
            name={'description'}
            label={t`form.create.description.label`}
            required={true}
          >
            <Input.TextArea
              aria-multiline
              value={desc}
              onChange={(e) => setDesc(e.target.value!)}
              name={'description'}
              placeholder={t`form.create.description.placeholder`}
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
              {t`form.create.upload`}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateForm;
