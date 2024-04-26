import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { avatarStyle, btnStyle, gridStyle, paperStyle } from "./style";
import { isEmail } from "../../services/genericFunctions";
import CircularProgress from "@mui/material/CircularProgress";
import { useButtonHook } from "../../hooks/buttonHook";
import { ErrorMessage } from "../../components/errorMessage";
import { loginUser } from "./login.slice";
import { useDispatch } from "react-redux";

interface LoginProps {}

const Login = ({}: LoginProps) => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { isLoading, setIsLoading } = useButtonHook();

  const handleSubmit = async () => {
    if (!isEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    setIsLoading(true);
    await dispatch(loginUser({ email })).then((data: any) => {
      if (data.error) {
        setError("Something went wrong");
        setIsLoading(false);
        return;
      }

      localStorage.setItem("userId", data.payload.user_id);

      if (data.payload.new_user) {
        navigate("/user-update");
        return;
      } else {
        navigate("/users");
        return;
      }
    });
  };
  return (
    <Grid style={gridStyle}>
      <Paper elevation={10} style={paperStyle}>
        <Grid>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2 style={{ display: "flex", justifyContent: "center" }}>
            Enter an email
          </h2>
        </Grid>
        <TextField
          label="Email"
          placeholder="Enter email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          error={!!error}
        />
        <ErrorMessage error={error} />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnStyle}
          onClick={handleSubmit}
          fullWidth
          disabled={isLoading}
          endIcon={
            isLoading ? <CircularProgress color="inherit" size={15} /> : null
          }
        >
          Submit
        </Button>
      </Paper>
    </Grid>
  );
};

export default Login;
