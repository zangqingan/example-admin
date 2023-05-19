<template>
  <!-- 系统首页入库 -->
  <div>
    <!-- header -->
    <Header />
    <!-- sidebar -->
    <Sidebar />
    <!-- content -->
    <div
      class="content-box"
      :class="{ 'content-collapse': sidebar.collapse }">
      <Tags />
      <div class="content">
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
</template>

<script setup>
import Header from '@/components/Header/index.vue'
import Sidebar from '@/components/Sidebar/index.vue'
import Tags from '@/components/Tags/index.vue'
import { useSidebarStore } from '@/stores/sidebar'
import { useTagsStore } from '@/stores/tags'

const sidebar = useSidebarStore()
const tags = useTagsStore()
</script>

<style lang="scss" scoped>
.content-box {
  position: absolute;
  left: 250px;
  right: 0;
  top: 70px;
  bottom: 0;
  padding-bottom: 30px;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  background: #f0f0f0;
}
.content {
  width: auto;
  height: 100%;
  padding: 10px;
  overflow-y: scroll;
  box-sizing: border-box;
}

.content-collapse {
  left: 65px;
}
</style>
