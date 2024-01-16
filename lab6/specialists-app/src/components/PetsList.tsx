import {dataActions, useData} from '../store/data'
import {useCount} from '../store/data/selectors'
import {useAppDispatch} from "../store";
import { useEffect } from 'react';

// import {getPetsByStatus} from '../store/data/getPetsByStatus'


export const PetsList = () => {
    const dispatch = useAppDispatch()

    const count = useCount()
    const data = useData()

    return (
        <div>
            <div>Количество животных: {count}</div>
            {
                data.map((good) =>
                    <div key={good.id}>
                        <p>
                            {good.name}
                        </p>
                        <p>
                            Категория - {good.category.name}
                        </p>
                        <button
                            onClick={() => {
                                dispatch(dataActions.addCount())
                            }}
                        >
                            Добавить
                        </button>
                    </div>
                )
            }
            <button 
                onClick={() => {
                    dispatch(dataActions.clearCount())
                }}
            >
                Обнулить
            </button>
        </div>
    )
}