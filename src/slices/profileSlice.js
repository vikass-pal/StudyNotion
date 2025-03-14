import { createSlice } from "@reduxjs/toolkit"
import { ACCOUNT_TYPE } from "../utils/constants"

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    loading: false,
};

// Problem occured and solved
// initially i mark user data as nulll
// as i refresh the page user becomes null , so login / signup buttons are not visible - In case of user not logged
// case - User logged but as i refresh , dashboard dropdown becomes invisible
// solution - try getting value from localStorage otherwise mark it as null


const profileSlice = createSlice({
    name: "profile",
    initialState: {
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
        loading: false,
    },
    reducers: {
        setUser(state, value) {
            state.user = {
                ...value.payload,
                accountType: value.payload.accountType?.toLowerCase() === "instructor"
                  ? ACCOUNT_TYPE.INSTRUCTOR
                  : value.payload.accountType,
            };
        },
    },
});

export const { setUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer;