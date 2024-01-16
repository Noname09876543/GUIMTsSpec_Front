import { FC } from 'react'
import { Card } from 'react-bootstrap'
import './SmallSpecialistCard.css'

interface Props {
    id: Number,
    name: string
    preview_image: string
}

const default_image = require('../assets/noImage.jpg');

const SpecialistCardInRequest: FC<Props> = ({id, name, preview_image}) => (
    <Card className="card">
        <Card.Img className="cardImage" variant="top" src={preview_image+""} height={100} width={100}  
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; 
            currentTarget.src=default_image;
          }}
          />
        <Card.Body>                
            <div className="textStyle">
                <Card.Title>{name}
                </Card.Title>
            </div>
        </Card.Body>
    </Card>
)

export default SpecialistCardInRequest;