<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex m-auto">
                    <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page" to="/">Registrati</router-link>
                    </li>
                    <li class="nav-item ms-4">
                        <router-link class="nav-link active" aria-current="page" to="/login">Accedi</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
  
<script>

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Header",
};
</script>