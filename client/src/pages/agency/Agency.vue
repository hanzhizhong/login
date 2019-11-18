<template>
  <div class="agency">
      <h3>这是代理商</h3>
      <button @click="getData">获取数据</button>
  </div>
</template>

<script>
export default {
  methods:{
    getData(){
      this.$axios.get('https://jsonplaceholder.typicode.com/users').then(res=>{
        console.log('res',res)
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  mounted(){
    
  }
}
</script>

<style>

</style>