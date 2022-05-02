import "../../index.css";
import { Link } from "react-router-dom"

type Props = {
    id: number,
    name: string
}

export const ObraComponent = ({ id, name }: Props) => {
    return (
        <Link className="linkObraItem" to={`/obras/${id}`}>
            <div className="obraItem" key={id}>
                {name}
            </div>
        </Link>
    )
}