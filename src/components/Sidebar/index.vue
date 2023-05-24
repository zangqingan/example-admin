<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="sidebar.collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-sub-menu
            :index="item.index"
            :key="item.index">
            <template #title>
              <el-icon color="#fff"> <component :is="item.icon" /> </el-icon>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-sub-menu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index">
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index">
                  {{ threeItem.title }}</el-menu-item
                >
              </el-sub-menu>
              <el-menu-item
                v-else
                :index="subItem.index"
                :key="subItem.inde"
                >{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item
            :index="item.index"
            :key="item.index">
            <el-icon color="#fff"> <component :is="item.icon" /> </el-icon>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  House
} from '@element-plus/icons-vue'
import { useSidebarStore } from '@/stores/sidebar'

const items = [
  {
    icon: House,
    index: '/dashboard',
    title: '系统首页'
  },
  {
    icon: IconMenu,
    index: '/table',
    title: '基础表格'
  },
  {
    icon: Document,
    index: '/tabs',
    title: 'tab选项卡'
  },
  {
    icon: Location,
    index: '3',
    title: '表单相关',
    subs: [
      {
        index: '/form',
        title: '基本表单'
      },
      {
        index: '/upload',
        title: '文件上传'
      },
      {
        index: '4',
        title: '三级菜单',
        subs: [
          {
            index: '/editor',
            title: '富文本编辑器'
          },
          {
            index: '/markdown',
            title: 'markdown编辑器'
          }
        ]
      }
    ]
  },
  {
    icon: Location,
    index: '/icon',
    title: '自定义图标'
  },
  {
    icon: Setting,
    index: '/charts',
    title: 'schart图表'
  },
  {
    icon: Setting,
    index: '/i18n',
    title: '国际化功能'
  },
  {
    icon: Setting,
    index: '7',
    title: '错误处理',
    subs: [
      {
        index: '/permission',
        title: '权限测试'
      },
      {
        index: '/404',
        title: '404页面'
      }
    ]
  },
  {
    icon: Setting,
    index: '/donate',
    title: '支持作者'
  }
]

// 默认激活
const route = useRoute()
const onRoutes = computed(() => {
  return route.path
})

// 侧边栏显示隐藏
const sidebar = useSidebarStore()
</script>

<style lang="scss" scoped>
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar,
ul {
  height: 100%;
}
</style>
