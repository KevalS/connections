import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { AcceptRequests, FetchRequests, RejectRequests } from "../../api/api";

export const fetchRequests = createAsyncThunk(
  "user/fetchRequests",
  ({ userId }: { userId: string | null }) => FetchRequests(userId)
);

export const acceptRequests = createAsyncThunk(
  "user/acceptRequests",
  ({ userId, requestId }: { userId: string | null; requestId: string }) =>
    AcceptRequests(userId, requestId)
);

export const rejectRequests = createAsyncThunk(
  "user/rejectRequests",
  ({ userId, requestId }: { userId: string | null; requestId: string }) =>
    RejectRequests(userId, requestId)
);

export interface Request {
  createdAt: string;
  id: string;
  receiverId: string;
  senderId: string;
  firstName: string;
  lastName: string;
}

interface RequestState {
  requests: Request[];
  acceptStatus: "idle" | "pending";
  rejectStatus: "idle" | "pending";
  error: string;
}

const initialState: RequestState = {
  requests: [],
  acceptStatus: "idle",
  rejectStatus: "idle",
  error: "",
};

const RequestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRequests.fulfilled, (state, payload: any) => {
        state.requests = payload.payload.map((data: any) => ({
          createdAt: data.created_at,
          id: data.id,
          receiverId: data.receiver_id,
          senderId: data.sender_id,
          firstName: data.first_name,
          lastName: data.last_name,
        }));
        state.error = "";
      })
      .addCase(fetchRequests.rejected, (state) => {
        state.error = "Something went wrong";
      })
      .addCase(acceptRequests.pending, (state) => {
        state.acceptStatus = "pending";
      })
      .addCase(acceptRequests.fulfilled, (state) => {
        state.acceptStatus = "idle";
      })
      .addCase(acceptRequests.rejected, (state) => {
        state.acceptStatus = "idle";
      })
      .addCase(rejectRequests.pending, (state) => {
        state.rejectStatus = "pending";
      })
      .addCase(rejectRequests.fulfilled, (state) => {
        state.rejectStatus = "idle";
      })
      .addCase(rejectRequests.rejected, (state) => {
        state.rejectStatus = "idle";
      });
  },
});

export const {} = RequestSlice.actions;

export const getRequests = ({ request }: any) => request || [];
export const getAccpectStatus = ({ request }: any) =>
  request.acceptStatus || [];
export const getRejectStatus = ({ request }: any) => request.rejectStatus || [];

export default RequestSlice.reducer;
