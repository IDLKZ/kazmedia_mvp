<template>
  <section>
    <v-container>


      <v-row class="d-flex justify-center">
        <v-col md="8">
          <v-card class="pa-5">
            <div class="my-2">
              <h1>Создать заявку</h1>
            </div>
            <template v-if="fails.length > 0">
              <v-alert
                type="error"
                v-for="error in Object.entries(this.fails)"
              >
                {{error[0]}} - {{error[1]}}
              </v-alert>
            </template>
            <!--            Выбор комнаты-->
            <div class="form-group">
              <v-autocomplete
                prepend-inner-icon="fas fa-boxes"
                :items="this.rooms"
                v-model="forms.RoomID"
                item-value="RoomID"
                item-text="RoomTitle"
                label="Выберите зал"
                outlined
                color="#2f2d72"
                type="text"
                class="custom-input"
                solo
                @change="changeRoom"
                :error="fails.RoomID != null"
                :error-messages="fails.RoomID"
              ></v-autocomplete>
            </div>
            <!--Выбор имени-->
            <div class="form-group">
              <v-text-field
                :prepend-inner-icon="$auth.user.type_id == 1 ?'fas fa-building':'fas fa-user'"
                outlined
                disabled
                v-model="$auth.user.name"
                :label="$auth.user.type_id == 1 ? 'Наименование компании' : 'Ваше ФИО'"
                :hint="$auth.user.type_id == 1 ? 'Укажите Наименование компании' : 'Укажите Ваше ФИО'"
                required
                clearable
                color="#2f2d72"
                type="text"
                class="custom-input"
                background-color="white"
                light
                solo
              ></v-text-field>
            </div>
            <!--Второй этап - выбор даты-->
            <template v-if="firstStep">
              <div class="form-group">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      hint="Выберите день недели"
                      outlined
                      v-model="date"
                      label="Выберите день"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      color="#2f2d72"
                      class="custom-input"
                      v-bind="attrs"
                      v-on="on"
                      solo
                      @change="changeDate"
                      :error="fails.RequestDate != null"
                      :error-messages="fails.RequestDate"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    :min="nowDate"
                    :max="getEndDate"
                    no-title
                    scrollable
                    @change="changeDate"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="menu = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </div>
            </template>
            <!--Конец второго этапа-->

            <!-- Начало третьего этапа - выбор свободного времени     -->
            <template v-if="secondStep">
              <v-row>
                <v-col md="6">
                  <v-autocomplete
                    prepend-inner-icon="fas fa-clock"
                    :items="freeTimes"
                    v-model="start"
                    item-value="StartDate"
                    :item-text="item=>toDateUrl(item.StartDate)"
                    label="Время начала"
                    outlined
                    color="#2f2d72"
                    type="text"
                    class="custom-input"
                    solo
                    @change="changeStart"
                    :error="fails.StartDate != null"
                    :error-messages="fails.StartDate"
                  ></v-autocomplete>
                </v-col>
                <v-col md="6">
                  <v-autocomplete
                    prepend-inner-icon="fas fa-clock"
                    :items="freeTimeEnd"
                    v-model="end"
                    item-value="StartDate"
                    :item-text="item=>toDateUrl(item.EndDate)"
                    label="Время окончания"
                    outlined
                    color="#2f2d72"
                    type="text"
                    class="custom-input"
                    solo
                    @change="changeEnd"
                    :error="fails.EndDate != null"
                    :error-messages="fails.EndDate"
                  ></v-autocomplete>
                </v-col>
              </v-row>


            </template>
            <!--Конец третьего этапа-->
<!--          Начало четвертого этапа-->
            <v-divider></v-divider>
            <template v-if="thirdStep">
<!--          Формат записи - RecordFormat-->
              <div class="form-group">
                <v-select
                  prepend-inner-icon="fas fa-video"
                  :items="['HD 16:9','SD 16:9']"
                  v-model="forms.RecordFormat"
                  label="Формат записи"
                  outlined
                  color="#2f2d72"
                  type="text"
                  class="custom-input"
                  solo
                  :error="fails.RecordFormat != null"
                  :error-messages="fails.RecordFormat"
                ></v-select>
              </div>
