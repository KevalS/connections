import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import {
  avatarStyle,
  btnStyle,
  gridStyle,
  paperStyle,
  userUpdateWrapper,
} from "./style";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useButtonHook } from "../../hooks/buttonHook";
import { isValidName } from "../../services/genericFunctions";
import { useEffect, useState } from "react";
import { ErrorMessage } from "../../components/errorMessage";
import { useDispatch } from "react-redux";
import { updateUser } from "./userUpdate.slice";

interface UserUpdateProps {}

const initialErrors = { firstName: "", lastName: "", common: "" };
const UserUpdate = ({}: UserUpdateProps) => {
  const dispatch: any = useDispatch();
  const [errors, setErrors] = useState(initialErrors);
  const { isLoading, setIsLoading } = useButtonHook();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId") || "";
  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (event: any) => {
    setIsLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const payload = {
      firstName: data.get("firstName")?.toString() || "",
      lastName: data.get("lastName")?.toString() || "",
    };

    const firstNameValid = isValidName(payload.firstName);
    const lastNameValid = isValidName(payload.lastName);

    if (!firstNameValid) {
      setErrors({ ...errors, firstName: "Enter a valid first name" });
    }

    if (!lastNameValid) {
      setErrors({ ...errors, lastName: "Enter a valid last name" });
    }
    if (!firstNameValid || !lastNameValid) {
      setIsLoading(false);
      return;
    }

    await dispatch(
      updateUser({
        firstName: payload.firstName,
        lastName: payload.lastName,
        userId,
      })
    ).then((data: any) => {
      if (data.error) {
        setErrors({ ...errors, common: "Something went wrong" });
        setIsLoading(false);
        return;
      }

      navigate("/users");
    });

    setIsLoading(false);
    navigate("/users");
  };
  return (
    <Grid style={gridStyle}>
      <Paper elevation={10} style={paperStyle}>
        <Grid>
          <Avatar style={avatarStyle}>
            <Avatar alt="Akhil" />
          </Avatar>
          <h2 style={{ display: "flex", justifyContent: "center" }}>
            Update Deatils
          </h2>
        </Grid>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box sx={userUpdateWrapper}>
            <div>
              <TextField
                label="First Name"
                placeholder="Enter first name"
                name="firstName"
                id="firstName"
                variant="outlined"
                fullWidth
                type="text"
                error={!!errors.firstName}
              />
              <ErrorMessage error={errors.firstName} />
            </div>
            <div>
              <TextField
                label="last Name"
                placeholder="Enter last name"
                name="lastName"
                variant="outlined"
                fullWidth
                type="text"
                error={!!errors.lastName}
              />

              <ErrorMessage error={errors.lastName} />
            </div>

            {errors.common ? (
              <div>
                <ErrorMessage error={errors.common} />
              </div>
            ) : null}
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnStyle}
              fullWidth
              disabled={isLoading}
              endIcon={
                isLoading ? (
                  <CircularProgress color="inherit" size={15} />
                ) : null
              }
            >
              Update
            </Button>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default UserUpdate;
