<template>
  <section>
    <v-container>


      <v-row class="d-flex justify-center">
        <v-col md="8">
          <v-card class="pa-5">
            <div class="my-2">
              <h1>Создать заявку</h1>
            </div>

            <div class="form-group">
              <v-select
                prepend-inner-icon="fas fa-boxes"
                :items="['1','2']"
                label="Выберите зал"
                outlined
                color="#2f2d72"
                type="text"
                class="custom-input"
                solo
              ></v-select>
            </div>

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
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  no-title
                  scrollable
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

            <v-divider></v-divider>
            <template>

              <div class="form-group">
                <v-select
                  prepend-inner-icon="fas fa-video"
                  :items="['HD 16:9','SD 16:9']"
                  label="Формат записи"
                  outlined
                  color="#2f2d72"
                  type="text"
                  class="custom-input"
                  solo
                ></v-select>
              </div>

              <div class="form-group">
                <v-checkbox
                  :label="'Кран'"
                  color="#2f2d72"
                ></v-checkbox>
              </div>

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
                ></v-text-field>
              </div>

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
                ></v-text-field>
              </div>

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
                ></v-text-field>
              </div>

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
                ></v-text-field>
              </div>

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
                ></v-text-field>
              </div>

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
                ></v-text-field>
              </div>

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
                ></v-text-field>
              </div>

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
                ></v-text-field>
              </div>

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
                ></v-text-field>
              </div>

              <div class="form-group">
                <v-select
                  prepend-inner-icon="fas fa-play"
                  :items="['MD','CD']"
                  label="Проигрыватель - выбор из двух вариантов "
                  outlined
                  color="#2f2d72"
                  type="text"
                  class="custom-input"
                  solo
                ></v-select>
              </div>

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
                ></v-select>
              </div>

              <div class="form-group">
                <v-checkbox
                  :label="'Звуковые процессоры'"
                  color="#2f2d72"
                ></v-checkbox>
              </div>

              <div class="form-group">
                <v-checkbox
                  :label="'Телефонный гибрид '"
                  color="#2f2d72"
                ></v-checkbox>
              </div>

              <div class="form-group">
                <v-checkbox
                  :label="'Skype'"
                  color="#2f2d72"
                ></v-checkbox>
              </div>

              <div class="form-group">
                <v-checkbox
                  :label="'Инжест Studio'"
                  color="#2f2d72"
                ></v-checkbox>
              </div>

              <div class="form-group">
                <v-checkbox
                  :label="'Инжест Production '"
                  color="#2f2d72"
                ></v-checkbox>
              </div>

              <div class="form-group">
                <v-checkbox
                  :label="'Инжест News'"
                  color="#2f2d72"
                ></v-checkbox>
              </div>

              <div class="form-group">
                <v-checkbox
                  :label="'Инжест Cinegy'"
                  color="#2f2d72"
                ></v-checkbox>
              </div>

              <div class="form-group">
                <v-checkbox
                  :label="'MCR'"
                  color="#2f2d72"
                ></v-checkbox>
              </div>
              <v-divider></v-divider>
              <div class="form-group">
                <v-btn class="main-button">Рассчитать</v-btn>
              </div>
              <div class="form-group">
                <v-text-field
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

              <v-divider></v-divider>
              <div class="form-group">
                <v-btn class="main-button">Подать заявку</v-btn>
              </div>
            </template>

          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </section>
</template>

<script>
export default {
  name: "create",
  layout: "user_layout",
  middleware: ["auth", "user"],
  data() {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
    }
  }
}
</script>

<style scoped lang="scss">
.form-group {
  margin: 10px;
}
</style>
