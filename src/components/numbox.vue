<template>
  <div class="mui-numbox" :data-numbox-min="1" :data-numbox-max="max" :style="myStyle">
    <button @click="decrease" :disabled="currentCount <= 1">-</button>
    <input type="number" v-model="currentCount" :max="max" min="1"/>
    <button @click="increase" :disabled="currentCount >= max">+</button>
  </div>
</template>

<script>
export default {
  props: {
    initcount: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    goodsid: {
      type: Number,
      required: true
    },
    size: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentCount: this.initcount,
      myStyle: {}
    };
  },
  mounted() {
    if (this.size === 'min') {
      this.myStyle = { height: '25px', margin: '0 10px 0 10px' };
    }
  },
  methods: {
    decrease() {
      if (this.currentCount > 1) {
        this.currentCount--;
        this.$emit('count', { id: this.goodsid, count: this.currentCount });
      }
    },
    increase() {
      if (this.currentCount < this.max) {
        this.currentCount++;
        this.$emit('count', { id: this.goodsid, count: this.currentCount });
      }
    }
  }
};
</script>

<style scoped>
.mui-numbox {
  display: flex;
  align-items: center;
}
button {
  width: 30px;
  height: 30px;
}
input {
  width: 50px;
  text-align: center;
}
</style>
