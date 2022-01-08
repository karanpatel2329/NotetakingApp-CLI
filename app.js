const fs = require('fs');
const yargs = require('yargs');

loadData=()=>{
    const bufferData = fs.readFileSync('note.json');
    const jsonData = JSON.parse(bufferData.toString());
    return jsonData;
}

yargs.command({
    command:'add',
    describe:'add new notes',
    builder:{
        title:{
            describe:'Title of Note',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:"Body of Note",
            demandOption:true,
            type:'string',
        }
    },
    handler:(yargs)=>{
     try{
        const task={
            "title":yargs.title,
            "body":yargs.body
        }
        const taskStr=JSON.stringify(task);
        if(fs.existsSync('./note.json')){
            var ls=[];
            const load=loadData();
            load.push(taskStr);
            fs.writeFileSync('note.json',JSON.stringify(load));
        }else{
            var ls=[];
            ls.push(taskStr);
          
            fs.writeFileSync('note.json',JSON.stringify(ls));
        }}
        catch(e){
            console.log("some Error while adding");
        }
        
    }
});
yargs.command({
    command:'list',
    describe:'List of Notes will be displayed',
    handler:()=>{
        try{
            const load =loadData();
            for(var i in load){
            const jData = JSON.parse(load[i]);
            console.log(i.toString()+' '+jData.title);
        }
        }catch(e){
            console.log("Some Error while Reading");
        }
    }
});
yargs.command({
    command:'read',
    describe:'Read specific notes',
    builder:{
        listNum:{
            describe:'Num of Note',
            demandOption:true,
            type:Number,
        }
    },
    handler:()=>{
       try{
        var load = loadData();
        var jData = JSON.parse(load[yargs.argv.listNum]);
        console.log("TITLE :- "+jData.title+"\nBODY :- "+"  "+jData.body);
       }catch(e){
           console.log("Some Error while displaying note");
       }
    }
})
yargs.command({
    command:'remove',
    describe:'remove notes',
    builder:{
        listNum:{
            describe:'Enter the List No.',
            demandOption:true,
            type:Number,
        }
    },
    handler:()=>{
      try{
        var ls=[];
        var load = loadData();
        if(yargs.argv.listNum>=load.length){
            console.log("Please Enter Correct List Number");
            return 
        }
        for(var i in load){
            if(i==yargs.argv.listNum){
                continue;
            }else{
                ls.push(load[i]);
            }
        }
        fs.writeFileSync('note.json',JSON.stringify(ls));
    
        console.log("Successfully Removed");  
    }catch(e){
          console.log("Some Error"+e);
      }
    }
}).argv ;
