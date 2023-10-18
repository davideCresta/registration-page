<template>
    <div class="container bg-light" style="height: 100vh">
        <div class="row justify-content-center">
            <div style="height: 15vh;" class="text-center mx-auto">
                <h1 class="my-4">Registrati qui per iniziare</h1>
            </div>
            <div class="col-md-6">
                <div class="row mt-5">
                    <div class="col-md-2">
                        <label for="" class="mt-1">Nome</label>
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" v-model="name" placeholder="Inserisci il tuo nome" />
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" v-model="surname" placeholder="Inserisci il tuo cognome" />
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-md-2">
                        <label for="" class="mt-1">Email</label>
                    </div>
                    <div class="col-md-8">
                        <input type="text" class="form-control" placeholder="Inserisci il tuo indirizzo email"
                            v-model="email" />
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-md-2">
                        <label for="" class="mt-1">Telefono</label>
                    </div>
                    <div class="col-md-8">
                        <input type="text" class="form-control" placeholder="Inserisci il tuo numero di telefono"
                            v-model="contactno" />
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-md-2">
                        <label for="" class="mt-1">Corso</label>
                    </div>
                    <div class="col-md-8">
                        <select name="" id="" class="form-control" v-model="course">
                            <option value="" disabled hidden> - Seleziona un corso - </option>
                            <option value="React">React</option>
                            <option value="Vue">Vue</option>
                            <option value="NodeJS">NodeJS</option>
                            <option value="MongoDB">MongoDB</option>
                        </select>
                    </div>
                </div>
                <div class="row mt-5 mb-0">
                    <div class="d-flex justify-content-center align-items-center">
                        <button class="btn btn-primary" @click="registerUsers">Registrati</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Home",
    data() {
        return {
            name: "",
            surname: "",
            email: "",
            contactno: "",
            course: ""
        }
    },
    methods: {
        registerUsers: function () {

            axios.post("http://localhost:3000/api/user", {
                name: this.name,
                surname: this.surname,
                email: this.email,
                contactno: this.contactno,
                course: this.course
            }).then((res) => {
                if (res.data.msg === "Validation Failed") {
                    let errors = res.data.errors;
                    let errorMsg = "";
                    if (errors.name.length != 0) {
                        for (let i = 0; i < errors.name.length; i++) {
                            errorMsg += `${errors.name[i]}\n`;
                        }
                    }

                    if (errors.surname.length != 0) {
                        for (let i = 0; i < errors.surname.length; i++) {
                            errorMsg += `${errors.surname[i]}\n`;
                        }
                    }

                    if (errors.email.length != 0) {
                        for (let i = 0; i < errors.email.length; i++) {
                            errorMsg += `${errors.email[i]}\n`;
                        }
                    }

                    if (errors.contactno.length != 0) {
                        for (let i = 0; i < errors.contactno.length; i++) {
                            errorMsg += `${errors.contactno[i]}\n`;
                        }
                    }

                    if (errors.course.length != 0) {
                        for (let i = 0; i < errors.course.length; i++) {
                            errorMsg += `${errors.course[i]}\n`;
                        }
                    }

                    alert(errorMsg);
                }
                else {
                    alert("Utente salvato con successo!");
                }

            }).catch(() => {
                alert("Errore: utente non salvato");
            })
        }
    }
};
</script>

