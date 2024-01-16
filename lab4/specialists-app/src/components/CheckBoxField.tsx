import { FC } from 'react'
import './InputField.css'


interface Props {
    value: boolean
    setValue: (value: boolean) => void    
    placeholder?: string
    fieldName?: string
    fieldLabel?: string
}

const CheckBoxField: FC<Props> = ({value, setValue, fieldName, fieldLabel}) => (

    <div className="CheckBoxField">
        <input id={fieldName} name={fieldName} type='checkbox' onChange={(event => setValue(!value))}/>
        <label htmlFor={fieldName}>{fieldLabel}</label>
    </div>
)

export default CheckBoxField