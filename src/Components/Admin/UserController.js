
import callAPI from "API/callAPI";

export const actFetchUsersRequest = async () => {
  return await callAPI("users", "GET", null).then((res) =>  console.log(res.data,'444'))
    };
  
  
  
  // **********************************************DELETE USER********************************************
//   export const actDeleteUserRequest = (id) => {
   
//       return callApi(`users/${id}`, "DELETE", null, token).then(res => {
//         dispatch(actFetchUsersRequest())
//       });
//     }
//   }