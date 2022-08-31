<template id="root">
<HeaderControl/>
<SearchForm />
<MainList />

</template>

<script>


import HeaderControl from '@/components/HeaderControl'
import SearchForm from '@/components/SearchForm';
import MainList from '@/components/MainList';

export default {
  name: 'App',
  components: {
	HeaderControl,
	SearchForm,
    MainList,
  },
  setup() {

  }
}
</script>

<style>
#app {
    font-family: 'Fira Sans';
    font-style: normal;
    font-weight: 400;
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 33px;
    min-width: 800px;
    
    }
    
 
    
    
</style>