import { portNum,password,dbname } from "./pass.js";

export default {
  
    mongodb: {
      dbURI:`mongodb+srv://rahul_kuttl:${password}@backend.tej4cni.mongodb.net/?retryWrites=true&w=majority`,
      dbName:`${dbname}`,
    },
    serverConfig: {
      port: process.env.PORT || `${portNum}`,
    },
  };
 