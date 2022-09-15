import { axiosPrivate } from "../utils/axios";
import { useEffect, useRef } from "react";
import { useRefreshToken } from "../hooks/useRefreshToken";
import { useAuth } from "./useAuth";

export const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Autorization"]) {
                    config.headers[
                        "Autorization"
                    ] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
            }
        );

        return () => {
            axiosPrivate.interceptors.response.eject(responseInterceptor);
        };
    }, [auth, refresh]);

    return axiosPrivate;
};
