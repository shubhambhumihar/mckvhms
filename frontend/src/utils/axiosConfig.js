export const base_url = "http://localhost:5000/api/v1/";

const getTokenfromLocalStorage = localStorage.getItem("user-frontend")
  ? JSON.parse(localStorage.getItem("user-frontend"))
  : null;

// console.log(getTokenfromLocalStorage.tkn);

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenfromLocalStorage !== null ? getTokenfromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};
