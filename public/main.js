var msg=document.querySelector('.input_msg')
var msgarea=document.querySelector('.chat-box')
var myvdo=document.querySelector('.ur_cam')
// var frndvdo=document.querySelector('.frnd_cam')
var connected=0;
msg.addEventListener('keyup',function(e){
    if(e.key =='Enter'){
        var temp=e.target.value
        var len=e.target.value.length
        e.target.value=''
        var obj={
            msg:temp,
            room:p_sid
        }
        if(len!=0){
            // alert(obj.room)
            addMsg(obj)
            socket.emit('send_msg',obj);
        }
    }
})

function addMsg(obj){
    const div=document.createElement('div')
    const className='message'
    div.classList.add(className)
    const msgText=`
        <span style="font-weight: bolder;">You</span>
        <p class="msg_val">${obj.msg}</p>
    `
    div.innerHTML=msgText
    msgarea.appendChild(div)
    scroll()
}
function scroll(){
    msgarea.scrollTop=msgarea.scrollHeight
}

const myVideo1 = document.createElement('video')
myVideo1.muted = true
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
    addVideo(myVideo1,stream)
})

// function connect(p_sid,stream){
//     console.log('callin peer')
//     const call=peer.call(p_sid,stream)
//     const video=document.createElement('video')
//     call.on('stream',function(frnd_stream){
//         console.log('inside stream')
//         addVideo(video,frnd_stream)
//     })
//     call.on('close',function(){
//         video.remove()
//     })
// }
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
getUserMedia({video: true, audio: true}, function(stream) {
  var call = peer.call(p_sid, stream);
  const video=document.createElement('video')
  call.on('stream', function(remoteStream) {
    addVideo(video,remoteStream)
  });
}, function(err) {
  console.log('Failed to get local stream' ,err);
});
var getUserMedia1 = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

peer.on('call', function(call) {
    getUserMedia1({video: true, audio: true}, function(stream) {
      call.answer(stream); // Answer the call with an A/V stream.
      const video=document.createElement('video')
      call.on('stream', function(remoteStream) {
        if(connected==0){
            connected=1;
            addVideo(video,remoteStream)
        }
      });
    }, function(err) {
      console.log('Failed to get local stream' ,err);
    });
  });
call.on('close',function(){
    alert('hi')
})



function addVideo(video,stream){
    console.log('adding vdo')
    video.srcObject=stream
    video.addEventListener('loadedmetadata', () => {
        console.log('playing vdo')
        video.play()
      })
    myvdo.append(video)
}