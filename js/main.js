(function(){

  let icons = [
    './imgs/足球.png',
    './imgs/网球.png',
    './imgs/篮球.png',
    './imgs/电竞.png'
  ];

  let app = document.getElementById("app");
  let mainPage = document.getElementById("mpage");
  let video = document.getElementById("myvideo");
  let playBtn = document.getElementById("playBtn");
  let picTimer = new PicTimer(icons, 5);
  // picTimer.run(app, ()=> alert(`完成`));
  playBtn.addEventListener("click", function(){
    video.play();
  },false)

}).call(this);
