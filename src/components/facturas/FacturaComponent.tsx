import "../../index.css";
import { Link } from "react-router-dom"

type Props = {
    id: number,
    numero: number
}

export const FacturaComponent = ({ id, numero }: Props) => {
    return (
        <Link className="linkObraItem" to={`/facturas/${id}`}>
            <div className="obraItem" key={id}>
                {`${numero} `}
            </div>
        </Link>
    )
}