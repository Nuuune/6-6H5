(function(){

  let allImags = [
    'https://game.gtimg.cn/images/game/cp/a20180610love/01b.png',
    'https://game.gtimg.cn/images/game/cp/a20180610love/02b.png',
    'https://game.gtimg.cn/images/game/cp/a20180610love/03b.png',
    'https://game.gtimg.cn/images/game/cp/a20180610love/04b.png',
    'https://game.gtimg.cn/images/game/cp/a20180610love/bg_main.jpg',
    'https://game.gtimg.cn/images/game/cp/a20180610love/btn_agin.png',
    'https://game.gtimg.cn/images/game/cp/a20180610love/btn_more.png'
  ];

  let allVideoSrc = [
    'https://glico-1251886366.cos.ap-shanghai.myqcloud.com/0611_v1_%E7%AB%96%E7%89%88.mp4'
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
    let playBtn = document.getElementById("play-btn"); // video play btn
    let aginBtn = document.getElementById("agin-btn"); // video play btn
    let moreBtn = document.getElementById("more-btn"); // video play btn
    let picTimer = new PicTimer(allImags.slice(0, 4), 5);

    // 对当前环境进行判断
    let ua = navigator ? navigator.userAgent.toLowerCase() : null;
    // 当前是微信环境的话 video需要引用旋转后的视频源
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
      video.src = allVideoSrc[0]
    } else {
      video.src = allVideoSrc[0]
    }


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

    // 重播按钮事件
    aginBtn.addEventListener("click", function(){
      show(vpage);
      show(video);
      hidden(mainPage);
      video.currentTime = 0;
      video.play();
    }, false);

    moreBtn.addEventListener("click", function(){
      window.location.href = "http://game.qq.com/esport/";
    }, false);
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
