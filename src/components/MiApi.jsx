import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Buscador } from './Buscador';
import { Ordernar } from './Ordenar';
import { Advertecia } from './Advertencia';
import linea from '../assets/img/linea.png'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

export const MiApi = () => {

    const URL = 'https://midas.minsal.cl/farmacia_v2/WS/getLocales.php';
    const [farmacias,setFarmancias] = useState ([]);
    const [filtrado, setFiltrado] = useState ([]);
    const [ordenado,setOrdenado] = useState ([]);
    const [valor,setValor] = useState ("");
    const [item,setItem] = useState (false);
    const [msj,setMsj] = useState ("");
    const [alerta,setAlerta] = useState("");
    const [color,setColor] = useState("");
    const [show,setShow] = useState(false)
    const [icon,setIcon] = useState(false)

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
        setShow(false)
        setItem  (false)
        console.log (variable ,"Funcion handleSearch")
        if(valor !== ""){
        if (variable !== "") {
            let DrougStrFilter = busquedaCampo(variable);
            setFiltrado(DrougStrFilter)
        } else {
            setFiltrado([])
        }        
        } else {
            let mensaje = RenderMsg ();
            setMsj(mensaje)
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
        if (array_proceso.length == 0) {
            gestionAlerta("No hay coincidencias","danger",false)
        } else {
            setShow(false);
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
            gestionAlerta("Coloca el nombre del local","warning",true)
            return mensaje;
        } else if ( valor == "comuna") {
            mensaje = "Busca las farmacias en tu comuna"
            gestionAlerta("Busca las farmacias en tu comuna","warning",true)
            return mensaje;
        } else {
            mensaje = "Recuerde seleccionar una opcion de busqueda"
            gestionAlerta("Recuerde seleccionar una opcion de busqueda","warning",true)
            return mensaje;
        }
    }

    const ordenarResultados = (event) => {
       
        let variable_local = []; 
        if (filtrado.length) {
            variable_local = ordenador (filtrado);
        } else {
            variable_local = ordenador (farmacias)
        } 
        setOrdenado(variable_local)
    }

    const ordenador = (flujo) => {
        
        let array_prueba = flujo.sort((x,y) => x.nombre.localeCompare(y.nombre));
        return array_prueba;
            
    }

    const gestionAlerta = (texto,clr,boolean) => {

        setAlerta(texto);
        setColor(clr);
        setShow(true);
        setIcon(boolean);

    }

    return(
        <>
        <Container>
        <Row className='mb-3'>
        <Row>
            <h2 className='text-center'>Farmacias de turno</h2>
        </Row>
        <Row>
            <Col>
                <Image className="linea ms-4 mb-2" src={linea}/>
            </Col>
        </Row>
            <Col>
                <Buscador 
                    onChange={handleSearch}
                    onClick={searchValue}
                    item={item}
                    valor={valor}
                    mensaje={msj}
                />
            </Col>
            <Col xs={2}>
                <Ordernar
                onClick={ordenarResultados}
                />
            </Col>
        </Row>
        <Row className='justify-content-center'>
            <Col xs={3}>
                <Advertecia 
                variante={color}
                texto={alerta}
                mostrar={show}
                icono={icon}
                />
            </Col>
        </Row>
        <Table className='table-hover table-bordered text-center'>
        <thead>
          <tr className='table-primary'>
            <th className='col-1'>Local</th>
            <th >Comuna </th>
            <th >Direccion</th>
            <th className='col-2'>Horario</th>
            <th className='col-1'>Telefono</th>
          </tr>
        </thead>
        <tbody>
          {
            ordenado?.length ? (ordenado.map( (orderdata) => (
                <tr className='table-light' key={orderdata.id} >
                <td className='align-middle text-md-center'>{orderdata.nombre}</td>
                <td className='align-middle text-md-center'>{orderdata.comuna}</td>
                <td className='align-middle text-md-center'>{orderdata.direccion}</td>
                <td className='align-middle text-md-center'>{orderdata.apertura} - {orderdata.cierre}</td>
                <td className='align-middle text-md-center'>{orderdata.telefono}</td>
            </tr>
            
            ))) : (filtrado?.length ? (filtrado.map((filterdata) => (
                <tr className='table-light' key={filterdata.id}>
                <td className='align-middle text-md-center'>{filterdata.nombre}</td>
                <td className='align-middle text-md-center'>{filterdata.comuna}</td>
                <td className='align-middle text-md-center'>{filterdata.direccion}</td>
                <td className='align-middle text-md-center'>{filterdata.apertura} - {filterdata.cierre}</td>
                <td className='align-middle text-md-center'>{filterdata.telefono}</td>
            </tr>
            ))): (farmacias?.length ? ( farmacias.map( (farmacia) => (
                <tr className='table-light' key={farmacia.id}>
                    <td className='align-middle text-md-center'>{farmacia.nombre}</td>
                    <td className='align-middle text-md-center'>{farmacia.comuna}</td>
                    <td className='align-middle text-md-center'>{farmacia.direccion}</td>
                    <td className='align-middle text-md-center'>{farmacia.apertura} - {farmacia.cierre}</td>
                    <td className='align-middle text-md-center'>{farmacia.telefono}</td>
                </tr>
                    ))) :
              <tr>
                <td colSpan={5} >
                    <h1>Cargando...</h1>
                </td>
              </tr>
          ))}
        </tbody>
      </Table>
      </Container>
        </>
    )
}