<template>
  <div class="control-line">
  <img class="control-btn" src='../assets/edit.png' />
  <img class="control-btn" src='../assets/trash.png' />
  <img @click="onClick" class="control-btn" src='../assets/move.png' />
  </div>
</template>

<script>

export default {
  name: 'ControlBlock',
      
  methods: {
      
    onClick(e){
        this.$emit('clickMove', e)
    }
  },
}
</script>

<style>

.control-line {
    
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  flex-direaction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  
}

.control-btn {
    height: 20px;
    width: auto;
    margin-right: 20px;
}

</style>