<!--              Конец записи-->

<!--       	Crane – Кран – Булево       -->
              <div class="form-group">
                <v-checkbox
                  :label="'Кран'"
                  color="#2f2d72"
                  v-model="forms.Crane"
                  :error="fails.Crane != null"
                  :error-messages="fails.Crane"
                ></v-checkbox>
              </div>
<!-- Конец 	Crane – Кран – Булево-->

<!--            	CameraAmount -  Количество видеокамер тип: Число -->
              <div class="form-group">
                <v-text-field
                  prepend-inner-icon="fas fa-video"
                  outlined
                  label="Количество видеокамер"
                  hint="Количество видеокамер от 0 до 100"
                  required
                  clearable
                  color="#2f2d72"
                  type="number"
                  min="0"
                  max="100"
                  class="custom-input"
                  background-color="white"
                  light
                  solo
                  v-model="forms.CameraAmount"
                  :error="fails.CameraAmount != null"
                  :error-messages="fails.CameraAmount"
                ></v-text-field>
              </div>
<!--Конец CameraAmount -  Количество видеокамер -->

<!--              4.	CGAmount - CG - – тип: Число.-->
              <div class="form-group">
                <v-text-field
                  prepend-inner-icon="fas fa-video"
                  outlined
                  label="CG"
                  hint="CG  от 0 до 100"
                  required
                  clearable
                  color="#2f2d72"
                  type="number"
                  min="0"
                  max="100"
                  class="custom-input"
                  background-color="white"
                  light
                  solo
                  v-model="forms.CGAmount"
                  :error="fails.CGAmount != null"
                  :error-messages="fails.CGAmount"
                ></v-text-field>
              </div>
              <!--             КОНЕЦ 4.	CGAmount - CG - – тип: Число.-->

<!--              5.	PrompterAmount - Количество суфлеров – тип: Число -->
              <div class="form-group">
                <v-text-field
                  prepend-inner-icon="fas fa-users"
                  outlined
                  label="Количество суфлеров "
                  hint="Количество суфлеров от 0 до 100"
                  required
                  clearable
                  color="#2f2d72"
                  type="number"
                  min="0"
                  max="100"
                  class="custom-input"
                  background-color="white"
                  light
                  solo
                  v-model="forms.PrompterAmount"
                  :error="fails.PrompterAmount != null"
                  :error-messages="fails.PrompterAmount"
                ></v-text-field>
              </div>
<!--Конец 5.	PrompterAmount - Количество суфлеров – тип: Число-->

<!--6.	VideoWall - Видеостена – тип: Число-->
              <div class="form-group">
                <v-text-field
                  prepend-inner-icon="fas fa-box"
                  outlined
                  label="Видеостена "
                  hint="Количество видеостен от 0 до 100"
                  required
                  clearable
                  color="#2f2d72"
                  type="number"
                  min="0"
                  max="100"
                  class="custom-input"
                  background-color="white"
                  light
                  solo
                  v-model="forms.VideoWall"
                  :error="fails.VideoWall != null"
                  :error-messages="fails.VideoWall"
                ></v-text-field>
              </div>
<!--6.Конец	VideoWall - Видеостена – тип: Число-->

<!--              7.	StudioMonitor - Студийный монитор – тип: Число.-->
              <div class="form-group">
                <v-text-field
                  prepend-inner-icon="fas fa-desktop"
                  outlined
                  label="Студийные мониторы "
                  hint="Количество cтудийных мониторов от 0 до 100"
                  required
                  clearable
                  color="#2f2d72"
                  type="number"
                  min="0"
                  max="100"
                  class="custom-input"
                  background-color="white"
                  light
                  solo
                  v-model="forms.StudioMonitor"
                  :error="fails.StudioMonitor != null"
                  :error-messages="fails.StudioMonitor"
                ></v-text-field>
              </div>
<!--Конец 7.	StudioMonitor - Студийный монитор – тип: Число.-->

