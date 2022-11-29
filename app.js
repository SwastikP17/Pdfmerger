const express=require('express');
const multer=require('multer');
const upload=multer({dest:'uploads/'})
const path=require('path');
const {mergePdf}=require('./merge');
const fs= require('fs');
const app= express();

// const port=process.env.PORT || 3000;
app.use("/public", express.static(path.join(__dirname,"/public")));
app.get('/',function(req,res){
   res.sendFile(path.join(__dirname,'templates/index.html'));
})

app.post('/merge',upload.array('pdfs',2) , async(req,res,next)=>{
   console.log(req.files);
   var d=await mergePdf(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path));
   
   res.redirect(`/public/${d}.pdf`);
   req.files.forEach(file=>{
      fs.unlinkSync(file.path)
   });
   
    
})

const port=process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("Port is running ");
})