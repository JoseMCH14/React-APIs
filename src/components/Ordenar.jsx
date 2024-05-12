import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const Ordernar = ({onClick}) => {

    return (
        <>
            <Button className = "ms-4" variant="primary" size="sm" onClick={onClick}>
                Ordenar por local
            </Button>
        </>
    )
}