<template>
    <div class="p-2">
        Select an item
        <select v-model="selected" class="text-black">
            <option v-for="item in data" :value="item._id">{{ item.name }}</option>
        </select>
        
    </div>
</template>
<script>
import jp from 'jsonpath'
export default {
    name: 'BlockDataLink',
    data:()=>({
        data: null,
        itemLink : null,
        selected: null,
        schema: null
    }),
    watch:{
        selected ( id ){
            if ( id ){
                this.$api.service ( this.$mapState().editor.current.data.dataset ).get ( id ).then ( res => {
                    this.itemLink = res
                    this.$mapState().editor.current.data.link = res
                    let children = jp.query ( this.$mapState().editor.current  , '$..blocks..data' )
                    console.log ( children )
                    children.forEach ( child => {
                        if ( this.schema[child.field].type === 'image' ){
                            child.image = res[child.field]
                        } else {
                            child.content = res[child.field]
                        }

                    })
                    this.$action()
                    // this.$mapState().editor.current.blocks.forEach ( element => {
                    //     if ( element.type === 'element' ){
                    //         element.content = res[element.data.field]
                    //     }
                    //     if ( element.type === 'image' ){
                    //         element.image  = res[element.data.field]
                    //     }
                    //     console.log ( element )

                    // })
                })
            }
        }
    },
    mounted(){
        this.schema = this.$mapState().datastore.schema [ this.$mapState().editor.current.data.dataset ]
        
        this.$api.service ( this.$mapState().editor.current.data.dataset ).find().then ( res => {
            this.data = res.data
        })
    }
}
</script>