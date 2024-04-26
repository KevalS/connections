import List from "@mui/material/List";
import RequestList from "../../components/requestList";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import {
  acceptRequests,
  fetchRequests,
  getAccpectStatus,
  getRejectStatus,
  getRequests,
  rejectRequests,
} from "./request.slice";
import { useDispatch, useSelector } from "react-redux";

const Request = () => {
  const dispatch: any = useDispatch();

  const requests = useSelector(getRequests);
  const accpectStatus = useSelector(getAccpectStatus);
  const rejectStatus = useSelector(getRejectStatus);
  const userId = localStorage.getItem("userId");

  const getRequestList = () => {
    dispatch(fetchRequests({ userId }));
  };

  useEffect(() => {
    getRequestList();
  }, []);

  const onAccept = async (requestId: string) => {
    await dispatch(acceptRequests({ userId, requestId }));
    getRequestList();
  };
  const onReject = async (requestId: string) => {
    await dispatch(rejectRequests({ userId, requestId }));
    getRequestList();
  };
  return (
    <Box sx={{ margin: 0 }}>
      <h2>Requests</h2>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <RequestList
          requests={requests.requests}
          onAccept={onAccept}
          onReject={onReject}
          accpectStatus={accpectStatus}
          rejectStatus={rejectStatus}
        />
      </List>
    </Box>
  );
};

export default Request;
