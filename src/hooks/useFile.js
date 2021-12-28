import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const useFile = () => {
    const [data, setData] = useState({
        path: '/',
        content: []
    })

    let {path} = useParams()
    let url

    if(path === undefined) url = `http://192.168.0.16:4000/get-files`
    else url = `http://192.168.0.16:4000/get-files?path=${path}`

    const getFiles = async(url) => {
        const request = await fetch(url);
        const response = await request.json()
        console.log(response)
        setData({
            path: response.path,
            content: response.data
        })
    }

    useEffect(() => {

        getFiles(url)
    }, [url])

    return {data, path, url, getFiles}
}