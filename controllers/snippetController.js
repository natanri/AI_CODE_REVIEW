const Snippet = require("../models/Snippet");
const OpenAI = require("openai");

//OPENAI
const openai = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: "https://api.deepseek.com"
});

//Home
exports.getHome = async (req, res) => {    
    const snippets = await Snippet
        .find({userId: req.user.id})
        .sort({ createdAt: -1});

    res.render('index', {snippets})
};

//Form create
exports.createForm = (req, res) => {
    res.render('create');
};

//Create
exports.createSnippet = async (req, res) => {        

    const {title, code, analysis, improvedCode} = req.body;

    try{
        //Llamada a la IA
        const response = await openai.chat.completions.create({
            model: "deepseek-chat",
            messages: [
                {
                    role: "system",
                    content: "You are a senior software engineer."
                },
                {
                    role: "user",
                    content: `
                
                 Analyze this code and respond ONLY in JSON format:
                {                
                    "analysis": "...",
                    "improvedCode": "..."
                }
                Code:
                    ${code}
                    `
               }
            ]                
            
        });

        const aiText = response.choices[0].message.content;

        //Convertir respuesta a JSON
        let analysis = '';
        let improvedCode = '';

        try{
            const cleanText = aiText
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim();
            const parsed = JSON.parse(cleanText);

            analysis = parsed.analysis;
            improvedCode = parsed.improvedCode;
        } catch (err){
            analysis = aiText
            improvedCode = "//Error parsing improved code";
        }
    
        //Guardar en Mongo
        await Snippet.create({
            title,
            code,
            analysis,
            improvedCode,
            userId: req.user.id
        });

        res.redirect('/')
    } catch (error){
        console.error(error);
        res.send("Error with DeepSeek")
    }
    console.log("USER:", req.user)
};

//Detail
exports.getDetail = async (req, res) => {
    const snippet = await Snippet.findOne({
        _id: req.params.id,
        userId:req.user.id
    });   
    
    if (!snippet || snippet.userId.toString() !== req.user.id){
        return res.status(403).send('No authorized');
    }

    res.render('detail', {snippet});
    

};

//Edit
exports.editForm = async (req, res) => {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet){
        return res.redirect("/");
    }

    res.render('edit', {snippet});
};

//Update
exports.updateSnippet = async (req, res) => {
    const update = await Snippet.findOneAndUpdate({
        _id: req.params.id,
        userId: req.user.id
    }, 
    req.body,
    {new: true}
    );

    if (!update){
        return res.redirect("/");
    }   

    res.redirect("/");
};

//Delete
exports.deleteSnippet = async (req, res) => {
    const snippet = await Snippet.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id
    });

    if (!snippet || snippet.userId.toString() !== req.user.id){
        return res.redirect("/")
    }

    res.redirect('/')
};

