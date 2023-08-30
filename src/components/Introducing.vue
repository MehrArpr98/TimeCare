<template>
  
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-0 relative">
    <div id="box"></div>
    <div class="col-span-1 flex items-center justify-center">
      <img src="../../public/assets/home.jpg" />
    </div>

    <div class="col-span-1 relative">
      
      <img src="../../public/assets/shape1.png" class="h-60 absolute right-0 -z-10" />
      <img src="../../public/assets/shape2.png" class="w-40 absolute left-0 top-1/4 -z-10" />

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

