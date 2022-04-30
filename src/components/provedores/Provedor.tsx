import styles from "./Provedor.module.css";

type Props = {
    id: number,
    name: string
}

export const Provedor = ({id, name}: Props) => {
    return (
        <div className={styles.itemProvedor} >
            {id} - {name}
        </div>
    )
}