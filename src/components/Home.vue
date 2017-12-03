<template>
    <div>

      <mt-button @click="send" style="denger" size="large">获取数据</mt-button>
      {{lunbo}}
    </div>
</template>

<script>
export default {
  data(){
    return {
      lunbo:[]
    }
  },
  methods: {
    send() {
      this.$axios.get("getlunbo")
      .then(res => {
        this.lunbo = res.data.message

      });
    }
  }
};
</script>

<style>

</style>
