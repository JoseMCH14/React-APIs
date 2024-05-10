import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

export const MiApi = () => {

    const URL = 'https://midas.minsal.cl/farmacia_v2/WS/getLocales.php'
    const [farmacias,setFarmancias] = useState ([])

    const fetchData = async () => {
        const {data} = await axios.get(URL);
        const DrugStores = data;
        let drugstoreclean;
        

        if(Array.isArray(DrugStores)) {
            drugstoreclean = DrugStores.map((DrugStore) => {
                const newDataDrugstore = {
                    nombre: DrugStore.local_nombre,
                    comuna: DrugStore.comuna_nombre,
                    direccion: DrugStore.local_direccion,
                    apertura: DrugStore.funcionamiento_hora_apertura,
                    cierre: DrugStore.funcionamiento_hora_cierre,
                    telefono: DrugStore.local_telefono,
                    latitud: DrugStore.local_lat,
                    longitud: DrugStore.local_lng
                };

                return newDataDrugstore
            })
        } else {
            console.log("data no encontrada")
        }

        console.log(drugstoreclean)
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