<template>
  <div class="move-item list-item" @click="onClick" :style="'top: '+curY + 'px;left: '+curX + 'px;width: '+curWidth+'px;'">
  <div class="item-content" >
  <div v-if="parentId<0" class="arrow-container">
    <i class="arrow down"></i>
    </div>
    
    <span class="section-title">{{itemData?itemData.name:''}}</span>  
   <CircleBlock :circleData="itemData?itemData.circles:[]"/>
   <span v-if="itemData.isNecessary" class="neccessary-text">Обязательный</span>
   <span class="item-description">{{itemData?itemData.description:''}}</span>  
  
  </div>
  
  <ControlBlock @click="onClick" />
  </div>
  
</template>

<script>

//создал отдельный компонент для перемещаемого объекта чтобы при изменении вида этого объекта можно было легко добавить/убрать компоненты

import ControlBlock from './ControlBlock'
import CircleBlock from './CircleBlock'

export default {
  name: 'MoveItem',
  components: {
    ControlBlock,
    CircleBlock,
  },
  props: { itemData:Object, id:Number, curX:Number,curY:Number, curWidth: Number,parentId: Number  },
  methods: {
    onClick(){
    
        console.log(this.id);
        this.$emit('clickData', this.id)
    }
  },
  setup(props) {
    console.log(props.itemData);
    
  }
}
</script>

<style>

.move-item {
  position:absolute;
  left:0;
  top:0;
  
}


</style>