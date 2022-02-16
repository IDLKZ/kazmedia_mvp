import Vue from 'vue'
import moment from "moment";

const globals = {
  install(Vue,) {
    Vue.mixin({
        data(){
          return {
            btn_save: '',
            saveColor: ''
          }
        },
        computed: {},
        methods: {
          toDateUrl(date){
            try{
              let dateTime = new Date(date);
              return moment(date).format("HH:mm DD/MM/YYYY");
            }
            catch (e) {

            }
          },
          toApiDate(date){
            try{
              let dateTime = new Date(date);
              return moment(date).format("YYYYMMDDHHmm");
            }
            catch (e) {

            }
          }
        }
      }
    )
  }
}

Vue.use(globals);
