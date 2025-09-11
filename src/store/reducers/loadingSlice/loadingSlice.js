import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  clientId: "",
  memberID: 0,
  developerSearchType: "",
  ToggleModal: false,
};

export const loadingSlice = createSlice({
  name: "loadingSlice",
  initialState,
  reducers: {
    setLoading: (state, actions) => {
      state.loading = actions.payload;
    },
    setClientId: (state, actions) => {
      state.clientId = actions.payload;
    },
    setMemberId: (state, actions) => {
      state.memberID = actions.payload;
    },
    setDeveloperSearchType: (state, actions) => {
      state.developerSearchType = actions.payload;
    },
    setToggleModal: (state, actions) => {
      state.ToggleModal = actions.payload;
    },
  },
});
export const {
  setLoading,
  setClientId,
  setMemberId,
  setDeveloperSearchType,
  setToggleModal,
} = loadingSlice.actions;
export default loadingSlice.reducer;
