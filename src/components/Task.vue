<template>
  <!-- Task situation button -->
  <button
    @click.prevent="doneTask"
    class="absolute top-16 right-2 w-8 h-8 shadow-md shadow-gray-700 rounded-full text-center text-clack ease-all duration-700"
    :class="{ 'bg-red-700': dead && !done, 'bg-white': !dead }"
    :disabled="done"
  >
    <i v-if="dead && !done" class="fa fa-times text-white bg-red-700"></i>

    <div v-else class="checkbox-wrapper-12 w-8 h-8">
      <div class="cbx w-8 h-8">
        <input id="cbx-12" type="checkbox" class="absolute top-0 left-0 w-8 h-8" v-model="done" />
        <label for="cbx-12" class="w-8 h-8"></label>
        <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
          <path d="M2 8.36364L6.23077 12L13 2"></path>
        </svg>
      </div>
      <!-- Gooey-->
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo-12">
            <fegaussianblur in="SourceGraphic" stddeviation="4" result="blur"></fegaussianblur>
            <fecolormatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
              result="goo-12"
            ></fecolormatrix>
            <feblend in="SourceGraphic" in2="goo-12"></feblend>
          </filter>
        </defs>
      </svg>
    </div>
  </button>

  <!-- Edit Task button -->
  <button
    @click="openEditModal(task.taskID)"
    class="absolute top-6 right-2 w-8 h-8 text-lg hover:text-2xl  border border-1 border-gray-300 shadow-md shadow-gray-700 rounded-full text-center text-clack bg-white ease-all duration-300 hover:block"
  >
    <i class="fa fa-pencil"></i>
  </button>

  <!-- Remove Task button -->
  <button
    @click="removeTask"
    class="absolute -top-4 right-2 w-8 h-8 text-lg hover:text-2xl z-40 border border-1 border-gray-300 shadow-md shadow-gray-700 rounded-full text-center text-clack bg-white ease-all duration-300 hover:block"
  >
    <i class="fa fa-trash"></i>
  </button>


  <!-- Dead task transparent gray page -->
  <div
    class="w-full h-full bg-cover rounded-lg bg-no-repeat bg-center bg-black absolute top-0 left-0 right-0 bottom-0 opacity-40 z-20"
    v-if="dead"
  ></div>

  <!-- Task background image -->
  <div
    class="w-full h-full bg-cover rounded-lg bg-no-repeat shadow-black bg-center absolute top-0 left-0 right-0 bottom-0 opacity-40 -z-10"
    :style="{
      backgroundImage: `linear-gradient(rgb(64 53 53 / 30%) 63%, rgb(255, 255, 255)),
             url(assets/leaf${(index % 15) + 1}.jpg)`
    }"
    :class="{ 'shadow-md ': dead, 'shadow-lg ': !dead }"
  ></div>

  <!-- Task text and time -->
  <div class="flex flex-col h-full w-full p-3 justify-between">
    <div
      class="bg-white md:m-3 p-2 md:p-3 border shadow-md shadow-gray-700 rounded font-semibold text-center width-3/4 overflow-auto"
    >
      {{ task.text }}
    </div>
    <Countdown :endDate="task.date" @dead="setDead" v-if="!task.dead" />
    <!--   *** {{ task.text.length }}** -->


  

  </div>
</template>

<script>
import Countdown from './Countdown.vue'
import { tasksCollection } from '@/includes/firebase'

export default {
  components: { Countdown },
  props: ['index', 'task', 'sorted', 'hideDead', 'removeFromTasks', 'setDeadTasks', 'setDoneTasks','openEditModal'],
  data() {
    return {
      dead: this.task.dead,
      done: this.task.done,
      
    }
  },
  methods: {
    async setDead() {
      this.dead = true
      await tasksCollection.doc(this.task.taskID).update('dead', this.dead)
      this.setDeadTasks(this.task.taskID)
    },
    removeTask() {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await tasksCollection.doc(this.task.taskID).delete()

          this.removeFromTasks(this.task.taskID)

          this.$swal('Task Deleted!', '', 'success')
        }
      })
    },
    
    doneTask() {
      this.$swal({
        title: 'Are you sure done this task?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#059669',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, i did!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.done = !this.done

          await tasksCollection.doc(this.task.taskID).update('done', this.done)
          this.setDead()
          this.setDoneTasks(this.task.taskID)
          this.$swal('Task Done!', '', 'success')
        }
      })
    },
    imagePath() {
  return require('~assets/' + this.country.name + '.jpg')
}
  }
}
</script>

