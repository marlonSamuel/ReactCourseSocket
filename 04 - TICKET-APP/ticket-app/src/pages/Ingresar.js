import React, { useState } from 'react';

import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { useHideMenu } from '../hooks/useHideMenu';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';

const { Title, Text } = Typography;

export const Ingresar = () => {

  const history = useNavigate();

  const [usuario] = useState(getUsuarioStorage);

  console.log(usuario);

  useHideMenu(false);

  const onFinish = ({agente, escritorio}) => {
    localStorage.setItem('agente',agente);
    localStorage.setItem('escritorio',escritorio);

    history('/escritorio');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if( usuario.agente && usuario.escritorio){
    return <Navigate to='/escritorio' />
  }
  
  return (
    <>
      <Title level={ 2 }> Ingresar</Title>
     
      <Text> Ingrese su nombr ey no. de escritorio</Text>
      <Divider />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nombre del agente"
          name="agente"
          rules={[{ required: true, message: 'Por favor ingrese su nombre!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Escritorio"
          name="escritorio"
          rules={[{ required: true, message: 'Ingrese el número de escritorio!' }]}
        >
          <InputNumber  min={1} max={99}/>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
          <Button type="primary" htmlType="submit" shape="round">
            <SaveOutlined />
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </>
    
  )
}
