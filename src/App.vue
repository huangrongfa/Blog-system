<template>
  <div id="app">
    <div class="headers"></div>
    <router-view v-wechat-title='$route.meta.title'></router-view>
  </div>
</template>

<script>


export default {
  name: 'app'
}
</script>
<style lang="stylus" scoped>

</style>