<!--8.	WiredMicAmount - Количество микрофон проводной – тип: Число.-->
              <div class="form-group">
                <v-text-field
                  prepend-inner-icon="fas fa-microphone"
                  outlined
                  label="Микрофон проводной "
                  hint="Количество микрофон проводной от 0 до 100"
                  required
                  clearable
                  color="#2f2d72"
                  type="number"
                  min="0"
                  max="100"
                  class="custom-input"
                  background-color="white"
                  light
                  solo
                  v-model="forms.WiredMicAmount"
                  :error="fails.WiredMicAmount != null"
                  :error-messages="fails.WiredMicAmount"
                ></v-text-field>
              </div>
<!--Конец 8.	WiredMicAmount - Количество микрофон проводной – тип: Число.-->

<!--9.	WirelessMicAmount - Количество микрофонов беспроводной – тип: Число.-->
              <div class="form-group">
                <v-text-field
                  prepend-inner-icon="fas fa-microphone"
                  outlined
                  label="Микрофон беспроводной"
                  hint="Количество микрофонов беспроводной  от 0 до 100"
                  required
                  clearable
                  color="#2f2d72"
                  type="number"
                  min="0"
                  max="100"
                  class="custom-input"
                  background-color="white"
                  light
                  solo
                  v-model="forms.WirelessMicAmount"
                  :error="fails.WirelessMicAmount != null"
                  :error-messages="fails.WirelessMicAmount"
                ></v-text-field>
              </div>
<!--Конец 9.	WirelessMicAmount - Количество микрофонов беспроводной – тип: Число.-->

<!--              10.	RadioPAmount – Количество радио петличка – тип: Число.-->
              <div class="form-group">
                <v-text-field
                  prepend-inner-icon="fas fa-microphone"
                  outlined
                  label="Количество радио петличка "
                  hint="Количество радио петличка   от 0 до 100"
                  required
                  clearable
                  color="#2f2d72"
                  type="number"
                  min="0"
                  max="100"
                  class="custom-input"
                  background-color="white"
                  light
                  solo
                  v-model="forms.RadioPAmount"
                  :error="fails.RadioPAmount != null"
                  :error-messages="fails.RadioPAmount"

                ></v-text-field>
              </div>
<!--          Конец    10.	RadioPAmount – Количество радио петличка – тип: Число.-->
<!-- 11.	RadioMicAmount - Количество радиомикрофон – тип: Число.-->
              <div class="form-group">
                <v-text-field
                  prepend-inner-icon="fal fa-microphone"
                  outlined
                  label="Количество радиомикрофонов"
                  hint="Количество радиомикрофон  от 0 до 100"
                  required
                  clearable
                  color="#2f2d72"
                  type="number"
                  min="0"
                  max="100"
                  class="custom-input"
                  background-color="white"
                  light
                  solo
                  v-model="forms.RadioMicAmount"
                  :error="fails.RadioMicAmount != null"
                  :error-messages="fails.RadioMicAmount"
                ></v-text-field>
              </div>
<!-- Конец 11.	RadioMicAmount - Количество радиомикрофон – тип: Число.-->

<!--              12.	Player - Проигрыватель - выбор из двух вариантов (MD или CD. По умолчанию заполняется как MD, и она не приходит из 1С). Тип - String-->
              <div class="form-group">
                <v-select
                  prepend-inner-icon="fas fa-play"
                  :items="['MD','CD']"
                  label="Проигрыватель - выбор из двух вариантов "
                  outlined
                  color="#2f2d72"
                  type="text"
                  class="custom-input"
                  v-model="forms.Player"
                  :error="fails.Player != null"
                  :error-messages="fails.Player"
                  solo
                ></v-select>
              </div>
<!--Конец 12.	Player - Проигрыватель - выбор из двух вариантов (MD или CD. По умолчанию заполняется как MD, и она не приходит из 1С). Тип - String-->

