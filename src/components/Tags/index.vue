<template>
  <div
    class="d-flex jc-between ai-center tags-content"
    v-if="tags.show">
    <div class="d-flex jc-between ai-center">
      <div
        v-for="(item, index) in tags.list"
        class="item-content"
        :class="{ active: isActive(item.path) }"
        :key="index">
        <div class="d-flex ai-center">
          <router-link :to="item.path">{{ item.title }}</router-link>
          <el-icon
            class="item-icon"
            @click="closeTags(index)"
            ><Close
          /></el-icon>
        </div>
      </div>
    </div>
    <div class="close-box">
      <el-dropdown @command="handleTags">
        <el-button type="primary">
          标签选项
          <el-icon><ArrowDown /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { Close, ArrowDown } from '@element-plus/icons-vue'
import { useTagsStore } from '@/stores/tags'

// 当前激活tag
const route = useRoute()
const isActive = path => {
  return path === route.fullPath
}

// 点击tag标签时关闭单个标签
const router = useRouter()
const tags = useTagsStore()
const closeTags = index => {
  const delItem = tags.list[index]
  tags.delTagsItem(index)
  const item = tags.list[index] ? tags.list[index] : tags.list[index - 1]
  if (item) {
    delItem.path === route.fullPath && router.push(item.path)
  } else {
    router.push('/')
  }
}

// 设置标签
const setTags = route => {
  const isExist = tags.list.some(item => {
    return item.path === route.fullPath
  })
  if (!isExist) {
    if (tags.list.length >= 8) tags.delTagsItem(0)
    tags.setTagsItem({
      name: route.name,
      title: route.meta.title,
      path: route.fullPath
    })
  }
}
setTags(route)

// 路由更新前设置标签
onBeforeRouteUpdate(to => {
  setTags(to)
})

const handleTags = command => {
  command === 'other' ? closeOther() : closeAll()
}
// 关闭全部标签
const closeAll = () => {
  tags.clearTags()
  router.push('/')
}
// 关闭其他标签
const closeOther = () => {
  const curItem = tags.list.filter(item => {
    return item.path === route.fullPath
  })
  tags.closeTagsOther(curItem)
}
</script>

<style lang="scss" scoped>
.tags-content {
  height: 60px;
  background: #fff;
  box-shadow: 0 5px 10px #ddd;
  margin-bottom: 20px;
}
.item-content {
  height: 100%;
  line-height: 60px;
  border-right: 1px solid #d8dce5;
  padding: 0 8px;
  font-size: 15px;
  font-weight: 500;
}
.active {
  color: #1750a1;
  border: 1px solid #dde6f8;
  background-color: #dde6f8;
}
.item-icon {
  margin: 0 3px;
}
.close-box {
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 100%;
  background: #fff;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
.el-dropdown,
.el-button {
  height: 100%;
}
</style>
