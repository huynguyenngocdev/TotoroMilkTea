import axios from "axios";
import API_URL from "../Constants/API_URL";

const getToken = () => {
  const token = axios
    .post(`${API_URL}/auth`, {
      username: "admin",
      password: "admin",
    })
    .then((res) => {
      return res.data.access_token;
    });
  return token;
};

//get token
async function callAPI(endpoint, method = "GET", body){
  const token = await getToken();
  return axios({
    method: method,
    url: `${API_URL}/${endpoint}`,
    headers: { Authorization: `Bearer ${token}` },
    data: body,
  }).catch((err) => {
    console.log(err);
  });
};

export default callAPI;
