import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => {
    return {
      collapse: false
    }
  },
  actions: {
    handleCollapse() {
      this.collapse = !this.collapse
    }
  }
})
