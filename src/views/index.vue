<template>
  <!-- 系统首页 -->
  <div class="h-100">
    <!-- header -->
    <Header />
    <!-- content -->
    <div class="d-flex w-100 h-100">
      <!-- sidebar -->
      <Sidebar />
      <!-- content-right -->
      <div class="content-box w-100 h-100">
        <!-- 面包屑 -->
        <Tags />
        <div class="app-container">
          <router-view v-slot="{ Component }">
            <transition
              name="move"
              mode="out-in">
              <keep-alive :include="tags.nameList">
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/Header/index.vue'
import Sidebar from '@/components/Sidebar/index.vue'
import Tags from '@/components/Tags/index.vue'
import { useTagsStore } from '@/stores/tags'

const tags = useTagsStore()
</script>

<style lang="scss" scoped>
.content-box {
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  background: #f0f0f0;
}
.app-container {
  height: 100%;
  padding: 16px 20px;
  box-sizing: border-box;
}
</style>
