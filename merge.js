const PDFmerger=require('pdf-merger-js');
const fs=require('fs');

var merger= new PDFmerger();

const mergePdf=async (p1,p2) =>{
    await merger.add(p1);
    await merger.add(p2);
    let d=new Date().getTime()
    await merger.save(`public/${d}.pdf`);
    return d;
    
}


module.exports={mergePdf}