import axios from 'axios';
import { useEffect } from 'react';

export const MiApi = () => {

    const URL = 'https://midas.minsal.cl/farmacia_v2/WS/getLocales.php'

    const fetchData = async () => {
        const {data} = await axios.get(URL)
        const farmancias = data
        console.log(farmancias, "farmancias")
    }

    useEffect(()=>{
        fetchData();
    },[])

    return(
        <>
            <h2>Mi Api</h2>
        </>
    )
}