(function(){

  let icons = [
    './imgs/足球.png',
    './imgs/网球.png',
    './imgs/篮球.png',
    './imgs/电竞.png'
  ];

  let app = document.getElementById("app");
  let picTimer = new PicTimer(icons, 5);
  picTimer.run(app, ()=> alert(`完成`));

}).call(this);
