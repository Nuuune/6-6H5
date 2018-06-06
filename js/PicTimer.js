(function(){

  let window = this;

  /**
   * [PicTimer 带有icon的计数器 默认计100个数]
   * @param       {Arr[String]} picsUrl [icon的地址]
   * @param       {number} time    [总共需要花费的时间]
   * @constructor
   */
  function PicTimer(picsUrl, time){
    pics = picsUrl ? picsUrl : [];
    time = time ? time : 10;
    if(!(pics instanceof Array)) {
      throw Error(`第一参数[picsUrl]需要为数组`);
    }
    if(typeof time !== `number`) {
      throw Error(`第二参数[time]需要为number类型`);
    }


    this.pics = pics.concat(); // 图片地址数组
    this.time = time * 1000; // 总共耗时时间
    this.timeNum = 100; // 总的数字个数
    this.curr_timeNum = 0; // 当前显示的数字
    this._timer_id; // 计时器的id

    for(let fn in this.__proto__) {
      this[fn] = this[fn].bind(this);
    }

    this._UIinit();

  }
  /**
   * 初始化UI
   * @return {PicTimer}
   */
  PicTimer.prototype._UIinit = function() {
    this.el_wrap = window.document.createElement(`div`);
    this.el_timeNum =  window.document.createElement(`p`);
    this.el_icon = this.pics.length > 0 ? window.document.createElement(`img`) : null;

    let wrap = this.el_wrap;
    let timeNum = this.el_timeNum;
    let icon = this.el_icon;

    wrap.className = `main flex flex-center`;
    timeNum.className = `time`;
    if (icon) {
      icon.className = `icon`;
    }

    icon.src = this.pics[0];
    timeNum.innerText = `${this.curr_timeNum}`;

    wrap.appendChild(timeNum);
    icon && wrap.appendChild(icon);

    return this;
  }
  /**
   * 计时器 默认 100次 次数取决与 timeNum
   * @param  {fn} finished [计时器完成时的回调]
   * @return {PicTimer}
   */
  PicTimer.prototype._timer = function(finished) {
    let timeNum = this.el_timeNum;
    let icon = this.el_icon;
    let perTime = this.time / this.timeNum;
    let perIconTime;

    if(icon) {
      perIconTime = this.timeNum / this.pics.length;
    }

    this._timer_id = window.setInterval(() => {

      if(this.curr_timeNum === (this.timeNum - 1)) {
        window.clearInterval(this._timer_id);
        finished();
        return ;
      }

      this.curr_timeNum += 1;
      if(perIconTime && this.curr_timeNum % perIconTime === 0) {
        icon.src = this.pics[this.curr_timeNum / perIconTime];
      }
      timeNum.innerText = `${this.curr_timeNum}`;

    }, perTime);

    return this;
  }
  /**
   * 执行函数
   * @param  {HTMLDOM}   el [将要挂载的目标dom]
   * @param  {Function} cb [timer完成时的回调]
   * @return {void}      [description]
   */
  PicTimer.prototype.run = function(el, cb) {
    el.appendChild(this.el_wrap);
    window.setTimeout(()=>{
      this._timer(cb);
    },50)
  }

  // 挂载到window上
  window.PicTimer = PicTimer;


}).call(this);
