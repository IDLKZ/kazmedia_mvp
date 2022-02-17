<template>
<section>
  <VideoPlayer src="https://qazmedia.kz/wp-content/themes/qazmedia/video/video_kmo.webm" :autoplay="true"></VideoPlayer>
</section>
</template>

<script>
import VideoPlayer from 'nuxt-video-player'

require('nuxt-video-player/src/assets/css/main.css')
export default {
  name: "cabinet",
  layout:"user_layout",
  middleware:["auth","user"],
  components: {VideoPlayer}
}
</script>

<style scoped>

</style>
