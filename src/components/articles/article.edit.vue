<template>
    <div v-if="currentArticle" class="bg-white">
        <div class="bg-gray-800">
            <button @click="saveArticle">Save</button> 
            <button @click="$emit('close')">Import WP</button>
            <button @click="$emit('close')">Export</button> 
            <button @click="preview()">Preview</button> 
            <button @click="$emit('close')">Create New</button>
            <icon name="close" class="absolute right-0 mr-2 text-3xl text-gray-300" @click="$emit('close')"/>
        </div>
        <!-- /** 
        * !Edit article 
        */
        -->
        <transition name="fade">
                     
            <div v-if="currentArticle" class="flex flex-row  p-1">
                <section class="w-4/5 container relative text-sm" v-if="currentArticle">
                    
                    <label>Title <span class="text-gray-400">#{{ currentArticle.id }}</span></label>
                    <input type="text" class="w-full text-2xl" v-model="currentArticle.title"/>
                    <label>Slug </label>
                    <input type="text" class="w-full text-2xl" v-model="currentArticle.slug" @blur="slugify()"/>
                    <label>Excerpt</label>
                    <textarea class="text-sm w-full" v-model="currentArticle.excerpt"></textarea>
                    <label>Content</label>
                    <block-text-editor v-model="currentArticle.content" size="h-4/5" :embeded="true"/>
                    
                </section>
            
            
                <div class="w-1/5 ml-4 shadow text-sm bg-gray-200" v-if="currentArticle">
                    <!--<button class="warning mr-2" @click="editor=!editor">Close</button>
                    <button class="success mr-2" @click="save">Save</button>    
                    <button @click="wordpress=!wordpress">WP page</button>
                    <button @click="exportPage=!exportPage">Export</button>-->
                    <input type="checkbox" v-model="currentArticle.publish"/> Publish
                    <div class="flex flex-col" v-if="currentArticle.blocks">
                        <div class="bg-gray-500 text-white p-1">Template</div>
                        <div class="mb-2 flex flex-col items-center bg-white border">
                            <span class="text-xs" v-if="currentArticle.blocks">
                                    {{ currentArticle.blocks.name }}
                            </span>
                                

                            <img v-if="currentArticle.template_preview" :src="this.$imageURL(currentArticle.template_preview)" class="w-48 h-32 object-cover object-top cursor-pointer" @click="$action('whoobe_templates')"/>
                            <img v-else src="../../assets/no-image.png" class="h-24 object-contain"/>
                            <button class="sm mb-2" @click="selectTemplate=!selectTemplate">Page / Template</button> 
                            <!--<img class="h-24 object-cover object-top cursor-pointer" :src="$imageURL(currentArticle.blocks.image_uri)"
                            v-if="currentArticle.blocks.image_uri" @click="selectTemplate=!selectTemplate"/>-->
                        </div>
                        <div class="mb-2 flex flex-col">
                            <div class="bg-gray-500 text-white mt-2 p-1">Category</div>
                            <select class="w-full" v-model="currentArticle.categories">
                                <option v-for="(category,c) in datastore.dataset.setup[0].categories.articles" :value="category"> {{ category }} </option>
                            </select>
                        </div>
                    </div>
                        <div>
                            <div class="bg-gray-500 text-white mt-2 p-1">Homepage</div>
                            <input type="checkbox" v-model="currentArticle.homepage"/> 
                            Homepage
                        </div>
                        <div class="bg-gray-500 text-white mt-2 p-1">Featured image</div>
                        <div class="flex flex-col mb-2 h-32 items-center">
                            <div class="bg-gray-700 h-32 w-full flex p-1 justify-center" v-if="currentArticle.image">
                                <img v-if="currentArticle.image" :src="$imageURL(currentArticle.image)" class="h-24 object-cover" :title="currentArticle.image.name" @click="$action('media')"/>
                            </div> 
                            <button @click="$action('media')" class="mt-1">Select Media</button>
                            <!-- <moka-image-placeholder :image="currentArticle.image" @click="$action('media')" size="sm" @media="$action(),editorImage=false" @noimage="currentArticle.image=null"/> -->
                        
                        </div>
                        
                        

                        <div class="bg-gray-500 text-white mt-2 p-1">SEO</div>
                        <div class="flex flex-col bg-gray-100 p-1 border">
                            <label>Title</label>
                            <input type="text" v-model="currentArticle.seo_title"/>
                            <label>Description</label>
                            <textarea class="text-sm w-full" v-model="currentArticle.seo_description"/>
                        </div>
                        <div class="bg-gray-500 text-white mt-2 p-1">Tags</div>
                        <textarea v-model="currentArticle.tags" class="h-16 w-full text-xs"></textarea>
                        <div class="text-xs text-gray-600">Set a tag per line</div>
                    
                </div>
                
            </div>
        </transition>

        <transition name="fade">
            <modal 
                v-if="selectTemplate" 
                size="lg" 
                position="modal"
                buttons="none"
                @close="selectTemplate=!selectTemplate">
                <div slot="title">Select template/block</div>
                <div slot="content">
                <block-templates 
                    :article="currentArticle"
                    @set="setTemplate" 
                    @close="selectTemplate=!selectTemplate"/>
                </div>
            
            </modal>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'ArticleEdit',
    components: {
        'block-text-editor' : () => import ( '@/components/blocks/editor/components/block.text.editor.vue' ),
        'block-templates'   : () => import ( './articles.templates.vue')

    },
    data:()=>({
        currentArticle: null,
        selectTemplate: false
    }),
    computed:{
        datastore(){
            return this.$mapState().datastore
        }
    },
    methods: {
        saveArticle(){
            this.$api.service ( 'articles' ).patch ( this.currentArticle._id , this.currentArticle ).then ( res => {
                this.$message ( 'Article updated!' )
            })
        },
        preview(){
            window.localStorage.setItem ( 'whoobe-preview' , JSON.stringify ( this.currentArticle.blocks.json ) )
            let route = this.$router.resolve({path: '/preview'});
            let w = window.open(route.href, 'whoobe','width=' + window.screen.availWidth );
            w.focus()
        },
        setTemplate(template){
            console.log ( template )
        }
    },
    mounted(){
        //this.$mapState().datastore.currentArticle = this.$attrs.article
        this.currentArticle = this.$attrs.article
    }
}
</script>
