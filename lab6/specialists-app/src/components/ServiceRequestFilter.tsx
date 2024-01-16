import { FC } from 'react'
import { Button } from 'react-bootstrap'
import './InputField.css'

interface Props {
    status: string
    setStatusValue: (value: string) => void
    formed_at_from: string
    setFormedAtValue: (value: string) => void
    formed_at_to: string
    setFormedAtTo: (value: string) => void
    onSubmit: () => void
    loading?: boolean
    placeholder?: string
    buttonTitle?: string
}

const ServiceRequestFilter: FC<Props> = ({ formed_at_to, setFormedAtTo, status, formed_at_from, setFormedAtValue, setStatusValue, onSubmit, loading, placeholder, buttonTitle = 'Фильтровать' }) => (
    <div className="inputField">
        <select value={status} onChange={(event => setStatusValue(event.target.value))}>
            <option value="ALL">ALL</option>
            <option value="CREATED">CREATED</option>
            <option value="IN_WORK">IN_WORK</option>
            <option value="FINISHED">FINISHED</option>
            <option value="CANCELED">CANCELED</option>
        </select>
        <input value={formed_at_from} type='date' onChange={(event => setFormedAtValue(event.target.value))}></input>
        <input value={formed_at_to} type='date' onChange={(event => setFormedAtTo(event.target.value))}></input>
        <Button disabled={loading} onClick={onSubmit}>{buttonTitle}</Button>
    </div>
)

export default ServiceRequestFilter