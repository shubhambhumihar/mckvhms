export const base_url = "http://localhost:5000/api/v1/";

const getTokenfromLocalStorage = () =>
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

// console.log(getTokenfromLocalStorage);

export const config = () => {
  return {
    headers: {
      // "Content-Type": "multipart/form-data",
      // "Content-Type": "application/json",
      Authorization: `Bearer ${
        getTokenfromLocalStorage() !== null
          ? getTokenfromLocalStorage().token
          : ""
      }`,
      Accept: "application/json",
    },
  };
};
