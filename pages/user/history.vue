<template>
  <v-container>
    <v-row>
      <v-card
        :loading="loading"
        class="mx-auto my-12"
        max-width="374"
        v-for="(item, index) in items"
        :key="index"
      >
        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-img
          height="250"
          src="https://sun9-14.userapi.com/sun9-83/impf/c626918/v626918908/27605/Iol2Gg1fY5I.jpg?size=595x590&quality=96&sign=d5e0337b0148f51654759a00f1e102f7&c_uniq_tag=f-db2Ky6XkD0LdjyCendxkLRtYSATLVQp_Q9rDg9K-0&type=album"
        ></v-img>

        <v-card-title>{{item.title}}</v-card-title>

        <v-card-text>

          <div class="my-4 text-subtitle-1">
            $ • {{ item.price }}
          </div>

        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-title>{{ item.room }}</v-card-title>

        <v-card-text>
          <v-chip-group
            v-model="selection"
            active-class="deep-purple accent-4 white--text"
            column
          >
            <v-chip>{{ item.start }}</v-chip>

            <v-chip>{{ item.end }}</v-chip>

          </v-chip-group>
        </v-card-text>

        <!--      <v-card-actions>-->
        <!--        <v-btn-->
        <!--          color="deep-purple lighten-2"-->
        <!--          text-->
        <!--          @click="reserve"-->
        <!--        >-->
        <!--          Reserve-->
        <!--        </v-btn>-->
        <!--      </v-card-actions>-->
      </v-card>
    </v-row>

  </v-container>
</template>

<script>
export default {
  layout: 'user_layout',
  middleware: ['auth', 'user'],
  name: "history",
  data: () => ({
    loading: false,
    selection: 1,
    items: [
      {
        'title': 'Агентство \\"Хабар\\" АО',
        'start': '09:00',
        'end': '13:00',
        'room': 'АСБ - 3',
        'price': '150000'
      },
      {
        'title': 'Евразия + ОРТ ТОО',
        'start': '10:00',
        'end': '14:00',
        'room': 'АСБ - 5',
        'price': '200000'
      },
      {
        'title': 'КАА СЕРВИС ТОО',
        'start': '13:00',
        'end': '22:00',
        'room': 'АСБ - 10',
        'price': '500000'
      },
    ]
  }),

  methods: {
    reserve () {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },
  },
}
</script>

<style scoped>

</style>
