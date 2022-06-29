//为拆解HTML文件，将此脚本放与待拆解文件同目录下，将File的值改为文件名，通过终端运行此node文件即可。
//Put this file in the same directory of the HTML file to be split. Change the value of <b>File</b> to the HTML file name, and run this Node.js file. 

const fs = require('fs')
const path = require('path')
const regCSS = /<style>[\s\S]*<\/style>/
const regScript=/<script>[\s\S]*<\/script>/
const File = 'test.html'
fs.readFile(path.join(__dirname,'/',File),'utf8',(err,dataStr)=>{
    if(err){
        return console.log("读取"+File+"失败"+err.message)
    }
   function resloveCSS(html){
        var cssArr= regCSS.exec(html)
        var style = cssArr[0].replace('<style>','').replace('</style>','')
        fs.writeFile(path.join(__dirname,'/indep.css'),style,(err)=>{
            if(err){
                return console.log("样式拆分失败"+err.message)
            }
            console.log("样式拆分成功")
        })
   }
   function resloveScript(html){
       var jsArr = regScript.exec(html)
       var JS = jsArr[0].replace('<script>','').replace('</script>','')
       fs.writeFile(path.join(__dirname,'/indep.js'),JS,(err)=>{
           if(err){
               return console.log("脚本拆分失败"+err.message)
           }
           console.log("脚本拆分成功")
       })
   }
   function resloveHTML(html){
      var HTML = html.replace(regCSS,"<link href='indep.css' rel='stylesheet' type='text/css'>").replace(regScript,'<script src="indep.js" type="text/javascript"></script>')
      fs.writeFile(path.join(__dirname,'/indep.html'),HTML,(err)=>{
          if(err){
              return console.log("HTML拆分失败"+err.message)
          }
          console.log("HTML拆分成功")
      })
   }
   resloveCSS(dataStr)
   resloveScript(dataStr)
   resloveHTML(dataStr)
})