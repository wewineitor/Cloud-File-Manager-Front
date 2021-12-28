import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import styled from "styled-components";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Button from '@mui/material/Button';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { ModalUpFile } from "./ModalUpFile";

const FileContainer = styled.div `
width: 80vw;
margin: auto;
display: flex;
flex-direction: column;
`

const FileItem = styled.div `
font-weight: 400;
font-size: 30px;
font-family: Helvetica;
border: 1px solid;
border-radius: 5px;
padding: 15px;
margin-bottom: 1rem;
display: flex;
cursor: pointer;
`

const ButtonUpFile = styled(Button) `
&& {
    padding: 10px;
    margin-bottom: 1rem;
    margin-top: 1rem;
    font-size: 20px;
    font-weight: 600;
}
`
export const DirectoryScreen = () => {
    const [data, setData] = useState({
        path: '/',
        content: []
    })
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const navigate = useNavigate()

    const handleNavigate = (path_param) => {
        if(path !== undefined) {
            path +=`-${path_param}`
            navigate(`/${path}`)
        }
        else navigate(`/${path_param}`)
    }
    return (
        <FileContainer>
            <ButtonUpFile variant="contained" endIcon={<UploadFileIcon />} onClick={handleOpen}>
                Subir archivo
            </ButtonUpFile>
            <ButtonUpFile variant="contained" endIcon={<CreateNewFolderIcon />}>
                Crear directorio
            </ButtonUpFile>

            <ModalUpFile open = {open} handleClose = {handleClose} path={path} setData = {setData}/>
            {
                path !== undefined ? 
                <FileItem onClick={() => navigate(-1)}>
                    <ArrowUpwardIcon/> Regresar...
                </FileItem>
                : null
            }
            {
                data.content !== null ? data.content.map( file => (
                    <FileItem key = {file} onClick={() => handleNavigate(file)}>
                        {file.indexOf('.') !== -1 ? <InsertDriveFileIcon fontSize="large"/> : <FolderIcon fontSize="large"/>} {file}
                    </FileItem>
                ))
                : <CircularProgress/>
            }
        </FileContainer>
    )
}
