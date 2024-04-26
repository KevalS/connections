import { useEffect, useState } from "react";
import Tables from "../../components/table";
import ModalComponent from "../../components/modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends, getFriends } from "./friends.slice";
import { headings } from "../../services/genericConstants";

const initialModalState = {
  open: false,
  name: "",
  status: "",
  friends: 0,
  email: "",
};

const Friends = () => {
  const dispatch: any = useDispatch();
  const [showModal, setShowModal] = useState<any>({ initialModalState });
  const friends = useSelector(getFriends);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(fetchFriends({ userId }));
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

  return (
    <>
      <h2>Friends</h2>
      <Tables headings={headings} data={friends} showDetails={showDetails} />
      <ModalComponent
        row={showModal}
        handleClose={closeDetails}
        sendStatus={"connected"}
      />
    </>
  );
};

export default Friends;
