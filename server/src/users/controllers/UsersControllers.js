const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const authConfig = process.env.GERANDO_TOKEN_LOGIN

const User = mongoose.model('User')

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service:'gmail',
    // secure: false, // true for 465, false for other ports
    auth: {
        user: 'ssergiojunioleal@gmail.com',
        pass: '96321458xz',
    },
});

const info = (code) => ({
    from: '11702540@aluno.cotemig.com.br',
    to: "ssergiojunioleal@gmail.com",
    subject: "Cruchyroll", // Subject line
    html: `O seu codigo de acesso => ${code}`, // html body
})

function generateToken(params = {}){
    return jwt.sign(params, authConfig,{
        expiresIn: 86400,
    });
}

module.exports = {
    async login(req, res){
        const {tokenAccess} = req.body;

        const user = await User.findOne({tokenAccess})
        
        if(!user) return res.status(400).send({error:'fail'});

        user.tokenAccess = undefined;
        user.password = undefined;
            
        if(user) return res.json({user, token:generateToken({id: user.id})})
    },

    async store(req, res){
        const {nome, password, email} = req.body;

        try{
            if(await User.findOne({email}))
                return res.status(400).send({error:'Email_já_em_uso!'});

            const randomico = Math.floor((Math.random() * 10000000) + 9);

            const user = await User.create({
                nome,
                password,
                email,
                codeAccess: randomico,
                primeOne:false,
                primeTwo:false,
                primeTree:false
            });

            transporter.sendMail(info(randomico),(err, result)=>{
                if(err) return res.json({err})
                return res.json('success')
            })

            user.password = undefined;

            return res.send({user, token:generateToken({id: user.id})});

        }catch(err){
            return res.status(400).send({error:'fail'})
        }
    },

    // async update(req, res){
    //     const {user} = req.headers
    //     const {nome, password, email, image} = req.body;       

    //     const LoggedUser = await User.findById(user)

    // try {
        
    //     const sendUpdate = await User.findByIdAndUpdate(req.params.id, {
    //         nome,
    //         password,
    //         email,
    //         image: LoggedUser.image === image ? image : (await cloudinary.uploader.upload(image,{upload_preset: 'MyBloguinhoHalloween'})).url
    //     }, {new:true});

    //     res.json(sendUpdate);
        
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).json({ err: 'Something went wrong' });
    //     }

    // },

    // async viewPostSave(req, res){
    //     const {user} = req.headers

    //     const LoggedUser = await User.findById(user)
        
    //     const post = await Post.find()

    //     const use = post.find(ress => ress.peopleSave)

    //     // console.log(use)
        
    //     // const teste = post.filter(rest => rest._id === use)

    //     return res.json(use)
    // },

    // async savePosts(req, res){
    //     const {user} = req.headers
    //     const {idPost} = req.params
        
    //     const LoggedUser = await User.findById(user);
    //     const TargetUser = await Post.findById(idPost);

    //     // const filterIdPost = LoggedUser.savePost.map(res => res.posters === idPost)

    //     TargetUser.peopleSave.push(user)

    //     await TargetUser.save()
    //     // if(!filterIdPost){
    //     // }else{
    //     //     return res.status(400).send({error:'Você já salvou'});
    //     // }

    //     return res.json({ok:true})
    // }
};