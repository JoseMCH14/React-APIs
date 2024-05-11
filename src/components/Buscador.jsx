import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export const Buscador = ({onChange,onClick,item,mensaje,valor}) => {
        
    return (
        <>
        <InputGroup className="mb-3">
        <DropdownButton variant="outline-secondary" title={valor} id="input-group-dropdown-1"
>
          <Dropdown.Item name = "nombre" onClick={onClick}>Nombre del local</Dropdown.Item>
          <Dropdown.Item name = "comuna" onClick={onClick}>Comuna</Dropdown.Item>
        </DropdownButton>
            { item ? (<Form.Control placeholder={mensaje} onChange={onChange}/>) : (<Form.Control placeholder="<-- Seleccione una opcion de busqueda" onChange={onChange}/>)}
      </InputGroup>
        </>
    )
}