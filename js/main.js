(function(){

  let allImags = [
    '/imgs/01b.png',
    '/imgs/02b.png',
    '/imgs/03b.png',
    '/imgs/04b.png',
    '/imgs/bg_main.jpg',
    '/imgs/btn_agin.png',
    '/imgs/btn_more.png'
  ];

  // 预处理多张图片
  function PreLoadImg() {
      this.imgs = [];
      this.total = 0;
      this.finished = 0;
      this.onAllLoaded = () => console.log(`请设置onAllLoaded回调`);
  }
  PreLoadImg.prototype = {
      isAllLoaded: function() {
          return this.total === this.finished;
      },
      addSrc: function(imgsUrl) {
          let img;
          this.total = imgsUrl.length;
          imgsUrl.forEach(item => {
              img = new Image();
              img.src = item;
              img.onload = () => {
                this.finished++;
                if(this.isAllLoaded()){
                  this.emitAllLoaded();
                }
              };
              this.imgs.push(img);
          })
      },
      getImgs: function() {
          return this.imgs;
      },
      emitAllLoaded: function() {
          this.onAllLoaded(this.imgs);
      }
  }



  let preImg = new PreLoadImg();
  preImg.addSrc(allImags);
  preImg.onAllLoaded = function() {
    run();
  }


  function run() {
    let app = document.getElementById("app");
    let mainPage = document.getElementById("mpage");
    let vpage= document.getElementById("vpage"); // vdieo wrap
    let video = document.getElementById("myvideo"); // video element
    let vbtn = document.getElementById("vbtn"); // video Btns wrap
    let playBtn = document.getElementById("playBtn"); // video play btn
    let picTimer = new PicTimer(allImags.slice(0,4), 5);

    picTimer.run(app, ()=> {
      show(vpage);
      show(vbtn);
      hidden(app);
    });

    playBtn.addEventListener("click", function(){
      video.play();
      hidden(vbtn);
    },false)

    // 播放结束 隐藏video
    video.addEventListener("ended", function(){
      hidden(vpage);
      hidden(video);
      show(mainPage);
    }, false)
  }


  function hidden(e) {
    e.classList.remove(`show`);
    e.classList.add(`hidden`);
  }
  function show(e) {
    e.classList.remove(`hidden`);
    e.classList.add(`show`);
  }
}).call(this);
