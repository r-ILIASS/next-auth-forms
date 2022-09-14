// hooks
import { useAuth } from "./useAuth";
//utils
import axios from "../utils/axios";

export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const res = await axios.get("/refresh", {
      withCredentials: true, // important: send httpOnly cookies with request
    });

    setAuth((prev) => {
      console.log("Previous State", prev); // TODO:
      console.log(res.data.accessToken); // TODO:
      return { ...prev, accessToken: res.data.accessToken };
    });

    return res.data.accessToken;
  };

  return refresh;
};
