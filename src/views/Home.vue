<template>
  <main v-if="userLoggedIn" class="container mx-auto px-4 my-5 py-5 mx-auto max-w-6xl">
    <!-- Add new task button -->
    <button
      class="fixed bottom-2 right-2 block z-40 font-2xl text-white border-4 border-white rounded-full bg-emerald-500 w-16 h-16 hover:bg-emerald-600 hover:w-20 hover:h-20 ease-all duration-300"
      @click="showAddModal = true"
    >
      <i class="fa fa-plus"></i>
    </button>

    <!-- Searchbox and options -->
    <div class="border-b flex justify-between pb-5">
      <div class="bg-zinc-100 h-10 max-w-sm w-1/2 flex items-center rounded-full border">
        <a id="search-box-icon" class="text-md my-1 pl-3"><i class="fa fa-search"></i></a>
        <input
          type="text"
          placeholder="Search..."
          name="search"
          class="border-0 w-full rounded-full bg-zinc-100 pl-1 focus:border-0 focus:outline-0"
          v-model="searched"
        />
      </div>
      <div class="flex">
        <button
          class="block mx-2 font-2xl h-10 z-40 rounded-full px-3 bg-gray-500 hover:bg-gray-600 text-white ease-all duration-300 flex items-center"
          @click="hideDead = !hideDead"
        >
          <i class="fa fa-times pr-1" v-if="hideDead"></i>
          <i class="fas fa-broom md:hidden inline"></i>
          <span class="hidden md:inline">Hide dead tasks</span>
        </button>
        <button
          class="block font-2xl h-10 z-40 rounded-full px-3 bg-pink-500 hover:bg-pink-600 text-white ease-all duration-300 flex items-center"
          @click="sorted = !sorted"
        >
          <i class="fa fa-times pr-1" v-if="sorted"></i>
          <i class="fa fa-sort-amount-asc md:hidden inline"></i>
          <span class="hidden md:inline"> Sort by deadlin</span>
        </button>
      </div>
    </div>

    <new-task-modal
      :showAddModal="showAddModal"
      @showAddModal="showAddModal = false"
      :addToTasks="addToTasks"
    />

    <!-- Tasks container -->
    <div class="grid-container grid gap-5 my-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div
        id="bg-div"
        :class="{
          short: task.text.length < 50,
          tall: task.text.length < 120 && task.text.length >= 50,
          taller: task.text.length >= 120
        }"
        v-for="(task, index) in filteredTasks"
        :key="task.taskID"
        class="flex items-center justify-center border rounded-lg relative z-10"
      >
        <Task
          :index="index"
          :sorted="sorted"
          :task="task"
          :hideDead="hideDead"
          :removeFromTasks="removeFromTasks"
          :setDeadTasks="setDeadTasks"
          :setDoneTasks="setDoneTasks"
          :openEditModal="openEditModal"
        />
      </div>
    </div>

    <!-- Edit Modal -->
    <div class="fixed z-50 inset-0 overflow-y-auto" id="modal" :class="{ hidden: !showEditModal }">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
        >
          <div class="p-2 px-4">
            <div
              class="modal-close text-sm text-gray-500 text-right cursor-pointer z-50 float-right"
              @click="showEditModal = !showEditModal"
            >
              <i class="fas fa-times"></i>
            </div>
            <div class="p-3"></div>

            <div class="p-3">
              <vee-form @submit="editTask" :validation-schema="schema">
                <label class="block text-gray-500 mb-2">1. Edit task text: </label>
                <vee-field
                  as="textarea"
                  class="border w-full p-2 focus:border"
                  name="task_text"
                  rows="2"
                  v-model="taskEditText"
                />
                <ErrorMessage class="text-red-500 text-xs" name="task_text" />

                <label class="block text-gray-500 mb-2 mt-5">2. Edit deadline for task: </label>
                <VueDatePicker
                  v-model="taskEditDate"
                  auto-apply
                  partial-flow
                  :flow="['calendar', 'time']"
                  :min-date="new Date()"
                  :monthChangeOnScroll="false"
                  :inline="true"
                  class="mb-5"
                ></VueDatePicker>
                <button
                  type="submit"
                  class="block m-auto mt-8 w-1/2 bg-emerald-500 text-white py-1.5 px-3 rounded-full transition"
                  :disabled="editTask_in_submission"
                >
                  <svg
                    v-if="editTask_in_submission"
                    aria-hidden="true"
                    role="status"
                    class="inline w-4 h-4 mr-1 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Edit task
                </button>
              </vee-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <main v-else class="container mx-auto px-4 mt-5 pt-5 mx-auto max-w-6xl">
    <Introducing />
  </main>
