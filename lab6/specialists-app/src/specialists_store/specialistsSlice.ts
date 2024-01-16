import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getSpecialists } from '../modules/get-specialist'
import { get_service_request } from '../modules/get-service_requests'
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import type { AppDispatch } from './specialists_store';

// export interface SpecialistsState {
//   value: number
// }

// const test = async () => {
//   const specialistsResult = await getSpecialists()
//   if (specialistsResult.service_request_id != null){
//       const serviceRequestSpecialists = await get_service_request(Number(specialistsResult.service_request_id))
//       return serviceRequestSpecialists.specialist.length
//   } else {
//     return 0
//   }
// }

// const initialState: SpecialistsState = {
//   value: Number(localStorage.getItem('specialistsNum')),
//   // value: await test()
// }


// export const getCartItems = createAsyncThunk(
//   'api/specialists/',
//   async (name, thunkAPI) => {
//     try {
//       const resp = await axios('/api/specialists/');
//       return resp.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue('something went wrong');
//     }
//   }
// );


// export const getCartItems = createAsyncThunk(
//   'api/service_requests/{id}/',
//   async (arg) => {
//     const resp = await axios('api/service_requests/94/');
//     return resp.data;
//   }
// )



export const getCartItems = createAsyncThunk(
  'api/service_requests/{id}/',
  async (service_request_id: number, thunkAPI) => {
    try {
      const resp = await axios(`/api/service_requests/${service_request_id}/`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const getServiceRequest = createAsyncThunk(
  'api/specialists/',
  async (name, thunkAPI) => {
    try {
      // const dispatch = useDispatch<AppDispatch>();
      const resp = await axios(`/api/specialists/`);
      if (resp.data.service_request_id != null){
        // const dispatch = useDispatch<AppDispatch>();
        // thunkAPI.dispatch(getCartItems(resp.data.service_request_id));
        thunkAPI.dispatch(getCartItems(resp.data.service_request_id));
      }
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);


const initialState = {
  specialists: [],
  service_request_id: -1,
  value: Number(localStorage.getItem('specialistsNum')),
};


export const specialistsSlice = createSlice({
  name: 'specialists_num',
  initialState,
  reducers: {
    setNum: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
  },
  extraReducers: (builder) => {
  builder
      .addCase(getCartItems.pending, (state) => {
      // state.isLoading = true;
      })
      .addCase(getServiceRequest.fulfilled, (state, action) => {
        // state.specialists = action.payload.specialist;
        if (action.payload.service_request_id != null){
          state.service_request_id = action.payload.service_request_id;
          // localStorage.setItem("service_request_id", state.service_request_id.toString())
        }
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
      // console.log(action);
      // state.isLoading = false;
        state.specialists = action.payload.specialist;
        if (state.specialists){
          state.value = state.specialists.length
        }
      // state.service_request_id = 93;
      })
      .addCase(getCartItems.rejected, (state, action) => {
      // console.log(action);
      // state.isLoading = false;
      });
  },
})

export const {setNum } = specialistsSlice.actions

export default specialistsSlice.reducer