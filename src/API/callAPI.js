import axios from "axios";
import API_URL from "../Constants/API_URL";

//get token
async function callAPI(endpoint, method = "GET", body) {
  let token;
  await axios
    .post(`${API_URL}/auth`, {
      username: "admin",
      password: "admin",
    })
    .then((res) => {
      token = res.data.access_token;
    });
  return axios({
    method: method,
    url: `${API_URL}/${endpoint}`,
    headers: { Authorization: `Bearer ${token}` },
    data: body,
  }).catch((err) => {
    console.log(err);
  });
}

export default callAPI;
