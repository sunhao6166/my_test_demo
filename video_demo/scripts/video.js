//获取视频对象
var videoEle = document.getElementById("video");
var videodemoEle = document.getElementById("videodemo");
var container = document.getElementsByClassName("container")[0];
var btns = document.getElementById("btns");
var n,m;
//控制视频控件显示隐藏的函数
function a() {
  n ? clearTimeout(n) : +1;
  btns.className = "";
  n = setTimeout(() => {
    btns.className = "hide";
  }, 30000);
}

/*全屏--start*/
// 获取全屏图标
var fullsceenIconEle = document.getElementById("fullsceen-icon");
function FullScreen() {
  if (
    document.fullscreenElement ||
    document.msFullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullScreenElement
  ) {
    quitFullscreen();
    container.onmousemove = null; //清除视频控件显示隐藏的函数
    btns.className = ""; //清除显示样式
    clearTimeout(n); //清除定时器
    fullsceenIconEle.src = "img/Full_screen.png";
  } else {
    launchRequestFullscreen(videodemoEle);
    container.onmousemove = a; //添加视频控件显示隐藏的函数
    fullsceenIconEle.src = "img/exit_Full_screen.png";
  }
}
//兼容浏览器的退出全屏的写法

function quitFullscreen() {
  if (document.exitFullscreen) {
    //W3C
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    //Internet Explorer
    document.msExitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else {
    document.mozCancelFullScreen(); //Firefox
  }
}

//兼容浏览器的进入全屏的写法
function launchRequestFullscreen(element) {
  if (element.msRequestFullscreen) {
    //Internet Explorer
    element.msRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    //Firefox
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    //Chrome
    element.webkitRequestFullScreen();
  } else {
    //W3C
    element.requestFullscreen();
  }
}
/*全屏--end*/

/*进度条事件--start*/
//获取
var current_time = document.getElementById("current_time");
var btntime = document.getElementById("btntime");
var totaltime = document.getElementById("totaltime");
//初始情况下获取当前播放时间及总时长
videoEle.onloadedmetadata = function () {
  //获取当前video的总时间
  var allTime = videoEle.duration;
  var h = Math.floor(allTime / 3600);
  var m = Math.floor((allTime % 3600) / 60);
  var s = Math.floor(allTime % 60);
  h = h >= 10 ? h : "0" + h;
  m = m >= 10 ? m : "0" + m;
  s = s >= 10 ? s : "0" + s;
  totaltime.innerHTML = h + ":" + m + ":" + s; //allTime.toString();
};
//视频播放位置发生变化时开始执行
videoEle.ontimeupdate = function () {
  
  btntime.value = (100 * this.currentTime) / this.duration; ///this.totaltime;
  var time = this.currentTime;
  var h = Math.floor(time / 3600);
  var m = Math.floor((time % 3600) / 60);
  var s = Math.floor(time % 60);
  h = h >= 10 ? h : "0" + h;
  m = m >= 10 ? m : "0" + m;
  s = s >= 10 ? s : "0" + s;
  current_time.innerHTML = h + ":" + m + ":" + s;
};
//判断视屏是否播放结束
videoEle.onpause = function(){
  let img = document.querySelector("#btns button img");
  this.ended?img.src = "img/start.png":"img/stop.png"
}
//播放进度条的事件--拖拽
btntime.oninput = function () {
  videoEle.currentTime = btntime.value;
};
/*进度条事件--end*/

/*调节倍速--start*/
var selEle = document.getElementById("sel");
sel.oninput = function () {
  videoEle.playbackRate = this.value;
};
/*调节倍速--end*/

/*调节音量--start*/
//获取音量滑块对象
var volumeEle = document.getElementById("volume");
//获取音量数字显示对象
var volumechangeEle = document.getElementById("volumechange");
//获取当前音量图片
var volumeImgEle = document.getElementById("volume_img");
//设置一个值来保存视频是否静音相当于muted属性
var volumestate = true;
//拖动滑块来控制音量
volumeEle.oninput = function (e) {
  videoEle.volume = this.value / 100; //videoEle.volumed 取值为0-1所以除以100
  volumeImgEle.src =
    volumeEle.value > 0 ? "img/volume-on.png" : "img/volume-off.png";
    
  //判断volumeEle.value > 0是否为true
  volumestate = volumeEle.value > 0;
  // if (volumeEle.value > 0) {
  //   volumeImgEle.src = "img/volume-on.png";
  // } else {
  //   volumeImgEle.src = "img/volume-off.png";
  // }
  volumechangeEle.innerHTML = `音量:${this.value}%`;
  // 控制音量:50%音量显示
  volumechangeEle.className=""
  m?clearTimeout(m):+1
  m=setTimeout(()=>{
    volumechangeEle.className="hide"
    },3000)
};
//阻止音量滑块点击事件冒泡
volumeEle.onclick = (e) => {
  e.stopPropagation();
};
//音量点击事件
  function volume() {
//   //判断当前音量状态
//   //如果为true则将设为静音
//   //如果为false则静音取消
  if (volumestate) {
    volumeEle.value = 0;
    volumechangeEle.innerHTML = `音量:0%`;
    videoEle.volume = 0;
    volumeImgEle.src = "img/volume-off.png";
  } else {
    volumeEle.value = volumeEle.dataset.volume;
    volumechangeEle.innerHTML = `音量:${volumeEle.dataset.volume}%`;
    videoEle.volume = volumeEle.dataset.volume / 100;
    volumeImgEle.src = "img/volume-on.png";
  }
  volumestate = !volumestate; //volumestate设为false
   // 控制音量:50%音量显示
volumechangeEle.className=""
  m?clearTimeout(m):+1
  m=setTimeout(()=>{
    volumechangeEle.className="hide"
    },3000)
}

 
// /*调节音量--end*/

/*播放或暂停--start*/
function startorstop() {
  //获取播放按钮下面的图片
  //querySelector 根据选择器查找符合要求的元素
  //querySelectorAll  根据选择器查找符合要求的所有元素  返回数组
  let img = document.querySelector("#btns button img");
  if (videoEle.paused || videoEle.ended) {
    video.play();
    img.src = "img/stop.png";
  } else {
    video.pause();
    img.src = "img/start.png";
  }
}
/*播放或暂停--end*/