const logout = () => {
  localStorage.removeItem("yadm-user-email");
  localStorage.removeItem("yadm-auth-key");
  localStorage.removeItem("yadm-pwd");
  location.reload();
};

export default logout;
