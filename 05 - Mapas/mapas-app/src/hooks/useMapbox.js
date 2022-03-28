import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl';
import {v4} from 'uuid';
import { Subject } from "rxjs";

mapboxgl.accessToken = 'pk.eyJ1IjoibWFybG9uMjE5NSIsImEiOiJjbDAxYTJicjQwMWlxM2JsdWIxYWQ1Ym9mIn0.OVJVA8XbWFhe1_w953zCig';

export const useMapbox = ( initPoint ) => {

    const mapDiv = useRef();
    const setRef = useCallback( (node) =>{
        mapDiv.current = node;
    },[]);

    //Referencia a los marrcadores
    const marcadores = useRef({});

    // observables de Rxjs
    const movimientoMarcador= useRef( new Subject());
    const nuevoMarcador = useRef( new Subject());

    const map = useRef();
    const [coords, setCoords] = useState(initPoint);

    //función para agregar marcadores
    const agregarMarcador = useCallback( (ev, id) => {
        
        const { lng, lat } = ev.lngLat || ev;

        const marker = new mapboxgl.Marker();
        marker.id = id ?? v4(); // TODO: si el marcador ya tiene ID

        marker
            .setLngLat([lng, lat])
            .addTo(map.current)
            .setDraggable( true );

        marcadores.current[marker.id] = marker;

        //si el marcador tiene ID no emitir
        if( !id ){
            nuevoMarcador.current.next( {
                id: marker.id,
                lng,
                lat
            } );
        }

        // escuchar movimientos del marcador
        marker.on('drag', ({target})=>{
            const { id } = target;
            const {lng, lat} = target.getLngLat();

            //emitir los movimientos del marcador
            movimientoMarcador.current.next( {
                id,
                lng,
                lat
            } );

        });

    },[]);

    //funcion para actualizar la ubicación del marcador
    const actualizarPosicion = useCallback( ( {id, lng, lat} ) => {
        marcadores.current[id].setLngLat([lng, lat]);
    }, []);

    useEffect(() => {
        const _map = new mapboxgl.Map({
            container: mapDiv.current, // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [initPoint.lng, initPoint.lat], // starting position [lng, lat]
            zoom: initPoint.zoom // starting zoom
        });

        map.current = _map;
    },[initPoint]);

    //cuando se mueve el mapa
    useEffect(() => {
        map.current?.on('move', ()=>{
           const {lng, lat} = map.current.getCenter(); 
            setCoords({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.current.getZoom().toFixed(2)
            });
        });
    }, [])

    //agregar marcadores
    useEffect(()=>{
        map.current?.on('click',agregarMarcador);
    },[agregarMarcador]);

    return {
        actualizarPosicion,
        agregarMarcador,
        coords,
        marcadores,
        movimientoMarcador$: movimientoMarcador.current,
        nuevoMarcador$: nuevoMarcador.current,
        setRef
    }
}