<!--              13.	Listening - Подслушка - выбор из двух вариантов (Проводная или Беспроводная. По умолчанию заполняется как Беспроводная, и она не приходит из 1С). Тип - String-->
              <div class="form-group">
                <v-select
                  prepend-inner-icon="fas fa-headset"
                  :items="['Проводная','Беспроводная']"
                  label="Подслушка - выбор из двух вариантов "
                  outlined
                  color="#2f2d72"
                  type="text"
                  class="custom-input"
                  solo
                  v-model="forms.Listening"
                  :error="fails.Listening != null"
                  :error-messages="fails.Listening"
                ></v-select>
              </div>
 <!-- Конец   13.	Listening - Подслушка - выбор из двух вариантов (Проводная или Беспроводная. По умолчанию заполняется как Беспроводная, и она не приходит из 1С). Тип - String-->

<!--              14.	SoundProc - Звуковые процессоры – Булево-->
              <div class="form-group">
                <v-checkbox
                  :label="'Звуковые процессоры'"
                  color="#2f2d72"
                  v-model="forms.SoundProc"
                  :error="fails.SoundProc != null"
                  :error-messages="fails.SoundProc"
                ></v-checkbox>
              </div>
<!--Конец 14.	SoundProc - Звуковые процессоры – Булево-->

<!-- 15.	PhoneHybrid - Телефонный гибрид – Булево-->
              <div class="form-group">
                <v-checkbox
                  :label="'Телефонный гибрид '"
                  color="#2f2d72"
                  v-model="forms.PhoneHybrid"
                  :error="fails.PhoneHybrid != null"
                  :error-messages="fails.PhoneHybrid"
                ></v-checkbox>
              </div>
<!--Конец 15.	PhoneHybrid - Телефонный гибрид – Булево-->

<!--              16.	Skype – Булево (По умолчанию – Ложь. Не приходит из 1С).-->
              <div class="form-group">
                <v-checkbox
                  :label="'Skype'"
                  color="#2f2d72"
                  v-model="forms.Skype"
                  :error="fails.Skype != null"
                  :error-messages="fails.Skype"
                ></v-checkbox>
              </div>
<!--Конец 16.	Skype – Булево (По умолчанию – Ложь. Не приходит из 1С).-->

<!--              1.	IngestStudio - Инжест Studio – тип Булево;-->
              <div class="form-group">
                <v-checkbox
                  :label="'Инжест Studio'"
                  color="#2f2d72"
                  v-model="forms.IngestStudio"
                  :error="fails.IngestStudio != null"
                  :error-messages="fails.IngestStudio"
                ></v-checkbox>
              </div>
<!--End 1.	IngestStudio - Инжест Studio – тип Булево;-->

<!--2.	IngestProd - Инжест Production – тип Булево;-->
              <div class="form-group">
                <v-checkbox
                  :label="'Инжест Production '"
                  color="#2f2d72"
                  v-model="forms.IngestProd"
                  :error="fails.IngestProd != null"
                  :error-messages="fails.IngestProd"
                ></v-checkbox>
              </div>
<!--End 2.	IngestProd - Инжест Production – тип Булево;-->

<!--              3.	IngestNews - Инжест News – тип Булево;-->
              <div class="form-group">
                <v-checkbox
                  :label="'Инжест News'"
                  color="#2f2d72"
                  v-model="forms.IngestNews"
                  :error="fails.IngestNews != null"
                  :error-messages="fails.IngestNews"
                ></v-checkbox>
              </div>
<!--End 3.	IngestNews - Инжест News – тип Булево;-->
<!-- 4.	IngestCinegy - Инжест Cinegy – тип Булево;-->
              <div class="form-group">
                <v-checkbox
                  :label="'Инжест Cinegy'"
                  color="#2f2d72"
                  v-model="forms.IngestCinegy"
                  :error="fails.IngestNews != null"
                  :error-messages="fails.IngestNews"
                ></v-checkbox>
              </div>
<!--End 4.	IngestCinegy - Инжест Cinegy – тип Булево;-->
              <div class="form-group">
                <v-checkbox
                  :label="'MCR'"
                  color="#2f2d72"
                  v-model="forms.MCR"
                  :error="fails.MCR != null"
                  :error-messages="fails.MCR"
                ></v-checkbox>
              </div>

              <template>
                <v-divider></v-divider>
                <div class="form-group">
                  <v-btn class="main-button" @click="getCalculation">Рассчитать в тенге</v-btn>
                </div>
                <div class="form-group" v-if="isReady">
                  <v-text-field
                    disabled
                    v-model="forms.Sum"
                    outlined
                    label="Стоимость"
                    hint="Стоимость в тг"
                    required
                    clearable
                    color="#2f2d72"
                    type="text"
                    class="custom-input"
                    background-color="white"
                    light
                    solo
                  ></v-text-field>
                </div>

              </template>
            </template>

