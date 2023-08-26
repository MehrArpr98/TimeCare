<template>
  <div class="flex h-10">
    <div id="app-timer" class="container-fluid m-auto text-center">
      <div class="flex items-baseline">
        <span class="text-2xl text-gray-700"><i class="fa fa-clock md:inline hidden"></i></span>
        <template v-for="(time, index) in times" :key="index">
          <div class="">
            <span class="text-2xl" :class="{ 'text-4xl': index == 0 }">
              {{ time.time }}
            </span>
            <span v-if="index !== 0 && index !== 3" class="mx-1">:</span>
            <span v-if="index == 0" class="card-footer"> {{ time.text }} , </span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import helper from '../includes/helper'

export default {
  props: ['endDate'],

  data() {
    return {
      startTime: helper.formatDateTime(new Date().toString()),
      endTime: helper.formatDateTime(this.endDate?.toString()),
      times: [
        { id: 0, text: 'Days', time: 1 },
        { id: 1, text: 'Hours', time: 1 },
        { id: 2, text: 'Minutes', time: 1 },
        { id: 3, text: 'Seconds', time: 1 }
      ],
      progress: 100,
      // isActive: false,
      timeinterval: undefined
    }
  },
  watch: {
    endDate(newVal) {
      this.endTime = helper.formatDateTime(newVal?.toString())
    }
  },
  methods: {
    updateTimer: function () {
      if (
        this.times[3].time > 0 ||
        this.times[2].time > 0 ||
        this.times[1].time > 0 ||
        this.times[0].time > 0
      ) {
        this.getTimeRemaining()
        this.updateProgressBar()
      } else {
        clearTimeout(this.timeinterval)
       
        this.progress = 0

        if (
          this.times[3].time == 0 &&
          this.times[2].time == 0 &&
          this.times[1].time == 0 &&
          this.times[0].time == 0
        ) {
          this.$emit('dead')
        }
      }
    },
    getTimeRemaining: function () {
      let t = Date.parse(new Date(this.endTime)) - Date.parse(new Date())
      if (t >= 0) {
        this.times[3].time = Math.floor((t / 1000) % 60) //seconds
        this.times[2].time = Math.floor((t / 1000 / 60) % 60) //minutes
        this.times[1].time = Math.floor((t / (1000 * 60 * 60)) % 24) //hours
        this.times[0].time = Math.floor(t / (1000 * 60 * 60 * 24)) //days
      } else {
        this.times[3].time = this.times[2].time = this.times[1].time = this.times[0].time = 0
        this.progress = 0
      }
    },
    updateProgressBar: function () {
      let startTime = Date.parse(new Date(this.startTime))
      let currentTime = Date.parse(new Date())
      let endTime = Date.parse(new Date(this.endTime))
      let interval = parseFloat(((currentTime - startTime) / (endTime - startTime)) * 100).toFixed(
        2
      )
      this.progress = 100 - interval
    }
  },
  created: function () {
    this.updateTimer()
    this.timeinterval = setInterval(this.updateTimer, 1000)
  }
}
</script>

<style></style>
