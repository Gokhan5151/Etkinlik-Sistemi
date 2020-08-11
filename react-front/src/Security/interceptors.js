var axios=require("axios")


export const token=localStorage.getItem("Auhorization");
axios.interceptors.request.use(
        function(config){
            if(token)
            config.headers["Authorization"]="Bearer "+token;

            return config;
        },
        function(err){
               return Promise.reject(err);
        }
    )
