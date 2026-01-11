
import api from "../api/axios";
import toast from "react-hot-toast";

const logout = async () => {
  try {
    const response = await api.get("/api/v1/registration/logout");
    toast.success(response.data.message)
    window.location.replace("/login");
  } catch (error) {
    console.log(
      error?.response?.data?.message || "Something wen wrong, Please try again"
    );
    toast.error(
      error?.response?.data?.message || "Something wen wrong, Please try again"
    );

    window.location.replace("/login");
  }
};

export default logout;
