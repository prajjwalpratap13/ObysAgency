var videocontainer=document.querySelector(".video-container");
var video=document.querySelector(".video-container video");
var flag=0;

function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
locoScroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

function loadAnimation(){
    let loadingCounter=document.querySelector(".loading h5");
    let tl= gsap.timeline();

tl.from(".line h1,.line h2",{
    y:150,
    stagger:0.2,
    delay:0.2,
    duration:0.7
})
tl.from(".loading",{
    opacity: 0,
    onStart: function (){
        let count=0;
        let interval=setInterval(function increase(){
        if(count<=100){
            loadingCounter.innerHTML=count++;
        }
        else{
            clearInterval(interval);
        }
    },27)
    }
})
tl.to(".line h2",{
    animationName: "anime",
    opacity: 1
})
tl.to("#loader",{
    opacity: 0,
    duration: 0.8,
    delay: 2,
})
tl.from(".page1",{
    y:1600,
    delay:0.2,
    opacity: 0,
    duration: 0.4
})
tl.to("#loader",{
    display: "none"
})
tl.from("#nav",{
    opacity: 0
})
tl.from("#hero1 h1,#hero2 h1,#hero3 h2,#hero4 h1",{
    y:110,
    stagger: 0.15
})
}

function cursorAnimation(){
    document.addEventListener("mousemove",function (dets){
        gsap.to("#crsr",{
            left:dets.x,
            top:dets.y
        })
    })
    Shery.makeMagnet("#nav h4");
}

function sheryAnimation(){
    Shery.imageEffect(".image-div",{
        style:5,
        config:{"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7272749590481189},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.31,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.66,"range":[0,10]},"metaball":{"value":0.5,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.43,"range":[0,2]},"noise_scale":{"value":6.87,"range":[0,100]}},
        gooey:true
    })
}

video.addEventListener("click",()=>{
    if(flag==0){
        video.play();
        video.style.opacity=1;
        document.querySelector(".video-cursor").innerHTML= `<i class="fa-solid fa-pause"></i>`;
        flag=1;
        gsap.to(".video-cursor",{
            scale:0.5
        })
    }
    else{
        video.pause();
        video.style.opacity=0;
        document.querySelector(".video-cursor").innerHTML= `<i class="fa-solid fa-play"></i>`;
        flag=0;
        gsap.to(".video-cursor",{
            scale:1
        })
    }
})

document.querySelector(".video-cursor").addEventListener("click",()=>{
    if(flag==0){
        video.play();
        video.style.opacity=1;
        document.querySelector(".video-cursor").innerHTML= `<i class="fa-solid fa-pause"></i>`;
        flag=1;
        gsap.to(".video-cursor",{
            scale:0.5
        })
    }
    else{
        video.pause();
        video.style.opacity=0;
        document.querySelector(".video-cursor").innerHTML= `<i class="fa-solid fa-play"></i>`;
        flag=0;
        gsap.to(".video-cursor",{
            scale:1
        })
    }
})

videocontainer.addEventListener("mouseenter",()=>{
    videocontainer.addEventListener("mousemove",(dets)=>{
        gsap.to(".video-cursor",{
            left:dets.clientX-470,
            top: dets.clientY-80
        })
        document.querySelector("#crsr").style.display= "none";
    })
})

videocontainer.addEventListener("mouseleave",()=>{
    gsap.to("#crsr",{
        opacity:1
    })
    gsap.to(".video-cursor",{
        left: "80%",
        top: "-15%"
    })
    document.querySelector("#crsr").style.display= "block";
})

document.addEventListener("mousemove",(dets)=>{
    gsap.to("#dabba",{
        x: dets.x,
        y: dets.y
    })
})

document.querySelector("#hero3").addEventListener("mouseenter",(dets)=>{
    gsap.to("#dabba",{
        opacity: 1
    })
})

document.querySelector("#hero3").addEventListener("mouseleave",()=>{
    gsap.to("#dabba",{
        opacity:0
    })
})

locomotiveAnimation();
loadAnimation();
cursorAnimation();
sheryAnimation();