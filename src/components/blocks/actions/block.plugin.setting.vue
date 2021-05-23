<template>
    <div class="flex flex-col theme-dark p-4">
        <template v-for="field in Object.keys($mapState().editor.current.plugin.component.settings)">
            <label class="capitalize">{{ field }}</label>
            <input type="text" v-model="$mapState().editor.current.plugin.editor.settings[field]"/>
        </template>
        <!-- <pre class="text-black">{{ $mapState().editor.current.plugin.editor }}</pre> -->
    </div>
</template>

<script>
export default {
    name: 'BlockPluginSetting',
    
}
</script>