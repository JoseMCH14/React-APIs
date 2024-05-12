import Form from 'react-bootstrap/Form';

export const Ordernar = ({onClick}) => {

    return (
        <>
            <Form.Select aria-label="Default select example" onChange={onClick} size="sm">
                <option value="0" >Ordenar por</option>
                <option value="1" >Local (A to Z)</option>
            </Form.Select>
        </>
    )
}