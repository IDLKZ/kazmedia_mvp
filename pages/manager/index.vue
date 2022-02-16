<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-date-picker v-model="picker"
          locale="ru"
          color="green lighten-1"
        ></v-date-picker>
      </v-col>
      <v-col cols="9">
        <v-row class="fill-height">
          <v-col>

            <v-sheet height="600">
              <v-calendar
                light
                :short-intervals=false
                locale="ru"
                ref="calendar"
                v-model="focus"
                color="primary"
                type="category"
                category-show-all
                :categories="categories"
                :events="events"
                :event-color="getEventColor"
                @change="fetchEvents"
              ></v-calendar>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'

export default {
  layout: 'manager',
  name: "index",
  middleware: ["auth", "admin"],

  data () {
    return {
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      focus: '',
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: [],
      categories: [],
    }
  },
  mounted () {
    let today = new Date()
    const dateString = moment(today).format('YYYY-MM-DD');
    this.getData(dateString)
    this.$refs.calendar.checkChange()
  },
  methods: {
    setToday () {
      this.focus = ''
    },
    getEventColor (event) {
      return event.color
    },
    fetchEvents ({start, end}) {
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount.length; i++) {
        const allDay = this.rnd(0, 3) === 0
        events.push({
          name: 'sd',
          start: start,
          end: end,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
          category: 'sdds',
        })
      }

      this.events = events
      console.log(this.events)
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    async getData(date) {
      this.focus = date
      const categories = [],
            events = []

      let dd = date.replaceAll('-', '')+'000000';
      const url = 'http://127.0.0.1:8000/api/getCalendar/' + dd + '/1';
      let res = await this.$axios.get(url).then((res) => res.data)
      // console.log(res)
      for (let i = 0; i < res.length; i++){
        let first = new Date(res[i].StartDate),
            second = new Date(res[i].EndDate)

        if (!categories.includes(res[i].Client)){
          categories.push(res[i].Client)
        }
        events.push({
          name: res[i].RoomID,
          more: res[i].TotalPrice,
          start: first.getTime(),
          end: second.getTime(),
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          category: res[i].Client,
          timed: true
        })
      }
      this.categories = categories
      this.events = events
      console.log(this.events)
    }
  },
  watch: {
    async picker(){
      await this.getData(this.picker)

    }
  }
}
</script>

<style scoped>

</style>
