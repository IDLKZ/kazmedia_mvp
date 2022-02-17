<template>
  <v-app dark>
<!--    <v-navigation-drawer-->
<!--      v-model="drawer"-->
<!--      absolute-->
<!--      temporary-->
<!--      app-->
<!--      dark-->
<!--    >-->
<!--      <v-list-item>-->
<!--        <v-list-item-avatar>-->
<!--          <v-img src="/favicon.jpg"></v-img>-->
<!--        </v-list-item-avatar>-->

<!--        <v-list-item-content>-->
<!--          <v-list-item-title>{{$auth.user.name}}</v-list-item-title>-->
<!--          <v-list-item-subtitle>{{$auth.user.email}}</v-list-item-subtitle>-->
<!--        </v-list-item-content>-->
<!--      </v-list-item>-->

<!--      <v-divider></v-divider>-->

<!--      <v-list dense>-->
<!--        <v-list-item-->
<!--          v-for="item in items"-->
<!--          :key="item.title"-->
<!--          link-->
<!--          :to="item.to"-->
<!--        >-->
<!--          <v-list-item-icon>-->
<!--            <v-icon>{{ item.icon }}</v-icon>-->
<!--          </v-list-item-icon>-->

<!--          <v-list-item-content>-->
<!--            <v-list-item-title>{{ item.title }}</v-list-item-title>-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->
<!--      </v-list>-->
<!--    </v-navigation-drawer>-->

    <v-app-bar app dark>
<!--      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>-->
      <img class="mr-4" src="/logo_kmo.png" width="100px"/>
      <v-btn icon class="ms-auto">
        <v-icon color="white" @click="$auth.logout()">mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>


    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "manager"
}
</script>

<style scoped>

</style>
