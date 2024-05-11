import Form from 'react-bootstrap/Form';

export const Ordernar = () => {

    return (
        <>
            <Form.Select aria-label="Default select example">
                <option disabled >Ordenar por</option>
                <option value="1">Alfabeticamente</option>
                <option value="2">Por region</option>
            </Form.Select>
        </>
    )
}