import axios from "axios";

const logout = async () => {
  try {
    await axios.get("/api/v1/registration/logout");

    window.location.replace("/login");
  } catch (error) {
    console.log(
      error?.response?.data?.message || "Something wen wrong, Please try again"
    );
    window.location.replace("/login");
  }
};

export default logout;
