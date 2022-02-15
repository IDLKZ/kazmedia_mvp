<template>
<section>

<v-container>



  <v-row class="auth_row">

    <v-col md="6" xl="6" class="pa-5 text-center justify-center">
      <v-card class="white px-4" style="padding: 20px">
        <img src="/logo.png" width="300px"/>

        <h1 class="main-color py-2 mt-4">Вход на портал</h1>
        <form class="my-4">
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
            :error="this.fails.email != null"
            :error-messages="this.fails.email"
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
          :error="this.fails.password != null"
          :error-messages="this.fails.password"
          >
          </v-text-field>
          <v-btn class="main-button w-100" @click="login">
            Вход
          </v-btn>

        </form>
        <div class="text-right">
          <NuxtLink class="text-decoration-none" to="/register">Нет, аккаунта? Зарегистрироваться</NuxtLink>
          <br>
          <a>Забыли пароль</a>
        </div>


      </v-card>




    </v-col>

  </v-row>


</v-container>

</section>
</template>

<script>

export default {
  name: "login",
  layout:"auth_layout",

  data(){
    return{
      form:{
        email:"",
        password:"",
      },
      show:false,
      fails:{}
    }
  },
  methods:{
    async login(){
      try{
        this.$toast.show('Вход...',)
        await this.$auth.loginWith("local", {data: this.form})
        this.$toast.success("Добро пожаловать!");
      }
      catch ({response}) {
        if(response.status == 400){
          this.$toast.error("Неверно заполнены поля");
          if(response.data){
            this.fails = response.data.data;
          }
        }
        else{
          this.$toast.error("Упс, что-то пошло не так")
        }
      }
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
