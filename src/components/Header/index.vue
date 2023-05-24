<template>
  <div class="d-flex jc-between header">
    <!-- 左侧-折叠按钮 -->
    <div class="d-flex ai-center header-left">
      <div
        class="collapse-btn pointer"
        @click="collapseChage">
        <el-icon v-if="!sidebar.collapse"><Fold /></el-icon>
        <el-icon v-else><Expand /></el-icon>
      </div>
      <div>后台管理系统</div>
    </div>
    <!-- 右侧-用户头像 -->
    <div class="d-flex ai-center header-right">
      <!-- 消息中心 -->
      <div class="btn-bell pointer">
        <el-tooltip
          effect="dark"
          :content="message ? `有${message}条未读消息` : `消息中心`"
          placement="bottom">
          <router-link to="/tabs">
            <el-icon><Bell /></el-icon>
          </router-link>
        </el-tooltip>
        <span
          class="btn-bell-badge"
          v-if="message"></span>
      </div>
      <!-- 用户头像 -->
      <div class="user-avator">
        <img src="@/assets/images/img.jpg" />
      </div>
      <!-- 用户名下拉菜单 -->
      <el-dropdown
        class="user-name"
        trigger="click"
        @command="handleCommand">
        <span class="el-dropdown-link">
          {{ username }}
          <el-icon><CaretBottom /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <a
              href="https://github.com/lin-xin/vue-manage-system"
              target="_blank">
              <el-dropdown-item>项目仓库</el-dropdown-item>
            </a>
            <el-dropdown-item command="user">个人中心</el-dropdown-item>
            <el-dropdown-item
              divided
              command="loginout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { Expand, Fold, Bell, CaretBottom } from '@element-plus/icons-vue'
import { useSidebarStore } from '@/stores/sidebar'

// 获取未读信息
const message = 2

// 侧边栏折叠
const sidebar = useSidebarStore()
const collapseChage = () => {
  sidebar.handleCollapse()
}

// 屏幕小于1500时自动折叠
onMounted(() => {
  if (document.body.clientWidth < 1500) {
    collapseChage()
  }
})

// 获取用户名
const username = localStorage.getItem('local_username')

// 监听下拉菜单-菜单选项点击事件并跳转路由。
const router = useRouter()
const handleCommand = command => {
  if (command === 'loginout') {
    localStorage.removeItem('local_username')
    router.push('/login')
  } else if (command === 'user') {
    router.push('/user')
  }
}
</script>

<style lang="scss" scoped>
.header {
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  background-color: #242f42;
}
.collapse-btn {
  padding: 0 20px;
}
.header-right {
  padding-right: 50px;
}
.btn-bell {
  position: relative;
  .btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
  }
}

.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
  img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
