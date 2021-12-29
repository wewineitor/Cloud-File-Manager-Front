import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ModalUpFile = ({type, open, handleClose, path, setData}) => {

  const getFiles = async(url) => {
    const request = await fetch(url);
    const response = await request.json()
    console.log(response)
    setData({
      path: response.path,
      content: response.data
    })
  }

  const uploadFile = async(e) => {
    e.preventDefault()
    let url, url_getFiles
    if(path === undefined) {
      url = `http://192.168.0.16:4000/upload`
      url_getFiles = `http://192.168.0.16:4000/get-files`
    }
    else {
      url = `http://192.168.0.16:4000/upload?path=${path}`
      url_getFiles = `http://192.168.0.16:4000/get-files?path=${path}`
    }
    const data = new FormData(e.target)

    await fetch(url, {
      method: 'POST',
      body: data
    }) 
    getFiles(url_getFiles)
    handleClose()
  }

  const createDirectory = async(e) => {
    e.preventDefault()
    let url, url_getFiles
    if(path === undefined) {
      url = `http://192.168.0.16:4000/create-directory`
      url_getFiles = `http://192.168.0.16:4000/get-files`
    }
    else {
      url = `http://192.168.0.16:4000/create-directory?path=${path}`
      url_getFiles = `http://192.168.0.16:4000/get-files?path=${path}`
    }
    const data = new FormData(e.target)
    console.log(data);

    await fetch(url, {
      method: 'POST',
      body: data
    }) 
    getFiles(url_getFiles)
    handleClose()
  }

  return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sube tu archivo
          </Typography>
          
          {
          type === 'upload' ? 
            <form encType="multipart/form-data" method='POST' onSubmit={uploadFile}>
              <input type="file" name="foo"/>
              <br />
              <Button variant="contained" type='submit' >Subir</Button>
            </form>
            :
            <form method='POST' onSubmit={createDirectory}>
              <input type="text" name="newDirectory"/>
              <br />
              <Button variant="contained" type='submit' >Crear</Button>
            </form>
          }
        </Box>
      </Modal>
  )
}
