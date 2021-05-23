<template>
    <div>
        <desktop-tabs @menu="sidebar=!sidebar"/>
        <desktop-sidebar v-if="sidebar"/>
        <desktop-container :boxed="sidebar"/>
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
    }    
}
</script>