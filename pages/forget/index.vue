<template>
<v-container>

  <section>

    <v-container>



      <v-row class="auth_row">
        <v-col md="6" xl="6" class="pa-5 text-center justify-center">
          <v-card class="white px-4" style="padding: 20px">
            <div class="d-flex justify-center">
              <v-img src="/logo.png" width="100%" max-width="280px" />
            </div>
            <h1 class="main-color py-2 mt-4">Сбросить пароль</h1>
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
              <v-btn class="main-button w-100" @click="login">
                Сбросить пароль
              </v-btn>

            </form>
            <div class="text-right">
              <NuxtLink class="text-decoration-none" to="/login">Вход в учетную запись</NuxtLink>
              <br>
              <NuxtLink class="text-decoration-none" to="/register">Нет, аккаунта? Зарегистрироваться</NuxtLink>

            </div>


          </v-card>




        </v-col>

      </v-row>


    </v-container>

  </section>


</v-container>
</template>

<script>
export default {
  name: "index",
  layout:"auth_layout",
  middleware:["guest"],

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
