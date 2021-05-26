import Vue from 'vue'
import store from '@/store'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'

const socket = io(  window.localStorage.getItem('whoobe-cms') , //'http://localhost:3030', //process.env.VUE_APP_APISERVER,
  {
    transports: ['websocket']
  }
)



const api = feathers()
  .configure(socketio(socket,{
    timeout:20000
  }))
  .configure(auth({ storage: window.localStorage }))


//const apiserver = api


export default {
  install: function (Vue) {

    Vue.prototype.$api = api
    // Vue.prototype.$apiwhoobe = whoobeApi

    Vue.prototype.$mapState = ( ) => {
      let mp = {
          desktop: store.state.desktop,
          datastore: store.state.datastore,
          editor: store.state.editor
      }
      return mp
    }

    Vue.prototype.$datastore = ( name = '' ) =>{
      if ( !name ) return
      return store.state.datastore.dataset[name].length === 1 ?
              store.state.datastore.dataset[name][0] :
              store.state.datastore.dataset[name]
    }

    Vue.prototype.$elements = () => {
        return new Promise ( (resolve) => {
            api.get ( 'elements' ).then ( res => {
                store.dispatch ( 'dataset' , { table: 'elements' , data: res.data })
                resolve ( res )
            } )
        })
    }

    Vue.prototype.$find = ( table , qry , start = 0 , limit = 20 , sort = { updatedAt: -1 } ) => {
        if ( !table ) return
        return new Promise ( (resolve) => {
            let args =  {
                    "$skip" : start,
                    "$limit" : limit,
                    "$sort" : sort
            }
            
            if ( qry ){
                Object.keys ( qry ).map ( q => {
                    args[q] = qry[q]
                })
            }
            //{ query : { "$limit": limit , "$skip": start }  }
            api.service ( table ).find( { query : args } ).then ( res => {
                store.dispatch ( 'dataset' , { table: table , data: res.data })
                resolve ( res )
            } )
        })
    }

    Vue.prototype.$components = () => {
      api.service('components').find ( 
        { 
          query : 
          {
            $limit : 200,
            $skip: 0,
            $select : ['_id', 'name' , 'category' , 'image' , 'image_uri' , 'blocks_id' , 'updatedAt' ] ,
            $sort : { updatedAt : -1 }
          }
        }
      ).then ( result => {
        store.dispatch ( 'dataset' , { table: 'components' , data: result.data })
      })
    }

    Vue.prototype.$saveComponent = ( component )=> {
      if ( !component ) return null
      return new Promise ( (resolve) => {
        api.service('components').patch ( component._id , component ).then ( res => {
          resolve ( res )
        }).then ( () => {
          api.service('articles').find ( {
            query : {
              template_id : component._id
            }
          }).then ( articles => {
            
            articles.data.forEach ( article => {
              api.service('articles').patch ( article._id , {
                blocks: component
              }).then ( resp => {
                console.log ( 'Updated ' + resp.title )
              })
            })
          })
        }).catch ( error => {
          resolve ( error )
        })
      })
    }

    

  },
  //apiserver
}
