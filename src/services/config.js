const devBaseURL = "http://123.207.32.32:9001";//开发环境url
const proBaseURL = "http://123.207.32.32:9001";//生产环境url
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL;

export const TIMEOUT = 5000;
