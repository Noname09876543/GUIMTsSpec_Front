import { FC } from 'react'
import './InputField.css'


interface Props {
    value?: string
    inputType: string
    setValue: (value: string) => void    
    placeholder?: string
    fieldName?: string
}

const InputField: FC<Props> = ({value, placeholder, inputType, setValue, fieldName}) => (

    <div className="inputField">
        <input id={fieldName} name={fieldName} value={value} placeholder={placeholder} type={inputType} onChange={(event => setValue(event.target.value))}/>
    </div>
)

export default InputField