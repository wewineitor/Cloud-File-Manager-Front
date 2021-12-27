import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';

export const DirectoryScreen = () => {
    const [data, setData] = useState({
        path: '/',
        content: []
    })

    let {path} = useParams()
    let url

    if(path === undefined) {
        url = `http://192.168.0.16:4000/get-files`
    }
    else {
        url = `http://192.168.0.16:4000/get-files?path=${path}`
    }

    useEffect(() => {
        const getFiles = async(url) => {
            const request = await fetch(url);
            const response = await request.json()
            console.log(response)
            setData({
                path: response.path,
                content: response.data
            })
        }
        getFiles(url)
    }, [url])
    return (
        <div>
            {
                data.content !== null ? data.content.map( file => (
                    <p>
                        {file.indexOf('.') !== -1 ? <InsertDriveFileIcon/> : <FolderIcon/>} {file}
                    </p>
                ))
                : <CircularProgress/>
            }
        </div>
    )
}
