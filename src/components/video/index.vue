<template>
    <section class="video-box" :class="{'audio-box':sourceType === 'mp3'}">      
        <!-- 视屏 -->
        <video
        id="myVideo"
            controls
            class="video-js"
            v-if="sourceType != 'mp3'">
            <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
        </video>   
        <!-- <button @click="playFun()">播放</button>  
        <button @click="pauseFun">暂停</button>    -->

        <!-- 音屏 -->
        <video
        id="myVideo"
            controls
            class="video-js video-js-audio" v-if="sourceType === 'mp3'">
            <source src="http://m10.music.126.net/20191021100642/72b50518b9ba081f0377edc8682c2f0d/ymusic/525b/0559/0e09/e1fd04c964232aa3a1269cd796db2bc2.mp3" type="audio/mp3">
        </video>
    </section>  
</template>

<script>
// 视屏
import Video from 'video.js'
import 'video.js/dist/video-js.css'
// Vue.prototype.$video = Video
export default {
    name:'myVideo',
    props:['sourceType'],
    data () {
        return {
            // soucerUrl:'http://vjs.zencdn.net/v/oceans.mp4',
            myPlayer:null,
            // sourceType:'mp4'
        };
    },
    mounted() { 
        this.initVideo();
    },
    methods: {
            initVideo() {
                //初始化视频方法
                let isPictureInPictureToggle = true,
                    isFullscreenToggle = true,
                    isBigPlayButton = true;

                if (this.sourceType === 'mp3') {
                    isPictureInPictureToggle = false;
                    isFullscreenToggle = false;
                    isBigPlayButton = false;
                }

                this.myPlayer = Video(myVideo, {
                    //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                    controls: true,
                    //自动播放属性,muted:静音播放
                    autoplay: false,
                    loop:false,
                    //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                    preload: "auto",
                    //设置视频播放器的显示宽度（以像素为单位）
                    width: "800px",
                    //设置视频播放器的显示高度（以像素为单位）
                    height: "600px", 
                    //允许用户从选择数组中选择播放速度
                    playbackRates: [0.5, 1, 1.5, 1.8, 2],
                    bigPlayButton:isBigPlayButton,
                    controlBar: {
                        currentTimeDisplay:true, // 当前播放时间
                        fullscreenToggle: isFullscreenToggle,//显示全屏按钮，默认为true
                        pictureInPictureToggle: isPictureInPictureToggle,//隐藏画中画按钮，默认为true
                        volumePanel: true,//隐藏声音面板
                        currentTimeDisplay: true,//显示当前播放时间
                        timeDivider: true,//显示时间分割线 
                        durationDisplay: false,//显示总时间
                        remainingTimeDisplay: true,//隐藏剩余时间，
                    },
                    
                });                                    
            },
            playFun(time){       
                if (time) {
                    this.myPlayer.currentTime(time);
                }             
                this.myPlayer.play(); 
            },
            pauseFun(){
               this.myPlayer.pause(); 
            }

    }
}

</script>
<style scoped>
#myVideo{ position: absolute;left: 0;right: 0;top: 0;bottom: 0;margin:auto;}
</style>
<style>
.vjs-poster{background-repeat: no-repeat; background-position: 50% 50%; background-size: cover;cursor: pointer;}
.audio-box video{background: url(../../assets/images/audio.gif) no-repeat center;
    background-position: center;
    position: relative; }
.video-js-audio{ background:#000;box-shadow: 0 0 15px #3474d9; border:10px solid #000;}
.video-js .vjs-big-play-button{top:50%;left: 50%;margin-top:-0.8em;margin-left: -1.5em;}

.audio-box .vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar{opacity: 1 !important;}
.audio-box .video-js .vjs-control-bar{display: flex !important;}
/* 进度条背景色 */
.video-js .vjs-play-progress{
  color: #ffb845;
   height: 6px;
  background-color: #ffb845;
}
.video-js .vjs-progress-control .vjs-mouse-display{
    height: 6px;
  background-color: #ffb845;
}
.vjs-mouse-display .vjs-time-tooltip{
  padding-bottom: 6px;
  background-color: #ffb845;
}
.video-js .vjs-play-progress .vjs-time-tooltip{
  display: none!important;
}
</style>