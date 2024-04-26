import { Header } from "../../components/header";
import DrawerComponent from "../../components/drawer";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Header />
      <DrawerComponent />
      <div style={{ margin: "80px 20px 80px 20px" }}>
        <Outlet />
      </div>
    </>
  );
};
export default Dashboard;