<style>
#bg-div:hover > button {
  display: block !important;
}
.checkbox-wrapper-12 {
  position: relative;
}
.checkbox-wrapper-12 > svg {
  position: absolute;
      top: -130%;
      left: -170%;
      width: 110px;
      pointer-events: none;
}
.checkbox-wrapper-12 * {
  box-sizing: border-box;
}
.checkbox-wrapper-12 input[type='checkbox'] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  margin: 0;
}
.checkbox-wrapper-12 input[type='checkbox']:focus {
  outline: 0;
}

.checkbox-wrapper-12 .cbx label {
  background: none;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-filter: url('#goo-12');
  filter: url('#goo-12');
  transform: trasnlate3d(0, 0, 0);
  pointer-events: none;
}
.checkbox-wrapper-12 .cbx svg {
  position: absolute;
  top: 9px;
  left: 8px;
  z-index: 1;
  pointer-events: none;
}
.checkbox-wrapper-12 .cbx svg path {
  stroke: #fff;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 19;
  stroke-dashoffset: 19;
  transition: stroke-dashoffset 0.3s ease;
  transition-delay: 0.2s;
}
.checkbox-wrapper-12 .cbx input:checked + label {
  animation: splash-12 0.6s ease forwards;
}
.checkbox-wrapper-12 .cbx input:checked + label + svg path {
  stroke-dashoffset: 0;
}
@-moz-keyframes splash-12 {
  40% {
    background: #059669;
    box-shadow:
      0 -18px 0 -8px #059669,
      16px -8px 0 -8px #059669,
      16px 8px 0 -8px #059669,
      0 18px 0 -8px #059669,
      -16px 8px 0 -8px #059669,
      -16px -8px 0 -8px #059669;
  }
  100% {
    background: #059669;
    box-shadow:
      0 -36px 0 -10px transparent,
      32px -16px 0 -10px transparent,
      32px 16px 0 -10px transparent,
      0 36px 0 -10px transparent,
      -32px 16px 0 -10px transparent,
      -32px -16px 0 -10px transparent;
  }
}
@-webkit-keyframes splash-12 {
  40% {
    background: #059669;
    box-shadow:
      0 -18px 0 -8px #059669,
      16px -8px 0 -8px #059669,
      16px 8px 0 -8px #059669,
      0 18px 0 -8px #059669,
      -16px 8px 0 -8px #059669,
      -16px -8px 0 -8px #059669;
  }
  100% {
    background: #059669;
    box-shadow:
      0 -36px 0 -10px transparent,
      32px -16px 0 -10px transparent,
      32px 16px 0 -10px transparent,
      0 36px 0 -10px transparent,
      -32px 16px 0 -10px transparent,
      -32px -16px 0 -10px transparent;
  }
}
@-o-keyframes splash-12 {
  40% {
    background: #059669;
    box-shadow:
      0 -18px 0 -8px #059669,
      16px -8px 0 -8px #059669,
      16px 8px 0 -8px #059669,
      0 18px 0 -8px #059669,
      -16px 8px 0 -8px #059669,
      -16px -8px 0 -8px #059669;
  }
  100% {
    background: #059669;
    box-shadow:
      0 -36px 0 -10px transparent,
      32px -16px 0 -10px transparent,
      32px 16px 0 -10px transparent,
      0 36px 0 -10px transparent,
      -32px 16px 0 -10px transparent,
      -32px -16px 0 -10px transparent;
  }
}
@keyframes splash-12 {
  40% {
    background: #059669;
    box-shadow:
      0 -18px 0 -8px #059669,
      16px -8px 0 -8px #059669,
      16px 8px 0 -8px #059669,
      0 18px 0 -8px #059669,
      -16px 8px 0 -8px #059669,
      -16px -8px 0 -8px #059669;
  }
  100% {
    background: #059669;
    box-shadow:
      0 -36px 0 -10px transparent,
      32px -16px 0 -10px transparent,
      32px 16px 0 -10px transparent,
      0 36px 0 -10px transparent,
      -32px 16px 0 -10px transparent,
      -32px -16px 0 -10px transparent;
  }
}
</style>


