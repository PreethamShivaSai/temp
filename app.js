const express =require('express')
const app=express()
const bodyParser=require('body-parser'); 
const { userInfo } = require('os');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs')
const http=require('http').createServer(app)
// const {v4:uuidV4}=require('uuid')
var count=0;
var id
app.use(express.static(__dirname+'/public'))
const PORT=process.env.PORT || 3000
http.listen(PORT,function(){
    console.log(`listening to port :${PORT}`)
})

const io=require('socket.io')(http)
io.on('connection',function(socket){
    
    count++;
    socket.on('find_sid',function(){
        io.to(socket.id).emit('s_id',socket.id)
    })
    socket.on('new_user',function(){ 
        id=socket.id; 
        console.log("new user id:"+id)
        console.log("count:"+count)    
    })
    socket.on('pair',function(sid){
        console.log('pair with '+sid)
        socket.broadcast.to(sid).emit('pair_wf',socket.id);
    })
    socket.on('create',function(sid){
        // console.log()
        socket.join(sid)
    })

    socket.on('send_msg',function(msg){
        // console.log(msg)
        // console.log('message to room:'+msg.room)
        socket.to(msg.room).emit('recv_msg',msg.msg)
    })
    // socket.emit('join',count)
    socket.on('stream_video',function(id,room){
        // console.log('video on server')
        // socket.to(strobj.room).emit('recv_video',strobj.video)
        socket.broadcast.to(id).emit('frnd_conn',id)
    })
    socket.on('disconnect',function(){
        count--;
        console.log("User disc ")
        socket.emit('join',count)
        console.log("count:"+count)
    })
})

app.get('/',function(req,res){
    res.render('index',{'count':count})
})
app.get('/friends',function(req,res){
    res.render('chat',{'count':count,'id':id,'room':0})
})
app.post('/friends',function(req,res){
    res.render('chat',{'count':count,'id':id,'room':req.body.inp})
})