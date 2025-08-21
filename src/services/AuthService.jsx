export const register = (data) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.find((user) => user.email === data.email);
  // console.log("1", JSON.stringify(userExists));
  if (userExists) {
    return {
      status: false,
      msg: "Email already exists",
    };
  }
  users.push(data);
  localStorage.setItem("users", JSON.stringify(users));
  return {
    status: true,
    msg: "Your Registration is successful",
  };
};

export const login = (data) => {
  const { email, password } = data;
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const users = storedUsers.find((user) => user.email === email);
  // console.log("2", JSON.stringify({ storedUsers }));
  if (!users) {
    return {
      status: false,
      msg: "Email not found? Please Register.",
    };
  }
  if (users.password !== password) {
    return {
      status: false,
      msg: "Incorrect Password",
    };
  }
  localStorage.setItem("currentUser", JSON.stringify(users));
  return {
    status: true,
    msg: "Login Successful",
  };
};

export const reset = (data) => {
  const { email } = data;
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const users = storedUsers.find((user) => user.email === email);
  // console.log("3", JSON.stringify(storedUsers));
  if (!users) {
    return {
      status: false,
      msg: "Email not found.",
    };
  }
  return {
    status: true,
    msg: "Password reset link is send.",
  };
};
