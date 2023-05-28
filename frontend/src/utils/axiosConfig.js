export const base_url = "https://backendhostel.onrender.com/api/v1/";
// export const base_url = "https://backendrec.onrender.com/api/v1/";

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
