import "../../index.css";
import { Link } from "react-router-dom"

type Props = {
    id: number,
    name: string
}

export const ConductorComponent = ({ id, name }: Props) => {
    return (
        <Link className="linkItem" to={`/conductores/${id}`}>
            <div key={id} className="provedorItem">
                {name}
            </div>
        </Link>
    )
}