import { useEffect, useState } from "react";
import Tables from "../../components/table";
import ModalComponent from "../../components/modal";
import { useDispatch, useSelector } from "react-redux";
import { headings } from "../../services/genericConstants";
import {
  fetchUsers,
  getSendStatus,
  getUsers,
  resetSendStatus,
  sendRequest,
} from "./users.slice";

const initialModalState = {
  open: false,
  name: "",
  status: "",
  friends: 0,
  email: "",
};

const User = () => {
  const dispatch: any = useDispatch();
  const [showModal, setShowModal] = useState<any>({ initialModalState });
  const users = useSelector(getUsers);
  const sendStatus = useSelector(getSendStatus);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(fetchUsers({ userId }));
  }, []);

  const showDetails = (row: any) => {
    setShowModal({
      ...row,
      open: true,
    });
  };

  const closeDetails = () => {
    setShowModal({
      ...initialModalState,
      open: false,
    });
  };

  const handleSendRequest = (receiverId: string) => {
    dispatch(sendRequest({ userId, receiverId }));
    dispatch(resetSendStatus(receiverId as any));
  };

  return (
    <>
      <h2>Users</h2>
      <Tables headings={headings} data={users} showDetails={showDetails} />
      <ModalComponent
        row={showModal}
        handleClose={closeDetails}
        sendRequest={handleSendRequest}
        sendStatus={sendStatus}
      />
    </>
  );
};

export default User;
