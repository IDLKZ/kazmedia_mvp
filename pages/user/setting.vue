<template>
<section>
  <v-container>
    <v-row>
      <v-col md="4">
        <v-card class="pa-md-5">
          <div class="text-center">
            <h1 class="text--black font-weight-bold main-color">Профиль</h1>
            <v-avatar class="my-2" size="150">
              <v-img src="/favicon.jpg"></v-img>
            </v-avatar>
            <v-divider></v-divider>
            <v-list class="my-2">
              <v-list-item-group>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>fas fa-user</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="$auth.user.name"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>fas fa-envelope</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="$auth.user.email"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>fas fa-phone</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="$auth.user.phone"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>fas fa-building</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="$auth.user.type_id == 1 ?'Юридическое лицо':'Физическое лицо' "></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>fas fa-address-card</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="$auth.user.type_id == 1 ?'БИН ' + $auth.user.bin:'ИИН ' + $auth.user.bin "></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>fas fa-clock</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{registered}}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
        </v-card>
      </v-col>

      <v-col md="8">
        <v-card class="pa-5">
          <form class="my-4" @submit.prevent="()=>{}">
            <v-radio-group disabled
                           mandatory
            >
              <template v-slot:label>
                <div>Вы являетесь:</div>
              </template>
              <v-radio   value="1" v-if="$auth.user.type_id == 1" >
                <template v-slot:label>
                  <div>Юридическим лицом</div>
                </template>
              </v-radio>
              <v-radio value="2" v-else>
                <template v-slot:label>
                  <div>Физическим лицом</div>
                </template>
              </v-radio>
            </v-radio-group>

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
              :error="fails.name != null"
              :error-messages="fails.name"
            ></v-text-field>
            <v-text-field
              prepend-inner-icon="fas fa-envelope"
              outlined
              disabled
              v-model="$auth.user.email"
              label="E-mail"
              hint="Укажите email"
              required
              clearable
              color="#2f2d72"
              type="email"
              class="custom-input"
              background-color="white"
              light
              solo
              :error="fails.email != null"
              :error-messages="fails.email"
            ></v-text-field>
            <v-text-field
              prepend-inner-icon="fas fa-phone"
              outlined
              v-model="form.phone"
              label="Телефон"
              hint="Укажите телефон"
              required
              v-mask="'+7 (7##) ###-##-##'"
              clearable
              color="#2f2d72"
              type="text"
              class="custom-input"
              background-color="white"
              light
              solo
              :error="fails.phone != null"
              :error-messages="fails.phone"
            ></v-text-field>
            <v-text-field
              prepend-inner-icon="fas fa-address-card"
              outlined
              v-model="form.bin"
              :label="$auth.user.type_id == 1 ? 'БИН' : 'ИИН'"
              :hint="$auth.user.type_id == 1 ? 'Укажите БИН компании' : 'Ваш ИИН'"
              required
              v-mask="'############'"
              clearable
              color="#2f2d72"
              type="text"
              class="custom-input"
              background-color="white"
              light
              solo
              :error="fails.bin != null"
              :error-messages="fails.bin"
            ></v-text-field>
            <v-text-field
              prepend-inner-icon="fas fa-lock"
              label="Пароль"
              v-model="form.password"
              outlined
              light
              clearable
              color="#2f2d72"
              class="custom-input"
              :type="show ? 'text' : 'password'"
              background-color="white"
              solo
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              hint="Более 6 знаков"
              @click:append="show = !show"
              :error="fails.password != null"
              :error-messages="fails.password"
            >
            </v-text-field>
            <v-btn class="main-button w-100 text--white">
              Изменить
            </v-btn>

          </form>



        </v-card>
      </v-col>




    </v-row>


  </v-container>
</section>
</template>

<script>
export default {
  name: "setting",
  layout:"user_layout",
  middleware:["auth","user"],

  data(){
    return{
      registered:"",
      form:{
        email:"",
        password:"",
        phone:"",
        bin:"",
        type_id:""
      },
      fails:{}
    }
  },
  mounted() {
    let format = new Date(this.$auth.user.created_at)
    this.registered = format.toLocaleString();
    this.form.phone = this.$auth.user.phone;
    this.form.bin = this.$auth.user.bin;

  }

}
</script>

<style scoped>

</style>
