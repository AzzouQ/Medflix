import React, { useState } from 'react';
import { Button, Row, Col, Form, Input } from 'antd';
import * as Yup from 'yup';

import { useHistory } from 'react-router';
// import { upload } from '../service/firebase';

const CreateForm = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const yupValidation = Yup.object({
    title: Yup.string().required('Veuillez entrer un titre'),
    desc: Yup.string()
      .required('Veuillez entrer une description')
  });

  return (
    <Form name={'title'} size={'middle'} layout={'vertical'}>
      <Row gutter={20}>
        <Col span={24}>
          <Form.Item name={'title'} label={'Titre'} required={true}>
            <Input
              name={'title'}
              placeholder={'Titre'}
              value={title}
              onChange={(e) => setTitle(e.target.value!)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Form.Item name={'description'} label={'Description'} required={true}>
            <Input.TextArea
              aria-multiline
              value={desc}
              onChange={(e) => setDesc(e.target.value!)}
              name={'description'}
              placeholder={'Description'}
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
              {'Upload'}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateForm;
