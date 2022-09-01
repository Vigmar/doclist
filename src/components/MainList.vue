<template>
  <div @mousemove="onMouseMove" @mousedown="onMouseDown"  @mouseleave="onMouseOut" class="main-container">
  <div v-if="isMoving" :class="getOverId==-1?'margin-area margin-active':'margin-area'" @mouseenter="onMouseOver(-1)">Перетащите сюда для переноса вверх списка</div>
  <div>
    <ListItem v-for="(item,index) in storeList" :itemData="item" 
            :movingStarted="movingId"
            :key="index" 
            :id="index" 
            :parentId="-1"
            @clickData="clickMove"   />  
  </div>
  <div v-if="isMoving" :class="getOverId==-2?'margin-area margin-active':'margin-area'" 
    @mouseenter="onMouseOver(-2)">Перетащите сюда для переноса вниз списка</div>
    
  <MoveItem v-if="isMoving" :itemData="moveData" 
    :parentId="getOverId"
    ref="move_item" 
    :curX="currentX" 
    :curY="currentY" 
    :curWidth="elementWidth"
    />  
  </div>
</template>

<script>

import ListItem from './ListItem' 
import MoveItem from './MoveItem' 

const shiftX = 30; //отступ иконки перемещения от правого края, необходимо для корректного позиционирования перетаскиваемого объекта
//в режиме перемещения показываются 2 области сверху и снизу таблицы, чтобы было удобнее переносить документы в самый верх и в самый низ
//отдельно есть компонент для перемещаемого объекта, при выборе объекта для перемещения данные из него передаются в MoveItem

export default {
  name: 'MainList',
  components: {
    ListItem,
    MoveItem,
  },computed: {
     storeList: function () {
      return this.$store.getters.filteredList;
    },
    getOverId :function() {
        //узнаем над каким элементом сейчас перетаскиваемый объект, нужно для подствеки зеленых областей по краям
      return this.$store.state.overId;
    }
    
  }, 
  data() {
    return(
    {
		moveData: null,
        moveItem: null,
        isMoving: false,
        currentMove: -1,
        currentParent: -1,
        currentX:0,
        currentY:0,
        
    })
  },
  methods: {
    clickMove(e,item,p){
        
        let item_div = e.target.parentNode.parentNode.parentNode;
        //получаем элемент строки, чтобы определить его ширину, чтобы корректно позиционировать перемещаемый элемент
        this.elementWidth = item_div.getBoundingClientRect().width;
        
        if (!this.isMoving)
        {
            this.isMoving = true;
            this.movingId = item.id;
            this.parentId = p;
            this.moveData = {...item}; 
            this.currentX = e.pageX-this.elementWidth+shiftX;
            this.currentY = e.pageY;
        }
        
    },
    
    onMouseMove(e) {
        if (this.isMoving)
        {
            this.currentX = e.pageX-this.elementWidth+shiftX;
            this.currentY = e.pageY;
        }
    },
    onMouseOver(n) {
        
        this.$store.commit('enterMove', {id:n,parentId:-1}) 
    
    },
    onMouseDown() {

        if (this.isMoving)
        {
            this.$store.commit('editList', {srcId:this.movingId,srcParentId:this.parentId})
            this.disableMoveMode();
        }
    },
    
    onMouseOut() {
        this.$store.commit('enterMove', {ind:-3,parentInd:-1}) 
        this.disableMoveMode();
        
    },
    
    disableMoveMode() {
            this.isMoving = false;
            this.movingId = -1;
            this.parentId = -1;
            this.currentX = 0;
            this.currentY = 0;
            this.moveData = null;  
    },
    
  },
   mounted() {
        
  },
  setup() {
    
    
  },
  
}
</script>

<style>

.main-container {
    margin-top: 18px;
    
}

.margin-area {
   height: 60px; 
   width: 100%;
   display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(172, 255, 158); 
}

.margin-active {
    border: 1px solid #0F04FF;
}

</style>