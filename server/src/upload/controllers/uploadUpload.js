const mongoose = require('mongoose')

const { cloudinary } = require('../../utils/cloudinary');

const Upload = mongoose.model('Upload')
const User = mongoose.model('User')

module.exports = {

    async index(req, res){
        const {user} = req.headers

        // const {teste} = req.body

        // const parsed = teste.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
        
        // if(parsed.mess) return res.json({erro: 'falhaaaaaa'})

        const docs = await Upload.find().sort({createdAt: -1})

        const mapDocs = await docs.map(re => re)

        if(user){

            const getInfoUser = await User.findById(user)
    
            // console.log(getInfoUser)

            if(!!getInfoUser.primeTree){
                // console.log('com acesso')
                
                const mapRoom = mapDocs.filter(get => get.category === "Hentai" || "Anime")
                return res.json(mapRoom)
                
            }else{
                // console.log('sem acesso')
                const mapRoom = mapDocs.filter(get => get.category === "Anime")
                return res.json(mapRoom)
                
            }

        }

        if(!user){
            // console.log('sem info')
            const mapRoom = mapDocs.filter(get => get.category === "Anime")
            return res.json(mapRoom)
        }

    },

    async searchFolder(req, res){
        const {user} = req.headers
        const { fileAnimeName } = req.body

        try{
    
            const anime = await Upload.find({
                nameFolder:{
                    $in:fileAnimeName.split('').map(te => fileAnimeName.trim().toLowerCase())
                }
            })
    
            if(anime.length != 0){
                return res.json(anime)
            }else{

                const getInfoUser = await User.findById(user)

                if(!getInfoUser.primeTree){
                    return res.status(500).json({notAccess:true})
                }else{
                    return res.status(200).json({error:true})
                }

            }

        }catch(err){
            return res.json(err)
        }
    },

    async createFolder(req, res){
        const { description, urlImage, folder, category } = req.body;

        try{

            const createFolder = await Upload.create({
                nameFolder:folder.trim().toLowerCase(),
                description: description.trim(),
                category,
                urlImage:(await cloudinary.uploader.upload(urlImage,{
                    upload_preset: 'MyBloguinhoHalloween',
                    folder:`video_upload/${folder.toLowerCase()}`
                })).url,
            })

            return res.json(createFolder)

        }catch(err){
            return res.json(err)
        }
    },

    async uploadVideo(req, res){

        const {linkFolder} = req.params

        const folderLink = await Upload.findById(linkFolder)

        const {episode, description, urlVideo} = req.body;

        try{
            folderLink.videos.push({
                episode,
                description,
                urlVideo:(await cloudinary.uploader.upload(urlVideo,{
                    upload_preset: 'MyBloguinhoHalloween',
                    resource_type: "video",
                    chunk_size:6000000,
                    folder:`video_upload/${folderLink.nameFolder}`
                })).url,
            })

            await folderLink.save()

            return res.json(folderLink)
            
        }catch(err){
            // console.log(err)
        }
    }
}