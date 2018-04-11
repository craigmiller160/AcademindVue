<template>
    <ul class="nav nav-pills">
        <router-link tag="li" to="/" active-class="active" exact>
            <a>Home</a>
        </router-link>
        <router-link tag="li" to="/user/1" active-class="active">
            <a>User 1</a>
        </router-link>
        <router-link tag="li" to="/user/2" active-class="active">
            <a>User 2</a>
        </router-link>
    </ul>
</template>

<script>
    export default {

    }
</script>

<style scoped>

</style>
