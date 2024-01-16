import { createSlice } from "@reduxjs/toolkit"

const dataSlice = createSlice({
    name: "data",
    initialState: {
        data: [
            {
                "id": 1,
                "name": "PerfE",
                "category": {
                    "id": 4,
                    "name": "Dogs"
                }
            },
            {
                "id": 2,
                "name": "Tostik",
                "category": {
                    "id": 4,
                    "name": "Dogs"
                }
            },
        ],
        сountCart: 0,
    },
    reducers: {
        setData(state, {payload}) {  // изменяем состояние на полученные данные
            state.data = payload
        },
        addCount(state) {  // добавляем животного
            state.сountCart += 1
        },
        clearCount(state) {  // обнуляем количество животных
            state.сountCart = 0
        }
    }
})

export const { actions: dataActions, reducer: dataReducer } = dataSlice