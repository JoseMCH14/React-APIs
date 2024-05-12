import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleXmark,faTriangleExclamation} from '@fortawesome/free-solid-svg-icons'

export const Advertecia = ({variante,texto,mostrar,icono}) => {

    return (
        <>
       {
       mostrar ? ( icono ? (<Alert className="text-center" variant={variante}><FontAwesomeIcon className="me-2" icon={faTriangleExclamation} size="xl"/>{texto}</Alert>) : (<Alert className="text-center" variant={variante}><FontAwesomeIcon className="me-2" icon={faCircleXmark} size="xl"/>{texto}</Alert>) )
         : (<Alert className='d-none' variant={variante}>{texto}</Alert>)
       }
       </>
    )
}