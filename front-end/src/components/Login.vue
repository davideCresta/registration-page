<template>
  <div class="container bg-light" style="height: 100vh">
    <div class="row justify-content-center">
      <div style="height: 15vh;" class="text-center mx-auto">
        <h1 class="my-4">Accedi alla pagina utenti</h1>
      </div>
      <div class="col-md-6">
        <div class="row mt-5">
          <div class="col-md-2">
            <label for="username" class="mt-1">Username</label>
          </div>
          <div class="col-md-8">
            <input type="text" class="form-control" id="username" v-model="username"
              placeholder="Inserisci il tuo username" />
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-md-2">
            <label for="password" class="mt-1">Password</label>
          </div>
          <div class="col-md-8">
            <input type="password" class="form-control" id="password" v-model="password"
              placeholder="Inserisci la tua password" />
          </div>
        </div>
        <div class="row mt-5 mb-0">
          <div class="d-flex justify-content-center align-items-center">
            <button class="btn btn-primary" @click="login">Accedi</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
import router from '@/router';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      axios
        .post("http://localhost:3000/api/authenticate", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          if (res.data.msg === "Authentication successful") {
            router.push('/show');
          } else {
            alert("Errore: accesso non riuscito");
          }
        })
        .catch(() => {
          alert("Errore: accesso non riuscito");
        });
    },
  },
};
</script>
  