import { CloseCircleOutlined, RightCircleFilled } from '@ant-design/icons';
import {Row, Col, Typography, Button, Divider } from 'antd'
import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';
import { useHideMenu } from '../hooks/useHideMenu';

const {Title, Text } = Typography;

export const Escritorio = () => {

  useHideMenu(false);

  const [usuario] = useState(getUsuarioStorage);
  const {socket} = useContext( SocketContext );
  const [ticket, setTicket] = useState(null);
  const history = useNavigate();

  const salir = () => {
    localStorage.clear();
    history('/ingresar');
  }

  const siguienteTicket = () => {
    socket.emit('siguiente-ticket-trabajar',usuario, ( ticket ) =>{
      setTicket(ticket);
    });
  }

  if( !usuario.agente || !usuario.escritorio){
    return <Navigate to='/ingresar' />
  }

  return (
    <>
      <Row>
        <Col span={ 20 }>
          <Title level={ 2 }> {usuario.agente}</Title>
          <Text> Usted está trabajando en el escritorio: </Text>
          <Text type='success'> {usuario.escritorio} </Text>
        </Col>

        <Col span={ 4 } align="right">
          <Button shape='round' type='danger' onClick={ salir }>
            <CloseCircleOutlined />
              Salir
          </Button>
        </Col>
      </Row>

      <Divider />

      {
        ticket && (
          <Row>
            <Col>
              <Text>Está atendiendo el ticket número: </Text>
              <Text style={{fontSize: 30}} type='danger'> 
                {ticket.numero} 
              </Text>
            </Col>
          </Row>      
        )
      }
      {
        ticket == null && (
          <Row>
            <Col>
              <Text style={{fontSize: 30}} type='danger'> 
                no existen mas ticket que atender
              </Text>
            </Col>
          </Row>      
        )
      }



      <Row>
        <Col offset={ 18 } span={ 6 } align='right'> 
          <Button onClick={ siguienteTicket } shape='round' type='primary'>
            <RightCircleFilled />
            Siguiente
          </Button>
        </Col>
      </Row>

    </>
  )
}
