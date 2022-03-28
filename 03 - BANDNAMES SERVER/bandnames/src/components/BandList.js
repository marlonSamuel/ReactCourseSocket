import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext';

export const BandList = ( ) => {
    const [bands, setBands] = useState([]);

    const { socket } = useContext( SocketContext );

    useEffect(() => {
        socket.on('current-bands', (data) => {
            setBands(data);
        });

        return () => socket.off('current-bands');
    }, [socket])

    const changeName = ( event, id ) => {
        const newName = event.target.value;
        
        setBands( bands => bands.map( band =>{
            if (band.id == id){
                band.name = newName;
            }
            return band;
        }));
    }

    const onLossFocus = (id, name) => {
        socket.emit( 'update-band', {id,name});
    }

    const vote = ( id ) => {
        socket.emit( 'vote-band', id);
    }

    const removeBand = ( id ) => {
        socket.emit( 'remove-band', id);
    }
    

    const createRows = () => {
        return (
            bands.map( band => (
                <tr key={band.id}>
                    <td>
                        <button className='btn btn-primary'
                            onClick={ () => vote( band.id ) }
                            > +1</button>
                    </td>
                    <td>
                        <input 
                            className='form-control' value={band.name}
                            onChange={(event) => changeName( event, band.id )}
                            onBlur={()=> onLossFocus(band.id, band.name)}/>
                    </td>
                    <td><h3> {band.votes} </h3></td>
                    <td>
                        <button 
                            className='btn btn-danger'
                            onClick={ () => removeBand( band.id ) }> borrar
                        </button>
                    </td>
                </tr>
            ))
        );
    }
    return (
    <>
        <table className='table table-stripped'>
            <thead>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Votos</th>
                    <th>Borrar</th>
                </tr>
            </thead>
            <tbody>
                { createRows() }
            </tbody>
        </table>
    </>
    )
}
