const getTokenfromLocalStorage = () =>
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

// console.log(getTokenfromLocalStorage.token);

export const config = () => {
  return {
    headers: {
      Authorization: `Bearer ${
        getTokenfromLocalStorage() !== null
          ? getTokenfromLocalStorage().token
          : ""
      }`,
      Accept: "application/json",
    },
  };
};
