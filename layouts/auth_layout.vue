<template>
<v-app class="auth_app">
  <v-main>
    <v-container>
      <Nuxt />
    </v-container>
  </v-main>
</v-app>
</template>

<script>
export default {
  name: "auth_layout"
}
</script>

<style scoped lang="scss">
.auth_app{
  background-image: url("/bg1.png");
  background-size: cover;
}


</style>
