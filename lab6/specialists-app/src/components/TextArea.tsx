import { FC } from 'react'
import './InputField.css'

interface Props {
    value?: string
    setValue: (value: string) => void    
    placeholder?: string
    fieldName?: string
}

const TextArea: FC<Props> = ({value, setValue, placeholder, fieldName}) => (

    <div className="inputField">
        <textarea id={fieldName} name={fieldName} value={value} placeholder={placeholder} onChange={(event => setValue(event.target.value))}/>
    </div>
)

export default TextArea