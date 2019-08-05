<template>
  <div id="app">
    <ul>
      <li v-tooltip.xm="manzanas">apple</li>
      <li title="This is orange" v-tooltip.xl.top="'This is orange'">orange</li>
      <li v-tooltip.left="'This is cherry asnndn This is cherry asnndn'">cherry</li>
    </ul>

    <p>
      This is a long text test.
      <a
        v-tooltip.right
        href
        title="This is a long text test. When it is long enough, will it wrap?"
      >hover me</a>
      When it is long enough, will it wrap?
    </p>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      manzanas: "i have an "
    };
  },
  mounted() {
    let vm = this;
    setTimeout(function() {
      vm.manzanas = vm.manzanas + " <strong>apple</strong>";
    }, 3000);
  }
};
</script>

<style scoped lang="less">
#app {
  ul {
    width: 300px;
    padding-left: 0;
    margin: 100px auto 0;
    background-color: #f6e5e5;

    li {
      list-style: none;
      padding: 20px;
      color: #774181;
      font-size: 20px;

      a {
        color: #774181;
      }

      &:hover {
        background-color: #e6b2c6;
      }
    }
  }

  p {
    text-align: center;
    font-size: 20px;
  }
}
</style>

