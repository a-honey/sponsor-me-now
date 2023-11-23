import axios, { AxiosResponse } from "axios";

export const getIamPortToken = async (): Promise<{
  access_token: string;
  now: number;
  expired_at: number;
}> => {
  const result: AxiosResponse<any, any> = await axios({
    url: "https://api.iamport.kr/users/getToken",
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: {
      imp_key: process.env.IMP_REST_API_KEY,
      imp_secret: process.env.IMP_REST_API_SECRET,
    },
  });
  return result.data.response;
};
