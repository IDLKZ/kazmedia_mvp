<template>
<div>
  <p>HI!</p>
  <pre>
    {{$auth.user.role_id}}
  </pre>
  <v-btn @click="$auth.logout()">
    logout

  </v-btn>
</div>
</template>

<script>
export default {
  name: "cabinet"
}
</script>

<style scoped>

</style>
