<template>
    <div>
        <desktop-tabs @menu="sidebar=!sidebar"/>
        <desktop-sidebar v-if="sidebar"/>
        <desktop-container :boxed="sidebar"/>
        <icon name="lock" class="fixed z-highest bottom-0 left-0 m-2 text-indigo-500" @click="logout()"/>
    </div>
</template>

<script>
export default {
    name: 'Desktop',
    data:()=>({
        sidebar: true
    }),
    components: {
        'desktop-sidebar'   : () => import ( './desktop.sidebar.vue'),
        'desktop-tabs'      : () => import ( './desktop.tabs.vue'),
        'desktop-container' : () => import ( './desktop.container.vue')
    },
    methods:{
        logout(){
            window.localStorage.setItem ( 'feathers-jwt' , null )
            this.$store.state.user = null
            this.$router.push('/')
        }
    }  
}
</script>