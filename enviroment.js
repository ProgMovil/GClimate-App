import Constants from "expo-constants";

const ENV={
        
    dev:{
        apiUrl:"https://rapidapi.p.rapidapi.com",
        apiKey:"1e1c74f627mshc748eacd7734ccbp1aca17jsnf35731516a60",
        apiHost:"weatherapi-com.p.rapidapi.com"
    },
    default:{
        apiUrl:"https://rapidapi.p.rapidapi.com",
        apiKey:"1e1c74f627mshc748eacd7734ccbp1aca17jsnf35731516a60",
        apiHost:"weatherapi-com.p.rapidapi.com"
    }

};

const getEnvVars = (env = Constants.manifest.releaseChannel)=>{
   
    if(__DEV__){
        return ENV.dev;
    } else if (env === 'default'){
        return ENV.default
    }

};

export default getEnvVars;
