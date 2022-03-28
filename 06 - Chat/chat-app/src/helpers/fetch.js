const baseUrl = process.env.REACT_APP_API_URL;

export const fetchSinToken = async( endopoint, data, method = 'GET' ) => {

    const url = `${ baseUrl}/${endopoint}`;

    if (method == 'GET'){
        const resp = await fetch( url );
        return await resp.json();
    }

    const resp = await fetch( url, {
        method,
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return await resp.json();

}

export const fetchConToken = async( endopoint, data, method = 'GET' ) => {

    const url = `${ baseUrl}/${endopoint}`;
    const token = localStorage.getItem('token') || '';
    if (method == 'GET'){
        const resp = await fetch( url, {
            headers: {
                'x-token': token
            }    
        } );
        return await resp.json();
    }

    const resp = await fetch( url, {
        method,
        headers: {
            'Content-type': 'application/json',
            'x-token': token
        },
        body: JSON.stringify(data)
    })

    return await resp.json();

}