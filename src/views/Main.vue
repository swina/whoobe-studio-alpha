<template>
    <div class="cursor-pointer bg-gray-800 bg-center bg-cover bg-no-repeat h-screen w-screen flex flex-col items-center justify-center" title="Click to start" style="background-image:url(https://res.cloudinary.com/moodgiver/image/upload/v1616863115/desktop-1155613_1920_eimtxw.jpg);">
      <div class="m-auto text-center font-thin  m-auto">
        <img src="../assets/logo.svg" class="w-64 grayscale"/>
        <div class="text-gray-700 text-sm -mt-4w-64 text-right font-hairline">S T U D I O</div>
        <button v-if="!login" @click="$router.push('desktop')" class="text-2xl p-4">Start</button>
        <!-- <div class="tex-left">
          <login v-if="!logged" @islogged="check" class="m-auto w-64"/>
        </div> -->
      </div>
      <div v-if="login" class="z-1 fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50"></div>
      <transition name="fade">
            <div class="modal z-2 bg-white w-full md:w-1/4 text-lg flex flex-col rounded" v-if="login">
                  <div class="w-full p-1 bg-black text-white rounded-tl rounded-tr">Login</div>
              <div class="p-4 flex flex-col">
                  <label>Email</label>
                  <input type="email" v-model="userLogin.email"/>
                  <label>Password</label>
                  <input type="password" v-model="userLogin.password"/>
                  <button class="my-4 mx-auto text-xl rounded" @click="doLogin()">Login</button>
              </div> 
            </div>
      </transition>
    </div>
</template>


<script>
// @ is an alias to /src
import { mapState } from 'vuex'
export default {
  name: 'Main',
  data:()=>({
    userLogin: {
      email: '',
      password: '',
    },
    login: false,
  }),
  computed:{
    ...mapState ( [ 'user'] ),
  },
 
  mounted(){
    let vm = this
    this.$api.authenticate().then ( resp => {
      vm.login = false
      return resp
    }).then ( user => {
      //this.$store.dispatch('login',true)
      ///this.user = user
      this.datastore()
      //this.loadData()
    }).catch ( err => {
      this.$message ( 'Authentication required!' )
      this.login = true
      console.log ( err )
    })
  },
  methods:{
    datastore(){
      this.$loading(true)
      this.$find('plugins') 
      this.$find('settings')
      this.$find('setup')
      this.$find('elements')
      this.$find('workspace')
      this.$api.service('articles').find ( 
        { 
          query : 
          {
            $select : ['_id', 'title' , 'slug' , 'template_id' , 'homepage' , 'active' ] 
          }
        }
      ).then ( result => {
        this.$loading()
        this.$store.dispatch ( 'dataset' , { table: 'articles' , data: result.data })
      })
    },
    doLogin(){
        this.$api.authenticate({
            email: this.userLogin.email,
            password: this.userLogin.password,
            strategy: 'local'
        }).then ( resp => {
            this.$message ( 'Welcome to Whoobe !')
            this.login = false  
            return resp
        }).then ( user => {
            //this.$store.dispatch('login',true)
            //this.user = user
            this.datastore()
            //this.loadData()
        }).catch ( err => {
            console.log ( err )
            this.$message ( 'Login error! Check your credentials')
        })
      }
  },
  
}
</script>
<!--
<script>
import { mapState } from 'vuex'
export default {
  name: 'Main',
  data:()=>({
    logged: false
  }),
  components: {
    'login' : () => import ( '@/components/common/login.vue')
  },
  computed:{
    ...mapState ( ['user'] ),
    islogged(){
      this.logged = this.user ? true : false
      return this.$store.state.user
    }
  },
  methods:{
    check(status){
      this.logged = status
    }
  },
  mounted(){
    console.log ( this.$mapState().datastore.dataset.elements[0].moka )
    this.logged = this.$store.state.user ? true : false
  }
  
}
</script>
-->