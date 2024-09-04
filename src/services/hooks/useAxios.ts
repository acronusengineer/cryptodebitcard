import axios from "axios";


const useAxios = () => {

    const CODEGO_PROXY_URL = "https://callcodegoapi-yqczmykqxa-uc.a.run.app";

    const axiosGet = (url: string) => axios.get(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    })

    const axiosPost = (url: string, body: any, _header?: any) => axios.post(CODEGO_PROXY_URL, body,
        {
            headers: {
                url: url,
                "Content-Type": "application/json",
                Accept: "application/json",
                ..._header
            }
        }
    )

    const axiosPatch = (url: string, body: any) => axios.patch(url, body, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    })

    const axiosDelete = (url: string, body: any) => axios.delete(url, {
        data: body,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    })


    return {
        axiosGet,
        axiosPost,
        axiosPatch,
        axiosDelete,
    }

}

export default useAxios;