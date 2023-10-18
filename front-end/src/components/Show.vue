<template>
    <div class="container bg-light" style="height: 95vh">
        <div class="row justify-content-center mx-4">
            <div style="height: 15vh;" class="text-center mx-auto">
                <h1 class="my-4">Utenti registrati</h1>
            </div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Cognome</th>
                        <th>Email</th>
                        <th>Telefono</th>
                        <th>Corso</th>
                    </tr>
                </thead>
                <tbody style="color: #D1CDC8 ;">
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.name }}</td>
                        <td>{{ user.surname }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.contactno }}</td>
                        <td>{{ user.course }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Show",
    data() {
        return {
            users: {}
        }
    },
    mounted() {
        this.loadUsersTable();
    },
    methods: {
        loadUsersTable: function () {
            axios.get("http://localhost:3000/api/users").then((res) => {
                this.users = res.data.data;
                console.log(this.users);
            })
                .catch(() => {
                    console.log("Qualcosa è andato storto");
                })
        }
    }
};
</script>