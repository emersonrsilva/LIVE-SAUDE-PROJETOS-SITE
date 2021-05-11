import React from 'react'

import { Column, ColumnEdit } from '../Components/TemplateCreation/Widgets/Column'
import { Image, ImageEdit } from '../Components/TemplateCreation/Widgets/Image'
import nextId from 'react-id-generator'

class WidgetStore {

    constructor () {

        this.state = []

        this.setState()

    }
  
    setState() {

        var defaultVar = [
            {
                className: 'column',
                name: "1 coluna",
                ico: 'column-1',
                cat: 'secao',
                component: Column,
                componentEdit: ColumnEdit,
                options: {
                    width: 'auto',
                    widthType: '%',
                    minHeight: '85',
                    heightType: 'px'
                },
                content: [
                    []
                ]
            },
            { 
                className: 'column',
                name: "2 colunas",
                ico: 'column-2',
                cat: 'secao',
                component: Column,
                componentEdit: ColumnEdit,
                options: {
                    width: 'auto',
                    widthType: '%',
                    minHeight: '85',
                    heightType: 'px'
                },
                content: [
                    [],[]
                ]
            },
            { 
                className: 'column',
                name: "3 colunas",
                ico: 'column-3',
                cat: 'secao',
                component: Column,
                componentEdit: ColumnEdit,
                options: {
                    width: 'auto',
                    widthType: '%',
                    minHeight: '85',
                    heightType: 'px'
                },
                content: [
                    [],[],[]
                ]
            },
        
            { 
                name: "Imagem",
                ico: 'image',
                cat: 'conteudo',
                component: Image,
                componentEdit: ImageEdit,
                options: {

                    maxWidth: '100',
                    maxWidthType: '%',

                    minWidth: 'auto',
                    minWidthType: '',

                    width: 'auto',
                    widthType: '',

                    maxHeight: 'auto',
                    maxHeightType: '',

                    minHeight: 'auto',
                    minHeightType: '',
                    
                    height: 'auto',
                    heightType: '',

                    src: 'https://i.ibb.co/YWMjDMd/image.png',
                }
            },
            { 
                name: "Texto",
                ico: 'text',
                cat: 'conteudo',
                component: Image,
                options: {}
            },
            { 
                name: "Botão",
                ico: 'button',
                cat: 'conteudo',
                component: Image,
                options: {}
            },
            { 
                name: "Formulário",
                ico: 'form',
                cat: 'conteudo',
                component: Image,
                options: {}
            },
            { 
                name: "Contador",
                ico: 'timing',
                cat: 'conteudo',
                component: Image,
                options: {}
            },
            { 
                name: "Slider",
                ico: 'slide',
                component: Image,
                options: {}
            },
            { 
                name: "Oferta",
                ico: 'offer',
                cat: 'conteudo',
                component: Image,
                options: {}
            },
            { 
                name: "Vídeo",
                ico: 'video',
                cat: 'conteudo',
                component: Image,
                options: {}
            },
            { 
                name: "Mapa",
                ico: 'map',
                cat: 'conteudo',
                component: Image,
                options: {}
            },
        ] 

        var stateNew = []

        defaultVar.map((row, key) => {

            var item = {}
                item.id = nextId()
                item.template = row

            if ( row.content ){
                row.content.map((content, contentKey) =>
                    item.template.content[contentKey] = []
                )
            }
            

            stateNew.push(item)

        })

        this.state = stateNew

    }
  
    getState () {

        return this.state

    }

  }
  
const widgetStore = new WidgetStore({})

export default widgetStore