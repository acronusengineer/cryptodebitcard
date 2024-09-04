import {
  CODEGO_API_URL,
  CODEGO_API_KEY,
  CODEGO_WHITELABEL_KEY,
  ENCRYPT_SECRET_KEY,
  INTERGIRO_API_URL,
  INTERGIRO_API_KEY
} from "@env";

const config = {
  codego_base_url: CODEGO_API_URL,
  codego_api_key: CODEGO_API_KEY,
  codego_white_key: CODEGO_WHITELABEL_KEY,
  encrypt_key: ENCRYPT_SECRET_KEY,
  Intergiro_api_key: INTERGIRO_API_KEY,
  Intergiro_api_url: INTERGIRO_API_URL
};

console.log("config settings");

export default config;
