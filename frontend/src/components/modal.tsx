import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import OutlinedCardProfile from "./cardProfile";
import OutlinedCardStatus from "./cardStatus";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  p: 4,
};

const ModalComponent = ({
  row,
  sendStatus,
  handleClose,
  sendRequest,
}: {
  row: any;
  sendStatus: "idle" | "pending" | "connected";
  handleClose: () => void;
  sendRequest?: (userId: string) => void;
}) => {
  const { open } = row;
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Box sx={{ flexGrow: "1", borderRadius: "40px", height: 240 }}>
              <OutlinedCardProfile
                row={row}
                sendRequest={sendRequest ? sendRequest : () => {}}
                sendStatus={sendStatus}
              />
            </Box>
            <Box sx={{ flexGrow: "2", height: 240 }}>
              <OutlinedCardStatus row={row} />
            </Box>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ModalComponent;
