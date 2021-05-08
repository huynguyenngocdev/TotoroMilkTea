import axios from 'axios'
import * as API_URL from '../Constants/API_URL'
export default callAPI = (endpoint, method = 'GET', body) =>{
    return axios({
        method: method,
        url : `${API_URL}/${endpoint}`,
        data: body
    }).catch(err=>{
        console.log(err)
    })
}
export default API_URL;