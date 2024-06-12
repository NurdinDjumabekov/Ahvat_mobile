import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    //// данные пользователя
    seller_guid: "",
    seller_fio: "",
    point_name: "",
  },
};

const saveDataSlice = createSlice({
  name: "saveDataSlice",
  initialState,
  reducers: {
    changeLocalData: (state, action) => {
      state.data = action.payload;
    },
    clearLocalData: (state, action) => {
      state.data = {
        seller_guid: "",
        seller_fio: "",
        point_name: "",
      };
    },
  },
});

export const { changeLocalData, clearLocalData } = saveDataSlice.actions;

export default saveDataSlice.reducer;
