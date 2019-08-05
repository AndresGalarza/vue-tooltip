<template>
  <transition name="fade" v-on:enter="enter" >
    <div v-show="visible" class="v-tooltip" :style="calculate">
      <span ref="tip" :class="[position, size]" v-html="text"></span>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      visible: true,
      position: "t-top",
      size:'t-md',
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      rkey: 0,
      tip: 0,
      avaliableRef: true,
      tipHeight: 0,
      tipWidth: 0
    };
  },
  updated() {
    this.tipHeight = this.$refs.tip.offsetHeight;
    this.tipWidth = this.$refs.tip.offsetWidth;
  },
  computed: {
    calculate() {
      let  tipHeight, tipWidth;
      tipHeight = this.tipHeight;
      tipWidth = this.tipWidth;


      let base = {};
      if (this.position === "t-bottom") {
        base = {
          top: this.top + this.height + 5 + "px",
          left: this.left + this.width / 2 + "px"
        };
      } else if (this.position === "t-top") {
        base = {
          top: this.top - 5 - tipHeight + "px",
          left: this.left + this.width / 2 + "px"
        };
      } else if (this.position === "t-left") {
        base = {
          top: this.top + this.height / 2 - tipHeight / 2 + "px",
          left: this.left - tipWidth - 5 + "px"
        };
      } else if (this.position === "t-right") {
        base = {
          top: this.top + this.height / 2 - tipHeight / 2 + "px",
          left: this.left + this.width + 5 + "px"
        };
      }

      return base;
    }
  },
  methods:{

    enter: function (el, done) {
      this.tipHeight = el.firstChild.offsetHeight;
      this.tipWidth = el.firstChild.offsetWidth;
      done()
    },
    afterEnter: function (el) {


    }
  }
};
</script>

<style lang="scss">
$color_1: #fff;
$background_color_1: #294380;
$border_color_1: #294380 transparent transparent transparent;
$border_color_2: transparent transparent #294380 transparent;
$border_color_3: transparent #294380 transparent transparent;
$border_color_4: transparent transparent transparent #294380;

$color_2: #fff;
$background_color_2: #000;
$border_color_5: #000 transparent transparent transparent;
$border_color_6: transparent transparent #000 transparent;
$border_color_7: transparent #000 transparent transparent;
$border_color_8: transparent transparent transparent #000;


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.v-tooltip {
  position: absolute;
  display: inline-block;
  > :first-child{
    color: $color_1;
    text-align: center;
    padding: 5px;
    border-radius: 6px;
    z-index: 999;
    position: absolute;
    &::after{
      content: "";
      position: absolute;
      border-width: 5px;
      border-style: solid;
    }
  }
  > .t-top {
    visibility: visible;
    width: 150px;
    background-color: $background_color_1;
    position: absolute;
    margin-left: -75px;
    &::after {
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-color: $border_color_1;
    }
  }
  > .t-bottom {
    visibility: visible;
    width: 150px;
    background-color: $background_color_1;
    position: absolute;
    margin-left: -75px;
    &::after {
      bottom: 100%;
      left: 50%;
      margin-left: -5px;
      border-color: $border_color_2;
    }
  }
  > .t-right {
    visibility: visible;
    width: 150px;
    background-color: $background_color_1;
    position: absolute;
    &::after {
      top: 50%;
      right: 100%;
      margin-top: -5px;
      border-color: $border_color_3;
    }
  }
  > .t-left {
    visibility: visible;
    width: 150px;
    background-color: $background_color_1;
    position: absolute;
    &::after {
      top: 50%;
      left: 100%;
      margin-top: -5px;
      border-color: $border_color_4;
    }
  }
  > .t-xs{
    width: 80px;
    &.t-bottom , &.t-top{
      margin-left: -40px;
    }
  }
  > .t-sm{
    width: 120px;
    &.t-bottom , &.t-top{
      margin-left: -60px;
    }
  }
  > .t-lg{
    width: 200px;
    &.t-bottom , &.t-top{
      margin-left: -100px;
    }
  }
  > .t-xl{
    width: 250px;
    &.t-bottom , &.t-top{
      margin-left: -125px;
    }
  }
}
</style>
