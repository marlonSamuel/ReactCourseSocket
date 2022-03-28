import React, { useContext, useEffect } from 'react';
import { useMapbox } from '../hooks/useMapbox';
import { SocketContext } from '../context/SocketContext';


const initPoint = {
    lng: -90.3815,
    lat: 14.0813,
    zoom: 14.5
}

export const MapPage = () => {

    const { setRef, coords, nuevoMarcador$, movimientoMarcador$, agregarMarcador, actualizarPosicion } = useMapbox(initPoint);

    const { socket } = useContext( SocketContext );

    //escuchar los marcadores existentes.
    useEffect(() => {
      socket.on('marcadores-activos', (marcadores)=> {
        for (const key of Object.keys( marcadores )){
            agregarMarcador(marcadores[key], key)
        }
      });
    }, [socket, agregarMarcador])
    

    useEffect(() => {
        nuevoMarcador$.subscribe( marker  => {
           socket.emit('marcador-nuevo',marker);
        });
    }, [nuevoMarcador$, socket]);


    useEffect(()=>{
        socket.on('marcador-nuevo', ( marcador ) =>{
            agregarMarcador(marcador, marcador.id);
        })
    }, [socket, agregarMarcador]);

    
    useEffect(() => {
        movimientoMarcador$.subscribe( marker  => {
            socket.emit('actualizar-marcador',marker);
        });
    }, [socket,movimientoMarcador$])

    useEffect(()=>{
        socket.on('actualizar-marcador', ( marcador ) =>{
            actualizarPosicion(marcador);
        })
    }, [socket]);
    

    return (
        <>
            <div className='info'>
                Lng: {coords.lng} | Lat: {coords.lat} | Zoom: {coords.zoom}
            </div>
            <div 
                ref={setRef}
                className='mapContainer'
            />
        </>
    )
}
