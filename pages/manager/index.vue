<template>
  <section>
    <div>
      <p>HI!</p>
      <v-btn @click="$auth.logout()">Выйти</v-btn>
    </div>
  </section>
</template>

<script>
export default {
  name: "index",
  middleware: ["auth", "admin"]
}
</script>

<style scoped>

</style>
