<template>
  <div class="header-line">
  <span class="header-title">Документы</span>
  <HeadButtonsBlock />
  </div>
</template>

<script>

import HeadButtonsBlock from './HeadButtonsBlock';

export default {
  name: 'HeaderControl',
  components: {
   HeadButtonsBlock
  },
}
</script>

<style>
.header-line {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 24px;
}

.button-line {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;  
}

.header-title {
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 108%;
}

.hover {
  background-color: rgb(172, 255, 158);
}
</style>