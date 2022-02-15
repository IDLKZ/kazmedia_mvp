<template>
<div>
  <p>HI!</p>
  <v-btn @click="$auth.logout()">Выйти</v-btn>

</div>
</template>

<script>
export default {
  name: "cabinet",
  middleware:["auth","user"],
}
</script>

<style scoped>

</style>
