import { FC, useState } from 'react'
import { ISpecialist, delete_specialist_by_moder } from '../modules/get-specialist'
import { Button, Card, Spinner } from 'react-bootstrap'

const redirect_to_spec = (id: Number) => {
    window.location.href = `/specialists_table/${id}`
 }

const default_image = require('../assets/noImage.jpg');


const SpecialistRow: FC<ISpecialist> = ({id, name, desc, preview_image}) => {

    const [loading, setLoading] = useState(false)

    const [delRow, setDelRow] = useState(false)


    const delete_spec = async(id: Number) => {
        await setLoading(true)
        await delete_specialist_by_moder(Number(id))
        setDelRow(true)
        await setLoading(false)
    }

    if (!delRow) {return (
        <tr className={`${loading && 'containerLoading'}`}>
            <td>{id.toString()}</td>
            <td>{name}</td>
            <td>{desc}</td>
            {/* <td><img src={preview_image}></img></td> */}
            <td>         
                <Card.Img className="cardImage" variant="top" src={preview_image+""} height={100} width={100}  
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; 
                        currentTarget.src=default_image;
                    }}
                    />
            </td>
            <td><Button onClick={(e) => {redirect_to_spec(id)}}>Редактировать</Button></td>
            <td><Button onClick={(e) => {delete_spec(id)}}>Удалить</Button></td>
        </tr>
    )}
}

export default SpecialistRow;