</template>

<script>
import NewTaskModal from '../components/NewTaskModal.vue'
import Introducing from '../components/Introducing.vue'
import { auth, tasksCollection } from '@/includes/firebase'
import Task from '../components/Task.vue'
import useUserStore from '@/stores/user'
import { mapState } from 'pinia'

export default {
  components: { NewTaskModal, Task, Introducing },
  data() {
    return {
      tasks: [],
      showAddModal: false,
      startDate: new Date(),
      searched: '',
      sorted: false,
      hideDead: false,
      showEditModal: false,
      taskEditText: '',
      taskEditDate: null,
      taskEditId: 0,
      schema: {
        task_text: 'required'
      },
      editTask_in_submission: false
    }
  },
  async created() {
    if (!auth.currentUser) return
    const snapshot = await tasksCollection.where('uid', '==', auth.currentUser.uid).get()

    snapshot.forEach((document) => {
      this.tasks.push({
        taskID: document.id,
        ...document.data()
      })
    })
  },
  methods: {
    /*   closeModal() {
      this.$emit('showAddModal')
    }, */
    removeFromTasks(id) {
      this.tasks.forEach((task, index) => {
        if (task.taskID == id) this.tasks.splice(index, 1)
      })
    },
    openEditModal(id) {
      this.tasks.forEach((task) => {
        if (task.taskID == id) {
          this.taskEditId = task.taskID
          this.taskEditText = task.text
          this.taskEditDate = new Date(task.date)
        }
      })

      this.showEditModal = !this.showEditModal
    },
    async editTask() {
      this.editTask_in_submission = true

      await tasksCollection
        .doc(this.taskEditId)
        .update({ text: this.taskEditText, date: this.taskEditDate.toString(), dead: false })

      this.editTask_in_submission = false

      this.$swal('Task Added!', '', 'success').then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
      })
    },
    async addToTasks() {
      this.tasks = []
      const snapshot = await tasksCollection.where('uid', '==', auth.currentUser.uid).get()

      snapshot.forEach((document) => {
        this.tasks.push({
          taskID: document.id,
          ...document.data()
        })
      })
    },
    setDeadTasks(id) {
      this.tasks.forEach((task) => {
        if (task.taskID == id) task.dead = true
      })
    },
    setDoneTasks(id) {
      this.tasks.forEach((task) => {
        if (task.taskID == id) task.done = true
      })
    }
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
    filteredTasks() {
      let temp = [...this.tasks]

      if (this.sorted) {
        temp = temp.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date)
        })
      } else {
        temp = [...temp]
      }

      if (this.hideDead) {
        temp = temp.filter((item) => {
          return !item.dead
        })
      } else {
        temp = [...temp]
      }

      temp = temp.filter((item) => {
        return item.text.toUpperCase().includes(this.searched.toUpperCase())
      })
      return temp
    }
  }
}
</script>

<style>
.grid-container {
  grid-auto-rows: 50px;
}

.short {
  grid-row: span 3;
}

.tall {
  grid-row: span 4;
}

.taller {
  grid-row: span 5;
}

.tallest {
  grid-row: span 6;
}
</style>
