import postApi from "./postApi";

export const assembleAuthorizationHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export default {
  post: postApi,
};
