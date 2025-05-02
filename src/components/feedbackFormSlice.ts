import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedbackFormState } from "../types/feedback";

const initialState: FeedbackFormState = {
    fio: "",
    phone: "",
    email: "",
    date: null,
    comment: "",
};

export const feedbackFormSlice = createSlice({
    name: "feedbackForm",
    initialState,
    reducers: {
        setFio: (state, action: PayloadAction<string>) => {
            state.fio = action.payload;
        },
        setPhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setDate: (state, action: PayloadAction<Date | null>) => {
            state.date = action.payload ? action.payload.toISOString() : null;
        },
        setComment: (state, action: PayloadAction<string>) => {
            state.comment = action.payload;    
        },
        resetForm: (state) => {
            state.fio = "";
            state.phone = "";
            state.email = "";
            state.date = null;
            state.comment = "";
        },
    },
});
export const { setFio, setPhone, setEmail, setDate, setComment, resetForm } = feedbackFormSlice.actions;
export default feedbackFormSlice.reducer;
export const selectFeedbackForm = (state: { feedbackForm: FeedbackFormState }) => state.feedbackForm;