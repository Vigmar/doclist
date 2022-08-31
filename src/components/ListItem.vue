<template :id="id">
  <div @mouseenter="onMouseOver" :class="parentId<0?item-container:''" :style="itemData.id==movingStarted?'opacity:0.5':''">
  <div :class="parentId<0?'list-item':'child-item'" :style="isOver?'border: 1px solid #0F04FF;':''">
  <div class="item-content" >
    <div v-if="parentId<0 && itemData.items" class="arrow-container" @click="openSect">
    <i :class="itemData.isOpen?'arrow up':'arrow down'"></i>
    </div>
  
   <span class="section-title">{{itemData?itemData.name:''}}</span>  
   
   <CircleBlock :circleData="itemData.circles"/>
   <span v-if="itemData.isNecessary" class="neccessary-text">Обязательный</span>
   <span class="item-description">{{itemData?itemData.description:''}}</span>  
  </div>
  
  <ControlBlock @clickMove="onClick" />
  </div>
  
  <div   :class="itemData.isOpen?'child-list childopen':'child-list childclose'">
  <ListItem v-for="(item,index) in itemData.items" :itemData="item" 
  :id="index"
  :movingStarted="movingStarted"
  :key="index" :parentId="itemData.id" @clickParent="clickParent"/>  
  </div>
  </div>
</template>

<script>

import CircleBlock from './CircleBlock'
import ControlBlock from './ControlBlock'

//отдельно вынес в компоненты блок управления
//и блок отображения цветных кружков

export default {
  name: 'ListItem',
  components: {
    ControlBlock,
    CircleBlock,
  },
  props: { itemData:Object, id:Number, parentId: Number, movingStarted: Boolean  },
  computed: {
     isMoving: function () {
      return this.movingStarted == this.itemData.id;
    },
    isOver: function () {
      return this.$store.state.overId == this.itemData.id && this.movingStarted>0;
    },
    
    }, 
  methods: {
    onClick(e){
    
        e.stopPropagation();
    
        if (this.parentId <0 )
            this.$emit('clickData', e,this.itemData,this.parentId)        
        else
            this.$emit('clickParent', e,this.itemData,this.parentId)        
    
    },
    openSect(e)
    {
        e.stopPropagation();
        this.$store.commit('setOpenSection', this.itemData.id) 
    },
    clickParent(e,item,pId)
    {
        this.$emit('clickData', e,item,pId)        
    },
    onMouseOver()
    {
        this.$store.commit('enterMove', {id:this.itemData.id,parentId:this.parentId}) 
    },
  }
}
</script>

<style>


.child-list {
  margin-left: 16px;  
   overflow: hidden;  
}

.child-item {
    display: flex;
  height: 35px;
  width: 100%;
  background: #FFFFF0;
  border: 1px solid #DFE4EF;
  flex-direction: row;
  justify-content: space-between;
  items-align: center;
}

.list-item {
  display: flex;
  height: 48px;
  width: 100%;
  background: #FFFFF0;
  border: 1px solid #DFE4EF;
  flex-direction: row;
  justify-content: space-between;
  items-align: center;
}

.item-content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;  
}

.item-container {
  max-width: 1600px;
  min-width: 600px;
  margin-left: 30px;
  margin-right: 30px;
  
}

.control-block {
    margin-left: 40px;
}

.section-title {
    margin-left: 17px;
    font-weight: 500;
    font-size: 15px;
    color: #000000;
}

.item-title {
    
    font-size: 13px;
}

.item-description {
    
    margin-left: 15px;
    font-size: 11px;
    color: #8E9CBB;
}

.arrow-container {
    
    margin-left: 10px;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    border: 2px solid #D3D8DF;
}

.arrow {
  
   border: solid #0066FF;
   border-width: 0 2px 2px 0;
   display: inline-block;
   padding: 4px;
   margin-left: 6px;
}

.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
  transition: all 0.3s;
  

}

.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  transition: all 0.3s;

}

.childopen {
  max-height: 1000px;
    transition: max-height 0.3s ease-in-out;
}

.childclose {
    
    max-height: 0px;
    transition: max-height 0.3s cubic-bezier(0, 1, 0, 1);
}

.neccessary-text {
    margin-left: 20px;
    color: #FF238D;
    font-size: 11px;
}

</style>