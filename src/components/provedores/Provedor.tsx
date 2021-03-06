import "../../index.css";
import { Link } from "react-router-dom"

type Props = {
    id: number,
    name: string
}

export const Provedor = ({ id, name }: Props) => {
    return (
        <Link className="linkProvedorItem" to={`/provedores/${id}`}>
            <div key={id} className="provedorItem">
                {name}
            </div>
        </Link>
    )
}