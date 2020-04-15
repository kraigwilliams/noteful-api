const express = require('express')
const path = require('path')
const FoldersService = require('./folder-service')
const xss= require('xss')


const foldersRouter = express.Router()
const jsonParser = express.json()

serializeFolder= folder =>({
  id:folder.id,
  name:folder.name  
})

foldersRouter

.route('/')

.get((req,res,next)=>{
    const knexInstance= req.app.get('db')
    FoldersService.getAllFolders(knexInstance)
    .then(folders=>{
        res.json(folders)
    })
    .catch(next)
})

.post(jsonParser,(req,res,next)=>{
    const{name} = req.body
    const knexInstance = req.app.get('db')
    const newFolder={name}
    
    
FoldersService.addFolder(knexInstance,newFolder)
.then(folder=>{
    res
    .status(201)
          .location(path.posix.join(req.originalUrl, `/${folder.id}`))

          .json(serializeFolder(folder));
})
})



module.exports= foldersRouter