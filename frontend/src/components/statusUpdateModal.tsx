import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface BasicModalProps {
  open: boolean;
  handleModalClose: () => void;
  handleOpen: () => void;
  onSubmit: (status: string) => void;
}

export default function BasicModal({
  open,
  handleModalClose,
  onSubmit,
  handleOpen,
}: BasicModalProps) {
  const [error, setError] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const status = data.get("status")?.toString();
    if (status === "") {
      setError("Enter a valid status");
    }
    onSubmit(status || "");
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Add status</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <form onSubmit={handleSubmit}>
              <TextareaAutosize
                minRows={3}
                style={{ width: "400px" }}
                name="status"
              />
              {error ? <p style={{ color: "red" }}>{error}</p> : null}
              <Button
                type="submit"
                sx={{ width: "100px", marginTop: 2 }}
                variant="contained"
              >
                submit
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
