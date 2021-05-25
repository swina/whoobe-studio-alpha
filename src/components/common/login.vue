<template>
    <div class="flex flex-col p-4 theme-dark">
        <label>Email/Username</label>
        <input type="text" v-model="username"/>
        <label>Password</label>
        <input type="password" v-model="password"/>
        <button @click="login">Login</button>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data:()=>({
        username: '',
        password: ''
    }),
    methods:{
        login(){
            this.$api.authenticate({
                email       : this.username,
                password    : this.password,
                strategy    : 'local'
            }).then ( user => {
                this.$store.state.user = user
                this.$message('Welcome to Whoobe Studio')
                this.$emit ( 'islogged' , true )
            }).catch ( err => {
                this.$message ( 'Login error! Check you credentials')
                this.$emit ( 'islogged' , false )
            })
        }
    }
}
</script>