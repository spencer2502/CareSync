
import dotenv from "dotenv";
dotenv.config(); 

import multichainNode from "multichain-node";

const multichain = multichainNode({
  port: process.env.MULTICHAIN_PORT,
  host: process.env.MULTICHAIN_HOST,
  user: process.env.MULTICHAIN_USER,
  pass: process.env.MULTICHAIN_PASS,
});

export default multichain;
