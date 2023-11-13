import axios from 'axios';
import { notificationMessages,SERVICE_URLS } from '../constants/config';

const API_URL='http://localhost:3000'


const axiosInstance=axios.create({
    baseURL:API_URL,
    timeout:10000,
    headers:{
        "Content-Type":"application/json"
    }

})
axiosInstance.interceptors.request.use(
    function(config){
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)
axiosInstance.interceptors.response.use(
    function(response){
        //stop global loader here
        return processResponse(response);
    },
    function(error){
        return Promise.reject(processError(error));
    }
)

////////////////////////////////////
// if sucess->return{isSucess:true,data:object}
//if fail ->return{isFailure:true,string:string,msg:string,code:int}
////////////////////////////////////////
const processResponse=(response)=>{
      if(response?.status===200)
      {
        return {isSucess:true,data:response.data}
      }
      else
      {
        return {
            isFailure:true,
            status:response?.status,
            msg:response?.msg,
            code:response?.code
        }
      }
}
const processError = (error) => {
    if (error.response) {
      return {
        isError: true,
        msg: notificationMessages.responseFailure,
        code: error.response.status,
      };
    } else if (error.request) {
      return {
        isError: true,
        msg: notificationMessages.requestFailure,
        code: "",
      };
    } else {
      return {
        isError: true,
        msg: notificationMessages.networkError,
        code: "",
      };
    }
  };
  

const API={};
for(const [key,value] of Object.entries(SERVICE_URLS))
{
    API[key] = (body, showUploadProgress, showDownloadProgress) => {
        // Return the Axios request promise
        return axiosInstance({
          method: value.method,
          url: value.url,
          data: body,
          responseType: value.responseType,
          onUploadProgress: function (progressEvent) {
            if (showUploadProgress) {
              let percentagecomp = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              showUploadProgress(percentagecomp);
            }
          },
          onDownloadProgress: function (progressEvent) {
            if (showDownloadProgress) {
              let percentagecomp = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              showDownloadProgress(percentagecomp);
            }
          },
        });
      };
    }
    


export {API};