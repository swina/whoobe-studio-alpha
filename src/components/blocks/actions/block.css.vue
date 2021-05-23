<template>
    <div class="p-2">
        <div>CSS</div>
        <textarea v-if="editor.current" class="w-full h-40 text-gray-800" v-model="css"/>
        <div v-if="editor.current && isContainer">Container CSS</div>
        <textarea v-if="editor.current && isContainer" class="w-full h-24 text-gray-800" v-model="container"/>
        <div>Style</div>
        <textarea class="w-full h-24 text-gray-800" v-model="stile"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'WhoobeEditorCSS',
    data:()=>({
        css: '',
        cssContainer: '',
        container: '',
        stile : '',
        
    }),
    computed:{
        ...mapState ( ['editor']),
        isContainer(){
            this.editor.current.css.hasOwnProperty('container') ?
                this.css = this.editor.current.css.css : this.css = this.editor.current.css
            this.editor.current.css.hasOwnProperty('container') ?
                this.container = this.editor.current.css.container : null    
            return this.editor.current.css.hasOwnProperty('container')
        }

    },
    watch:{
        css(v){
            if ( !this.isContainer ) {
                this.editor.current.css = v ? v.replaceAll('\n',' ') : v
            } else {
                this.editor.current.css.css = v ? v.replaceAll('\n',' ') : v
            }
        },
        container(v){
            this.isContainer ?
                this.editor.current.css.container = v ? v.replaceAll('\n',' ') : v : null
        },
        stile(v){
            this.editor.current.style = v.replaceAll('\n',' ')
        }
    },
    mounted(){
        this.stile = this.$clean(this.editor.current.style.replaceAll(' ','\n'))
        
        // this.editor.current.css.hasOwnProperty('container') ?
        //     this.isContainer = true :
        //         this.isContainer = false
    }

}
</script>