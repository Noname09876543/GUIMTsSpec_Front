import { FC } from 'react'
import { Card } from 'react-bootstrap'
import './SpecialistCard.css'

interface Props {
    name: string
    desc: string
    preview_image: string
}

const default_image = require('../assets/noImage.jpg');

const SpecialistCard: FC<Props> = ({name, desc, preview_image}) => (
    <Card className="card">
        <Card.Img className="cardImage" variant="top" src={preview_image+""} height={100} width={100} 
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; 
            currentTarget.src=default_image;
          }} />
        <Card.Body>                
            <div className="textStyle">
                <Card.Title>{name}</Card.Title>
            </div>
            <div className="textStyle">
                <Card.Text>
                    {desc}
                </Card.Text>
            </div>
        </Card.Body>
    </Card>
)

export default SpecialistCard;