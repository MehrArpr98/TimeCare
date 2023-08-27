<template>
  
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-0 relative">
    <div id="box"></div>
    <div class="col-span-1 flex items-center justify-center">
      <img src="assets/home.jpg" />
    </div>

    <div class="col-span-1 relative">
      
      <img src="assets/shape1.png" class="h-60 absolute right-0 -z-10" />
      <img src="assets/shape2.png" class="w-40 absolute left-0 top-1/4 -z-10" />

      <div class="pb-6 text-5xl text-center font-bold leading-snug">
        Stay organized and efficient with <span class="animate-bounce ">TimeCare</span>
      </div>
      <div class="slider my-4">
        <div class="slider-box inline-block relative w-full">
          <div
            class="inline-block absolute opacity-0 text-3xl text-center w-full"
            v-for="benefit in benefits"
            :key="benefit"
          >
            {{ benefit }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      benefits: ['Increases productivity', 'Improves memory', 'Provides motivation']
    }
  }
}
</script>

<style>
div#box{
  height: 50px;
    width: 100%;
    background-color: #f2f4f3;
    border-radius: 100% 100% 0 0 /100%;
    /* box-shadow: 1px -3px 22px 0px; */
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
}

.slider {
  animation: slideColor 10s forwards infinite;
}

.slider-box div {
  /* top: -200px; */
  transform: rotateX(-90deg);
  text-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
  animation-timing-function: ease;
}

.slider-box div:nth-child(1) {
  animation: rollDown 10s forwards infinite;
}

.slider-box div:nth-child(2) {
  animation: rollDown2 10s forwards infinite;
}

.slider-box div:nth-child(3) {
  animation: rollDown3 10s forwards infinite;
}

@keyframes rollDown {
  0% {
    top: -50px;
    transform: rotateX(-90deg);
  }
  11% {
    top: -25px;
    transform: rotateX(0deg);
    opacity: 1;
  }
  22% {
    top: -25px;
    transform: rotateX(0deg);
    opacity: 1;
  }
  33% {
    top: 0px;
    transform: rotateX(30deg);
    opacity: 0;
  }
}

@keyframes rollDown2 {
  33% {
    top: -50px;
    transform: rotateX(-90deg);
  }
  44% {
    top: -25px;
    transform: rotateX(0deg);
    opacity: 1;
  }
  55% {
    top: -25px;
    transform: rotateX(0deg);
    opacity: 1;
  }
  66% {
    top: 0px;
    transform: rotateX(30deg);
    opacity: 0;
  }
}

@keyframes rollDown3 {
  66% {
    top: -50px;
    transform: rotateX(-90deg);
  }
  77% {
    top: -25px;
    transform: rotateX(0deg);
    opacity: 1;
  }
  88% {
    top: -25px;
    transform: rotateX(0deg);
    opacity: 1;
  }
  99% {
    top: 0px;
    transform: rotateX(30deg);
    opacity: 0;
  }
}

@keyframes slideColor {
  0% {
    color: #387780;
  }
  33% {
    color: #588b8b;
  }
  66% {
    color: #ed4899;
  }
  100% {
    color:  #e6b4cc;
  }
}

/* .left-full {
  left: -100%;
}

.carousel-item {
  float: left;
  position: relative;
  display: block;
  width: 100%;
  margin-right: -100%;
  backface-visibility: hidden;
}

.carousel-item.active {
  left: 0;
} */
</style>
