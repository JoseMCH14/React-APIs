export const Buscador = ({onChange}) => {

    return (
        <input
        type="text"
        placeholder="Busca tu farmacia de preferencia"
        className="form-control"
        onChange={onChange}
        />
    )
}