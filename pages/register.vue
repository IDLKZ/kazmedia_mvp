<template>

  <v-container>



    <v-row class="auth_row">

      <v-col md="6" xl="6" class="pa-5 text-center justify-center">
        <v-card class="white px-4 py-4">
          <div class="d-flex justify-center">
            <v-img src="/logo.png" width="100%" max-width="280px" />
          </div>

          <h1 class="main-color py-2 mt-4">Регистрация</h1>
          <form class="my-4" @submit.prevent="()=>{}">
            <v-radio-group v-model="form.type_id" light
                           :error="fails.type_id != null"
                           :error-messages="fails.type_id"
            >
              <template v-slot:label>
                <div>Вы являетесь:</div>
              </template>
              <v-radio value="1">
                <template v-slot:label>
                  <div>Юридическим лицом</div>
                </template>
              </v-radio>
              <v-radio value="2">
                <template v-slot:label>
                  <div>Физическим лицом</div>
                </template>
              </v-radio>
            </v-radio-group>
            <v-text-field
              :prepend-inner-icon="form.type_id == 1 ?'fas fa-building':'fas fa-user'"
              outlined
              v-model="form.name"
              :label="form.type_id == 1 ? 'Наименование компании' : 'Ваше ФИО'"
              :hint="form.type_id == 1 ? 'Укажите Наименование компании' : 'Укажите Ваше ФИО'"
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
              v-model="form.email"
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
              :label="form.type_id == 1 ? 'БИН' : 'ИИН'"
              :hint="form.type_id == 1 ? 'Укажите БИН компании' : 'Ваш ИИН'"
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
            <v-btn class="main-button w-100" @click="register">
              Регистрация
            </v-btn>

          </form>
          <div class="text-right">
            <NuxtLink class="text-decoration-none" to="/login">Уже есть аккаунт? Выполните вход</NuxtLink>
            <br>
            <NuxtLink class="text-decoration-none" to="/forget">Забыли пароль?</NuxtLink>
          </div>


        </v-card>




      </v-col>

    </v-row>


  </v-container>

</template>

<script>
import VueMask from 'v-mask';
export default {

  name: "register",
  layout:"auth_layout",

  data(){
    return{
      form:{
        email:"",
        password:"",
        phone:"",
        bin:"",
        type_id:""
      },
      show:false,
      fails:{}
    }
  },
  methods:{
    async register(){
      try{
        await this.$axios.post("auth/register",this.form);
        this.$toast.success("Успешно зарегистрировались!");
        this.clearMessage();
      }
      catch ({response}) {
        if(response.status == 400){
          this.$toast.error("Неверно заполнены поля");
          if(response.data != null){
            this.fails = response.data.data;
          }
        }
        else{
          this.$toast.error("Упс, что-то пошло не так")
        }
      }
    },
    clearMessage(){
      this.form.name = "";
      this.form.email = "";
      this.form.phone = "";
      this.form.bin = "";
      this.form.type_id = "";
      this.form.password = "";
    }
  }


}
</script>

<style scoped lang="scss">
.auth_row{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-text-field__slot{
  input{
    color: #2f2d72!important;
  }
}
</style>
