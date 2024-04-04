
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '@/api/axios';
import getAccessTokenFromCookie from '@/utils/getAccessToken';

const accessToken = getAccessTokenFromCookie();
export const createUser = createAsyncThunk('createUser', async (data, {getState, rejectWithValue }) => {

  try {
      // Access the current state
      const state = getState();
      // Extract the employeId from the state
      const employeId = state.Onboardingpersdetails.employeId;
      const employePersonalData = state.Onboardingpersdetails.personalData;
      console.log("the employePersonalData",employePersonalData);

      console.log("employeId",employeId);

    const response = await axios.put(`/employee/${employeId}`, employePersonalData,{
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
    
    console.log("personal",response);
    return response.data; 
    // const hrDetails = await axios.get(`/employee/${response.data.id}`, {
    //   params: { userId: response.data.id },
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });
    // console.log("hr data",hrDetails.data);

    // return hrDetails.data


  } catch (error) {
    console.log("error personal",error);
    console.log("error of the axios",error.message);
    
    return rejectWithValue(error.message);
    
  }
}
);

export const createCompany = createAsyncThunk('createCompany', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put('/organization', data,{
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
    
    console.log(response);
    // return response.data; 

  } catch (error) {
    console.log("error company",error);
    console.log("error of the axios company",error.message);
    
    // return rejectWithValue(error.message);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);

      // Optionally, you can reject with custom error message or error response
      // This is useful for providing more detailed feedback to your Redux store
      return rejectWithValue(error.response.data);
    
    }
  }
});

export const Onboardingpersdetails = createSlice({
  name: 'Onboardingpersdetails',
  initialState: {
    personalData:{},
    companyData:{},
    employeId:null,
    OnboardingData:null,
    loading: false,
    error: null,
  },
  reducers: {
    setPersonalData:(state,action) => {
      state.personalData = action.payload
    },
    setCompanyData:(state,action) => {
      state.companyData = action.payload
    },
    setemployeId:(state,action) => {
      state.employeId = action.payload
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null; // Clear any previous errors
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        // state.OnboardingData.push(action.payload);
        state.OnboardingData = action.payload
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setPersonalData, setCompanyData, setemployeId } = Onboardingpersdetails.actions;
export default Onboardingpersdetails.reducer;