<template>
    <div class="cursor-pointer bg-gray-800 bg-center bg-cover bg-no-repeat h-screen w-screen flex flex-col items-center justify-center" title="Click to start" style="background-image:url(https://res.cloudinary.com/moodgiver/image/upload/v1616863115/desktop-1155613_1920_eimtxw.jpg);">
      <div class="m-auto text-center font-thin">
        <img src="../assets/logo.svg" class="w-64 grayscale m-auto"/>
        <div class="text-gray-700 text-sm -mt-4w-64 text-right font-hairline">S T U D I O</div>
        <button v-if="logged" @click="$router.push('desktop')" class="text-2xl p-4">Start</button>
      </div>
      <modal
        v-if="!logged"
        size="sm"
        buttons="none"
        position="modal">
        <div slot="title">Login</div>
        <div slot="content">
          <login @islogged="islogged"/>
        </div>
      </modal>
    </div>
</template>

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
  },
  methods:{
    islogged(status){
      this.logged = status
    }
  },
  mounted(){
    this.logged = this.$store.state.user ? true : false
  }
  
}
</script>