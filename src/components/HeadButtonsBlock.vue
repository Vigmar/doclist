<template>
  <div class="head-buttons-line">
  <div class="head-bm"><img src='../assets/bookmark.png' /></div>
  <div class="head-button"><img class="head-plus" src='../assets/plus.png' /><span>Новый тип</span></div>
  <div class="head-button"><img class="head-plus" src='../assets/plus.png' /><span>Новый документ</span></div>
  </div>
</template>

<script>

export default {
  name: 'HeadButtonsBlock',
 }
</script>

<style>

.head-buttons-line {
    
  display: flex;
  flex-direaction: row;
  
}

.head-button {
    height: 30px;
    display: flex;
   flex-direaction: row;
   margin-left: 15px;
   align-items: center; 
   border: 1px solid #C2C5CD;
   border-radius: 30px;
   padding-left: 10px;
   padding-right: 20px;
   font-weight: 500;
   font-size: 12px;

}

.head-plus {
    width: 15px;
    height: 15px;
    margin-right: 10px;
}

.head-bm {
     width: 30px;
     height: 30px;
}

</style>