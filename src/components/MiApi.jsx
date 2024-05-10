import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Buscador } from './Buscador';
import Table from 'react-bootstrap/Table';

export const MiApi = () => {

    const URL = 'https://midas.minsal.cl/farmacia_v2/WS/getLocales.php';
    const [farmacias,setFarmancias] = useState ([]);
    const [search,setSearch] = useState (""); 
    const [filtrado, setFiltrado] = useState ([]);

    const fetchData = async () => {
        const {data} = await axios.get(URL);
        const DrugStores = data;
        let drugstoreclean;
        

        if(Array.isArray(DrugStores)) {
            drugstoreclean = DrugStores.map((DrugStore) => {
                const newDataDrugstore = {
                    id: DrugStore.local_id,
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

        setFarmancias(drugstoreclean)
        
    }

    useEffect(()=>{
        fetchData();
    },[])

    const handleSearch = (event) => {
        setSearch(event.target.value)
        console.log (search ,"Funcion handleSearch")
        let DrougStrFilter = [];
        DrougStrFilter = farmacias.filter ((farmacia) =>
            farmacia.nombre.toLowerCase().includes(search.toLowerCase())
        )
        setFiltrado(DrougStrFilter)
    }

    return(
        <>
        <Buscador onChange={handleSearch}/>
        <Table responsive="lg" striped bordered className='ForCellPhones'>
        <thead>
          <tr>
            <th>Local</th>
            <th>Comuna</th>
            <th>Direccion</th>
            <th>Horario</th>
            <th>Telefono</th>
          </tr>
        </thead>
        <tbody>
          {
            filtrado?.length ? (filtrado.map((filterdata,index) => (
                <tr key={filterdata.id}>
                <td>{filterdata.nombre}</td>
                <td>{filterdata.comuna}</td>
                <td>{filterdata.direccion}</td>
                <td>{filterdata.apertura} - {filterdata.cierre}</td>
                <td>{filterdata.telefono}</td>
            </tr>
            ))): (farmacias?.length ? ( farmacias.map( (farmacia, index) => (
                <tr key={farmacia.id}>
                    <td>{farmacia.nombre}</td>
                    <td>{farmacia.comuna}</td>
                    <td>{farmacia.direccion}</td>
                    <td>{farmacia.apertura} - {farmacia.cierre}</td>
                    <td>{farmacia.telefono}</td>
                </tr>
                    ))) :
              <tr>
                <td colSpan={7}>
                    <h1>Cargando...</h1>
                </td>
              </tr>
          )}
        </tbody>
      </Table>
        </>
    )
}