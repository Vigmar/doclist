<template>
  <div v-if="circleData" class="circle-line">
  <div v-for="(item,index) in circleData" :key="index" class="circle-item" :style="'background:'+item" />
  </div>
</template>

<script>

export default {
  name: 'CircleBlock',
  props: { circleData: Array},
 
}
</script>

<style>

.circle-line {
    
  margin-left: 10px;
  display: flex;
  flex-direaction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  
}

.circle-item {
    background: #8E9CBB;
    border-radius: 50%;
    width: 8px;
    height: 8px;
    margin-left: 6px;
}


</style>