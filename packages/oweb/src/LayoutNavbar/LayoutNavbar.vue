<template>
  <section
    class="navbar"
    :class="{ fixed, ['pure-state']: fixed && scrollerY < 54 }"
    :style="{
      ['--opacity']: scrollerY > 54 ? 1 : scrollerY / 54,
      ['--left']: `${left}px`,
      ['--color-text']: scrollerY > 54 ? '#000' : '#fff',
    }"
  >
    <section class="search-start" @click="handleSaerch">
      <span class="nav-search" type="text" autocomplete="false">
        关键字搜索
      </span>
      <span class="nav-search-key">ctrl+k</span>
      <!-- <WNavSearch v-model:visible="searchVisible" /> -->
    </section>
    <section class="nav-right">
      <!-- <Space style="margin-right: 12px">
				<Button shape="round" type="primary" @click="goto('/admin')">管理端</Button>
				<Button shape="round" type="primary" @click="goto('/')">WEB端</Button>
			</Space> -->
      <Dropdown trigger="click" @select="onSelectUserMenu">
        <div class="user-info">
          <Avatar
            :size="32"
            :style="{ marginRight: '12px', backgroundColor: '#fff' }"
          >
            <img :src="userInfo.avatar" alt="" />
          </Avatar>
          <span class="uname">{{ userName }}</span>
          <WICon class="arrow-down" icon="ic:outline-keyboard-arrow-down" />
        </div>
        <template #content>
          <div class="user-droplist">
            <ADoption value="setting">
              <WICon icon="ic:round-settings" />
              个人设置
            </ADoption>
            <ADoption value="changePasswd">
              <WICon icon="mdi:security" />
              修改密码
            </ADoption>
            <ADoption value="logout">
              <WICon icon="ic:baseline-power-settings-new" />
              退出登录
            </ADoption>
            <div class="version">版本号:V{{ appVersion }}</div>
          </div>
        </template>
      </Dropdown>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar, Dropdown, Message } from '@arco-design/web-vue'
import { useAppStore, useUserStore } from 'pinia-store'
import { useRouter } from 'vue-router'
import WICon from '../WICon/WICon.vue'
import { useLogin } from '@ohooks/useLogin'
// import WNavSearch from '../WNavSearch/WNavSearch.vue'

const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()
const appVersion = computed(() => appStore.version)
const { logout } = useLogin()
const userInfo = computed(() => userStore.userInfo)
const userName = computed(
  () => userInfo.value.userName || userInfo.value.userLoginName,
)
const searchVisible = ref(false)

const props = defineProps<{
  layoutType?: 'admin' | 'web'
  scrollerY: number
  fixed?: boolean
  left?: number
}>()

// 搜索
const handleSaerch = () => {
  if (props.layoutType === 'admin') {
    Message.warning('请前往WEB端使用，管理端正在开发中')
    return
  }
  searchVisible.value = true
}

const PerCenterDialog = ref(false) // 个人中心弹窗
const onSelectUserMenu = (value: any) => {
  if (value === 'logout') {
    logout()
    return
  }

  if (value === 'changePasswd') {
    router.push({
      name: 'mine.setting.passwd',
    })
  }

  if (value == 'setting') {
    PerCenterDialog.value = true
  }
}

// const goto = (path: string) => {
// 	location.href = path
// }
</script>

<style scoped lang="less">
@text-color-normal: var(--color-text-1);
.navbar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 @space-8;
  height: @web-navbar-height;
  flex: 0 0 auto;
  // backdrop-filter: blur(30px);
  // border-bottom: 1px solid var(--color-border-2);
  // background-color: var(--color-fill-1);
}

.fixed {
  position: fixed;
  top: 0;
  z-index: 500;
  background-color: rgba(255, 255, 255, var(--opacity));
  left: var(--left);
  right: 0;
  box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.1);
  // background-color: red;
}

.pure-state {
  box-shadow: none;
  .uname {
    color: var(--color-text);
  }
  .arrow-down {
    color: var(--color-text);
  }
  :deep {
    .nav-search {
      background-color: rgba(0, 0, 0, 0.5);
      color: rgba(255, 255, 255, 0.6);
      &:hover {
        background-color: rgba(0, 0, 0, 0.8);
      }
    }

    .nav-search-key {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
}

.search-start {
  position: relative;
  display: flex;
  align-items: center;
}

.nav-search-key {
  position: absolute;
  right: 4px;
  top: 4px;
  margin-left: @space-1;
  height: 24px;
  line-height: 24px;
  background-color: var(--color-fill-1);
  color: #000;
  padding: 0 10px;
  border-radius: 4px;
}

.nav-search {
  display: block;
  line-height: 32px;
  user-select: none;
  height: 32px;
  padding: 0 @space-4;
  width: 200px;
  box-sizing: border-box;
  background-color: var(--color-fill-2);
  color: var(--color-text-2);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: var(--color-fill-3);
  }
  &:active {
    opacity: 0.8;
  }
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: @text-color-normal;
}

.user-droplist {
  width: 140px;
  :deep(.w-icon) {
    font-size: 20px;
    margin-right: @space-2;
  }
  :deep(.arco-dropdown-option-content) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.uname {
  font-size: 16px;
}

.arrow-down {
  font-size: 20px;
}

.nav-right {
  display: flex;
  align-items: center;
}

.divider {
  margin: 0;
}

.version {
  text-align: center;
  padding: @space-1;
  color: var(--color-text-2);
  font-size: 14px;
  border-top: 1px solid var(--color-border-2);
}
</style>
