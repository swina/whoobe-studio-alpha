<template>
  <div id="app">
    
    <router-view/>
    <!-- Global message display -->
    <transition name="fade">
        <div style="transform: translateX(-50%);left:50%;" class="border-l-4 border-blue-500 fixed bottom-0 m-auto shadow-xl mb-12 bg-gray-800 text-gray-200 text-base p-4 w-1/2  z-highest" v-if="message">   
        {{ message }}
        </div>
    </transition>
    <!-- loading fullscreen -->
    <loading v-if="$mapState().desktop.loading"/>
    <!-- loading icon bottom left -->
    <icon name="bubble_chart" class="animate-spin fixed bottom-0 left-0 m-2 z-highest text-gray-100" v-if="$mapState().desktop.loading"/>

    <!-- actions component: opens modal with relative action -->
    <actions/>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default {
  name: 'App',
  components: {
    'actions'   : () => import ( '@/components/common/actions' )
  },
  data:()=>({
    message: '',
    firstRun: false
  }),
  watch: {
    //when a new message diplay 
    '$store.state.desktop.message':function(msg){
      this.setMessage ( msg )
    },
    
    message(v){
        //display message, if null or empty close 
        if ( v ){
            window.setTimeout(()=>{ 
              this.message = ''
              this.$store.dispatch('message','') 
            }, 4000)
        }
    },
  },
  methods: {
    setMessage(msg){
      this.message = msg
    },
  },
  beforeMount(){
    //populate datastore
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
      this.$store.dispatch ( 'dataset' , { table: 'articles' , data: result.data })
    })
    this.$api.service ( 'workspace' ).find().then ( res => {
      this.$store.dispatch ( 'workspace' , res )
    })
    if ( !window.localStorage.getItem('whoobe-workspace') ){
      this.$api.service('workspace').find( { query: { project: 'default'} }).then ( result => {  
        window.localStorage.setItem('whoobe-workspace',JSON.stringify(result))
      })
    }    /*
    this.$find('media')
    this.$api.service('elements').find().then ( result => {
      this.$store.dispatch ( 'dataset' , { table: 'elements' , data: result.data })
    })

    this.$api.service('articles').find ( 
      { 
        query : 
        {
          $select : ['_id', 'title' , 'slug' , 'template_id' , 'homepage' , 'active' ] 
        }
      }
    ).then ( result => {
      this.$store.dispatch ( 'dataset' , { table: 'articles' , data: result.data })
    })
    this.$components()
    */
    // this.$api.service('components').find ( 
    //   { 
    //     query : 
    //     {
    //       $limit : 100,
    //       $skip: 0,
    //       $select : ['_id', 'name' , 'category' , 'image' , 'image_uri' , 'blocks_id' ] ,

    //     }
    //   }
    // ).then ( result => {
    //   this.$store.dispatch ( 'dataset' , { table: 'components' , data: result.data })
    // })

  },
}
</script>

<style>
body {
  background: rgb(214, 214, 214);
}

::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }
  ::-webkit-scrollbar-thumb {
    background: #739eb0;
    border: 0px none #ffffff;
    border-radius: 50px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #ffffff;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #000000;
  }
  ::-webkit-scrollbar-track {
    background: #ededed;
    border: 0px none #ffffff;
    border-radius: 40px;
  }
  ::-webkit-scrollbar-track:hover {
    background: #ebebeb;
  }
  ::-webkit-scrollbar-track:active {
    background: #333333;
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
</style>