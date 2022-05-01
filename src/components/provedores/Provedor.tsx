import "../../index.css";

type Props = {
    id: number,
    name: string
}

export const Provedor = ({id, name}: Props) => {
    return (
        <div key={id} className="provedorItem">
            {id} - {name}
        </div>
    )
}