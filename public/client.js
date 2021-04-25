const socket=io('/')
const peer= new Peer(undefined,{
    host:'/',
    port:'3001'
})

var user=$('.str_no')
var sid,p_sid,room,peer_id
peer.on('open',id=>{
    console.log('hi peer:'+id)
    peer_id=id
})
var j=0

socket.emit('find_sid')
socket.emit('new_user')
socket.on('join',function(count){
    console.log(count)
    user.text(count)
})
socket.on('s_id',function(data){
    sid=data;
    // alert(sid)
})
socket.on('pair_wf',function(sid){
    console.log(sid)
    p_sid=sid
})
socket.on('recv_msg',function(msg){
    // console.log(msg)
    const div=document.createElement('div')
    const className='message'
    div.classList.add(className)
    const msgText=`
        <span style="font-weight: bolder;">Friend</span>
        <p class="msg_val">${msg}</p>
    `
    div.innerHTML=msgText
    msgarea.appendChild(div)
    scroll()
})
socket.on('recv_video',function(vdo){
    alert("getting vdo")
    // var frndvdo=document.querySelector('.frnd_cam')
    // const  myVideo=document.createElement('video')
    // try{
    //     myVideo.srcObject=vdo
    // }
    // catch(error){
    //     myVideo.src=URL.createObjectURL(vdo);
    // }
    // myVideo.addEventListener('loadedmetadata',()=>{
    //     myVideo.play()
    // })
    // myvdo.append(myVideo)
    connectNewUser(stream)
})
function showid(){
    if(j==0){
        j=1
        sid=sid+'r'
        // alert(sid)
        p_sid=peer_id
        socket.emit('create',p_sid)
        console.log('joined room')
        document.querySelector('.sid').innerHTML=p_sid
    }
    else{
        console.log('already in room')
    }
}
function join(){
    var temp=document.querySelector('.input_id');
    var form=document.querySelector('.join_f');
    if(temp.value.length==0){
        alert("enter an id")
    }
    else{
        p_sid=temp.value
        form.submit();
    }
}
// document.querySelector('.input_msg')
function connectNewUser(stream){

}