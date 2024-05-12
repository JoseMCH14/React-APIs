import Alert from 'react-bootstrap/Alert';

export const Advertecia = ({variante,texto,mostrar}) => {

    console.log(mostrar, "mostrar")

    return (
        <>
       {mostrar ? (<Alert variant={variante}>{texto}</Alert>) : (<Alert className='d-none' variant={variante}>{texto}</Alert>) }
       </>
    )
}