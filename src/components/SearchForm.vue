<template>
  <div :class="message?'input-wrapper input-active':'input-wrapper'">
   <img src='../assets/search.png'/>    
   <input v-model="message" placeholder="Поиск" class="input-style"/>		
   <div v-if="message" @click="deleteMessage"><img src='../assets/cross.png'/></div>
  </div>
</template>

<script>

export default {
  name: 'SearchForm',
  components: {
    
  },
  data() {
  
  },
  computed: {
	message: {
		get () {
			return this.$store.state.message
		},
		set (value) {
			this.$store.commit('updateMessage', value)
		}
	}
  },
  methods: {
    deleteMessage(){
        this.message = '';
    }
  },
  setup() {
 
  }
}
</script>

<style>
.input-wrapper {
   display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;  
  height: 30px;
  border-bottom: 1px solid #D3D8DF;
  font-style: italic;
  width: 800px;
}

.input-style {
  padding-left: 6px;
  width: 100%;
  
}

.input-active {
    border-bottom: 1px solid #0066FF;
    font-style: normal;
    
}

input, textarea {
    outline:none;
    border: 0px;
    font-family: inherit;
}


.hover {
  background-color: rgb(172, 255, 158);
}
</style>