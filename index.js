let songIndex =0;
let audioElement=new Audio('songs/1.mp3')
const masterPlay=document.querySelector('#masterPlay')
let progressBar=document.querySelector('#progressBar')
let gif=document.querySelector('#gif')
let songItems=Array.from(document.querySelectorAll('.songItem'));
let songIcons=Array.from(document.querySelectorAll('.songItemPlay'))
let songDuration=Array.from(document.querySelectorAll('.songtimeStamp'))
let masterSongName=document.querySelector('#masterSongName')
let volumeControl=document.querySelector('#volumeSeek')
let volumeImage=document.querySelector('#volumeImage')
audioElement.volume=0.1;
masterSongName.innerText=" Hai dil ye mera"

// audioElement.play()
let songs=[
    {songName:"Hai dil ye mera", filepath:"songs/hai.mp3", coverPath:'covers/1.jpg',duration:'04:57'},
    {songName:"kalle kalle", filepath:"songs/kalle.mp3", coverPath:'covers/2.jpg',duration:"03:47"},
    {songName:"Dewana Kar rha hai", filepath:"songs/3.mp3", coverPath:'covers/3.jpg',duration:"05:38"},
    {songName:"udd Chaliye", filepath:"songs/4.mp3", coverPath:'covers/4.jpg',duration:"03:34"},
    {songName:"Dil ibaadat", filepath:"songs/5.mp3", coverPath:'covers/5.jpg',duration:"05:29"},
    {songName:"Dil kyun yeh mera(kites)", filepath:"songs/6.mp3", coverPath:'covers/6.jpg',duration:"05:35"},
    {songName:"Man Mera-Gajender Verma", filepath:"songs/7.mp3", coverPath:'covers/7.jpg',duration:'03:18'},
    {songName:"Rabata", filepath:"songs/8.mp3", coverPath:'covers/8.jpg',duration:"04:03"},
    {songName:"Tujhe Sochta Hoon", filepath:"songs/9.mp3", coverPath:'covers/9.jpg',duration:"05:13"},
    {songName:"hal e dil", filepath:"songs/9.mp3", coverPath:'covers/10.jpg',duration:"05:48"}

]


songItems.forEach((element,i)=>{
    element.querySelectorAll('img')[0].src=songs[i].coverPath;
    element.querySelectorAll('.songName')[0].innerText=songs[i].songName;
    element.querySelectorAll('p')[0].innerText=songs[i].duration;
})
// handle play,pause
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        console.log("clicked")
        songIcons[songIndex].classList.remove('fa-circle-play');
        songIcons[songIndex].classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
       console.log("else clicked");
       songIcons[songIndex].classList.remove('fa-circle-pause');
       songIcons[songIndex].classList.add('fa-circle-play');
    }
    })
//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
        //update seek bar
       let progress=parseInt((audioElement.currentTime/audioElement.duration)*100)
        progressBar.value = progress
})
progressBar.addEventListener('change',()=>{
    audioElement.currentTime=((progressBar.value*audioElement.duration)/100)
})

const makeAllPlays=()=>{
    songIcons.forEach((e)=>{
        e.classList.remove('fa-circle-pause');
        e.classList.add('fa-circle-play');
        
    })
}
//automate songs
audioElement.addEventListener('ended',()=>{
  songIndex+=1;
  if(songIndex<10){
  makeAllPlays();
  songIcons[songIndex].classList.remove('fa-circle-play');
  songIcons[songIndex].classList.add('fa-circle-pause');
  masterSongName.innerText=songs[songIndex].songName; 
  audioElement.src=`songs/${songIndex+1}.mp3`;
  audioElement.currentTime=0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove('fa-circle-play');
   masterPlay.classList.add('fa-circle-pause');

  }
  else{
    audioElement.pause();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
   
    gif.style.opacity = 0;
   
  }
})
songIcons.forEach((element)=>{
    element.addEventListener('click',(e)=>{
         makeAllPlays();
      songIndex = parseInt(e.target.id);
      if(audioElement.currentTime<=0){
      e.target.classList.remove('fa-circle-play');
      e.target.classList.add('fa-circle-pause');
      audioElement.src = `songs/${songIndex+1}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
      
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove('fa-circle-play');
      masterPlay.classList.add('fa-circle-pause');
      }
      else if(songIndex!==oldIndex){
        makeAllPlays();
        e.target.classList.remove('fa-circle-play');
      e.target.classList.add('fa-circle-pause');
      audioElement.src = `songs/${songIndex+1}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
    
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove('fa-circle-play');
      masterPlay.classList.add('fa-circle-pause');
      }
      else if(songIndex===oldIndex && audioElement.paused){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        console.log("clicked")
        songIcons[songIndex].classList.remove('fa-circle-play');
        songIcons[songIndex].classList.add('fa-circle-pause');
      }
      else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        e.target.classList.remove('fa-circle-pause');
        e.target.classList.add('fa-circle-play');
        gif.style.opacity = 0;
       console.log("else clicked");

      }
      oldIndex=songIndex;
    })
})
//duration

document.getElementById('next').addEventListener('click',()=>{
  if(songIndex>=9){
    songIndex=0;
  }
  else{
    songIndex+=1;
  }
  makeAllPlays();
  songIcons[songIndex].classList.remove('fa-circle-play');
  songIcons[songIndex].classList.add('fa-circle-pause');
  audioElement.src=`songs/${songIndex+1}.mp3`;
  masterSongName.innerText=(songs[songIndex].songName); 
  audioElement.currentTime=0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
 
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
      songIndex=9;
    }
    else{
      songIndex-=1;
    }
    makeAllPlays();
    songIcons[songIndex].classList.remove('fa-circle-play');
    songIcons[songIndex].classList.add('fa-circle-pause');
    audioElement.src=`songs/${songIndex+1}.mp3`;
     masterSongName.innerText=(songs[songIndex].songName)
     audioElement.currentTime=0;
     audioElement.play();
     gif.style.opacity = 1;
     masterPlay.classList.remove('fa-circle-play');
     masterPlay.classList.add('fa-circle-pause');

  })

  //volume control
volumeControl.addEventListener('change', (e)=>{
    audioElement.volume=(parseInt(e.target.value))/100
    if(audioElement.volume>0.5){
      volumeImage.src="./images/volume-up-fill.svg"
    }
    else if(audioElement.volume<0.01){
        volumeImage.src="./images/volume-mute-fill.svg"
    }
    else{
        volumeImage.src="./images/volume-down-fill.svg"
    }
})


