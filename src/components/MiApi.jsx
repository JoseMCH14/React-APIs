import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Buscador } from './Buscador';
import { Ordernar } from './Ordenar';
import Table from 'react-bootstrap/Table';

export const MiApi = () => {

    const URL = 'https://midas.minsal.cl/farmacia_v2/WS/getLocales.php';
    const [farmacias,setFarmancias] = useState ([]);
    const [filtrado, setFiltrado] = useState ([]);
    const [ordenado,setOrdenado] = useState ([]);
    const [valor,setValor] = useState ("");
    const [item,setItem] = useState (false);
    const [msj,setMsj] = useState ("");

    const fetchData = async () => {
        const {data} = await axios.get(URL);
        const DrugStores = data;
        let drugstoreclean;
        

        if(Array.isArray(DrugStores)) {
            drugstoreclean = DrugStores.map((DrugStore) => {
                const newDataDrugstore = {
                    id: DrugStore.local_id,
                    nombre: DrugStore.local_nombre.trim(),
                    comuna: DrugStore.comuna_nombre.trim(),
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
        const variable = event.target.value
        setOrdenado([])
        console.log (variable ,"Funcion handleSearch")
        if (variable !== "") {
            let DrougStrFilter = busquedaCampo(variable);
            setFiltrado(DrougStrFilter)
        } else {
            setFiltrado([])
        }        
    }

    const busquedaCampo = (variable) => {
        let array_proceso;
        if (valor == "nombre" ) {
            array_proceso = farmacias.filter ((farmacia) =>
                farmacia.nombre.toLowerCase().includes(variable.toLowerCase())
            )
        } else if ( valor == "comuna") {
            array_proceso = farmacias.filter ((farmacia) =>
                farmacia.comuna.toLowerCase().includes(variable.toLowerCase())
            )
        }

        return array_proceso;
    }

    const searchValue = (event) => {
        const value = event.target.name;
        let message = RenderMsg (value)
        setItem  (true)
        setValor (value)
        setMsj (message)
    }

    const RenderMsg = (valor) => {
        let mensaje;

        if (valor == "nombre") {
            mensaje = "Coloca el nombre del local";
            return mensaje;
        } else if ( valor == "comuna")
            mensaje = "Busca las farmacias en tu comuna"
            return mensaje;
    }

    const ordenarResultados = (event) => {
       
        const Ordenar = event.target.value
        let variable_local = [];

        
        if (Ordenar !== "0") {
            if (filtrado.length) {

                variable_local = ordenador (filtrado);
            } else {

                variable_local = ordenador (farmacias)
            }
        } else {
            console.log ("No voy a filtrar")
            }
            setOrdenado(variable_local)
            console.log(ordenado, "variable ordenada")
    }

    const ordenador = (flujo) => {
        
        let array_prueba = flujo.sort((x,y) => x.nombre.localeCompare(y.nombre));
        return array_prueba;
            
    }

    return(
        <>
        <Buscador 
            onChange={handleSearch}
            onClick={searchValue}
            item={item}
            valor={valor}
            mensaje={msj}
        />
        <Ordernar
        onClick={ordenarResultados}
        />
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
            ordenado?.length ? (ordenado.map( (orderdata) => (
                <tr key={orderdata.id}>
                <td>{orderdata.nombre}</td>
                <td>{orderdata.comuna}</td>
                <td>{orderdata.direccion}</td>
                <td>{orderdata.apertura} - {orderdata.cierre}</td>
                <td>{orderdata.telefono}</td>
            </tr>
            
            ))) : (filtrado?.length ? (filtrado.map((filterdata) => (
                <tr key={filterdata.id}>
                <td>{filterdata.nombre}</td>
                <td>{filterdata.comuna}</td>
                <td>{filterdata.direccion}</td>
                <td>{filterdata.apertura} - {filterdata.cierre}</td>
                <td>{filterdata.telefono}</td>
            </tr>
            ))): (farmacias?.length ? ( farmacias.map( (farmacia) => (
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
          ))}
        </tbody>
      </Table>
        </>
    )
}