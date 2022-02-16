<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-date-picker v-model="picker"
          locale="ru"

        ></v-date-picker>
      </v-col>
      <v-col cols="9">
        <v-row class="fill-height">
          <v-col>
            <v-sheet height="64">
              <v-toolbar
                flat
              >
                <v-btn
                  outlined
                  class="mr-4"
                  color="grey darken-2"
                  @click="setToday"
                >
                  Today
                </v-btn>
                <v-btn
                  fab
                  text
                  small
                  color="grey darken-2"
                  @click="prev"
                >
                  <v-icon small>
                    mdi-chevron-left
                  </v-icon>
                </v-btn>
                <v-btn
                  fab
                  text
                  small
                  color="grey darken-2"
                  @click="next"
                >
                  <v-icon small>
                    mdi-chevron-right
                  </v-icon>
                </v-btn>
                <v-toolbar-title v-if="$refs.calendar">
                  {{ $refs.calendar.title }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
            </v-sheet>
            <v-sheet height="600">
              <v-calendar
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
    let today = new Date('2022-02-15')
    const dateString = moment(today).format('YYYY-MM-DD');
    this.getData(dateString)
    this.$refs.calendar.checkChange()
  },
  methods: {
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    getEventColor (event) {
      return event.color
    },
    fetchEvents ({ start, end }) {
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
          category: this.categories[this.rnd(0, this.categories.length - 1)],
        })
      }

      this.events = events
      console.log(this.events)
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    async getData(date) {
      const categories = [],
            events = []

      let dd = date.replaceAll('-', '')+'000000';
      const url = 'http://127.0.0.1:8000/api/getCalendar/' + dd + '/1';
      let res = await this.$axios.get(url).then((res) => res.data)
      // console.log(res)
      for (let i = 0; i < res.length; i++){
        let first = new Date(res[i].StartDate),
            second = new Date(res[i].EndDate),
            allDay = this.rnd(0, 3) === 0
        categories.push(res[i].Client)
        events.push({
          name: res[i].RoomID,
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          category: res[i].Client,
          timed: !allDay
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