<!--            Конец четвертого этапа-->



            <template v-if="fifthStep">

              <v-divider></v-divider>
              <div class="form-group">
                <v-btn class="main-button" @click="sendOrder">Подать заявку</v-btn>
              </div>
            </template>


          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </section>
</template>

<script>
import moment from "moment";

export default {
  name: "create",
  layout: "user_layout",
  middleware: ["auth", "user"],
  watch: {
    "forms.RoomID"(val){
      //Сброс даты
      this.forms.RequestDate = "";
      this.forms.StartDate = "";
      this.forms.EndDate = "";
      this.date ="";
      //Время тоже сбрасываем
      this.freeTimes = [];
      this.freeTimeEnd = [];
      this.start = "";
      this.end = "";
      //Закрытие 3 и 5 окна
      this.thirdStep = false;
      this.fifthStep = false;
      this.isReady = false;
    },
    "forms.StartDate"(val){
      this.isReady = false;
    },
    "forms.RequestDate"(val){
      this.isReady = false;
    },
    "forms.EndDate"(val){
      this.isReady = false;
    },
    "forms.RecordFormat"(val){
      this.isReady = false;
    },
    "forms.Crane"(val){
      this.isReady = false;
    },
    "forms.CameraAmount"(val){
      this.isReady = false;
    },
    "forms.CGAmount"(val){
      this.isReady = false;
    },
    "forms.PrompterAmount"(val){
      this.isReady = false;
    },
    "forms.VideoWall"(val){
      this.isReady = false;
    },
    "forms.StudioMonitor"(val){
      this.isReady = false;
    },
    "forms.WiredMicAmount"(val){
      this.isReady = false;
    },
    "forms.WirelessMicAmount"(val){
      this.isReady = false;
    },
    "forms.RadioPAmount"(val){
      this.isReady = false;
    },
    "forms.RadioMicAmount"(val){
      this.isReady = false;
    },
    "forms.Player"(val){
      this.isReady = false;
    },
    "forms.Listening"(val){
      this.isReady = false;
    },
    "forms.SoundProc"(val){
      this.isReady = false;
    },
    "forms.PhoneHybrid"(val){
      this.isReady = false;
    },
    "forms.Skype"(val){
      this.isReady = false;
    },
    "forms.IngestStudio"(val){
      this.isReady = false;
    },
    "forms.IngestProd"(val){
      this.isReady = false;
    },
    "forms.IngestNews"(val){
      this.isReady = false;
    },
    "forms.IngestCinegy"(val){
      this.isReady = false;
    },
    "forms.MCR"(val){
      this.isReady = false;
    },
    "isReady"(val){
      if(val == false){
        this.fifthStep = false;
        this.Sum = "0";
      }
      else{
        this.fifthStep = true;
      }
    },
  },
  data() {
    return {
      date: "",
      nowDate: new Date().toISOString().slice(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      isReady:false,
      //Выбор зала
      firstStep: false,
      //Выбор даты
      secondStep: false,
      //Выбор параметров
      thirdStep: false,
      //Расчет
      fourthStep: false,
      //Отправка запроса
      fifthStep: false,
      //Список комнат
      rooms: [],
      //Свободное время
      freeTimes: [],
      freeTimeEnd: [],
      start: "",
      end: "",
      fails:{},
      forms: {
        RoomID: "",
        RequestDate: "",
        StartDate: "",
        EndDate: "",
        UserType: this.$auth.user.role_id,
        //Поля
        RecordFormat: "",
        Crane: false,
        CameraAmount: 1,
        CGAmount:1,
        PrompterAmount:1,
        VideoWall:1,
        StudioMonitor:1,
        WiredMicAmount:1,
        WirelessMicAmount:1,
        RadioPAmount:1,
        RadioMicAmount:1,
        Player:"",
        Listening:"",
        SoundProc:false,
        PhoneHybrid:false,
        Skype:false,
        IngestStudio:false,
        IngestProd:false,
        IngestNews:false,
        IngestCinegy:false,
        MCR:false,
        Sum:"0"

      }
    }
  },
  computed: {
    getEndDate() {
      let date = new Date();
      let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 10);
      return endDate.toISOString().slice(0, 10)
    }
  },
  methods: {
    //Выбор комнаты
    changeRoom(room) {
      if (room != null && room.toString() != "") {
        this.firstStep = true;
      }
    },
    //Выбор свободного времени
    changeDate(date) {
      if (date != null) {
        try {
          let dateTime = new Date(date);
          let ymd = dateTime.toISOString().split('T')[0].split('-');
          this.forms.RequestDate = `${ymd[0]}${ymd[1]}${ymd[2]}`;
          this.findFreeTime();
        } catch (e) {
          console.log(e);
        }
      }
    },
    //Выбор начала
    changeStart(start) {
      this.freeTimeEnd = [];
      let current = new Date();
      let find = false;
      try {
        this.freeTimes.forEach((time) => {
          let dateEnd = new Date(time.EndDate);
          //Находим свой ближайший конец времени для брони
          if (start === time.StartDate) {
            //сохраняем следующую дату в текущее время
            this.freeTimeEnd.push(time);
            current = dateEnd;
            find = true;
          } else if (find) {
            current = new Date(current.setHours(current.getHours() + 1));
            if (current.getTime() === dateEnd.getTime()) {
              this.freeTimeEnd.push(time);
              current = dateEnd;
            }
          }
        });
        this.forms.StartDate = this.toApiDate(start)
      } catch (e) {
        console.log(e);
      }

    },
    //Выбор конца
    changeEnd(end) {
      try {
        this.forms.EndDate = this.toApiDate(end);
        this.thirdStep = true;
      } catch (e) {

      }

    },
    //Изменить дату конца

    //Find Free Time
    async findFreeTime() {
      if (this.forms.RoomID != "" && this.forms.RequestDate != "") {
        try {
          let response = await this.$axios.$post("/getRoomFreeTime", this.forms);
          this.freeTimes = [];
          this.freeTimeEnd = [];
          this.start = "";
          this.end = "";
          this.forms.StartDate = "";
          this.forms.EndDate = "";
          this.freeTimes = response.data;
          this.secondStep = true;
        } catch (e) {
          console.log(e);
        }
      }
    },

    //Провести расчет стоимости
    async getCalculation(){
      try{
        this.fails = {};
        let result =await  this.$axios.$post("/getCalculation",this.forms);
        console.log(result);
        let startTime  = moment(this.forms.StartDate, 'YYYYMMDDHHmmss');
        let endTime  = moment(this.forms.EndDate, 'YYYYMMDDHHmmss');
        var duration = moment.duration(endTime.diff(startTime));
        var hours = duration.asHours() + 1;
        if(result != null){
          if(result.success){
            this.forms.Sum = hours * result.data.price;
            this.isReady = true;
          }
          else{
            this.fails = result.errors;
            this.$toast.error("Неверно заполнены поля");
          }
        }
        else{
          this.fails = result.errors;
          this.$toast.error("Упс, что-то пошло не так")
        }
      }
      catch (e) {
        if(e.response.status == 400){
          this.$toast.error("Неверно заполнены поля");
          if(e.response.data){
            this.fails = e.response.data.data;
          }
        }
        else{
          console.log(e);
          this.$toast.error("Упс, что-то пошло не так")
        }
      }
    },

    async sendOrder(){
      this.$toast.success('Ваша заявка успешно отправлена!')
      await this.$router.push({
        path: "/user/history"
      })
    }
  },

  async mounted() {

    try {
      let response = await this.$axios.$get("/getRooms",);
      this.rooms = response.data;

    } catch (e) {
      console.log(e);
      this.$toast.error("Что-то пошло не так, попробуйте перезагрузить страницу");
    }
  }
}
</script>

<style scoped lang="scss">
.form-group {
  margin: 10px;
}
</style>
