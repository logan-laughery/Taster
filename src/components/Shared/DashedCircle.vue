<template>
  <div class="dashed-spinner-container">
    <div class="dashed-spinner">
      <div class="centered-content">
        <slot/>
      </div>
      <div
        v-for="(arc, index) in arcs"
        :key="index"
        :style="{ transform: arc.style.transform }"
        class='arc'
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashedCircle',
  props: {
    size: {
      type: Number,
      default: 8,
    },
  },
  data() {
    return {
      arcSize: 20,
      arcSpacing: 20,
      arcCount: 9,
      duration: 5,
    };
  },
  computed: {
    arcs() {
      return Array.from(Array(this.arcCount).keys())
        .map((index) => {
          const initialLoc = (this.arcSize / 2) + 90;
          const location = index === 0 ? initialLoc :
            ((this.arcSize + this.arcSpacing) * index) + initialLoc;
          const delay = (this.duration / 4 / this.arcCount) * index;

          return {
            style: {
              transform: `rotate(${location}deg) skewX(70deg)`,
              animation: `show ${this.duration}s steps(1,end) infinite ${delay}s`,
            },
          };
        });
    },
  },
};
</script>

<style>
.dashed-spinner-container {
  display: block;
  width: 160px;
  height: 160px;
  margin: 0 auto;
  padding: 20px;
}
.dashed-spinner {
  display: flex;
  position: relative;
  border-radius: 50%;
  height: 100%;
  width: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}
.centered-content {
  padding: 0;
}
.arc {
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 50%;
  bottom: 50%;
  left: 0;
  transform-origin: 100% 100%;
  transform: rotate(105deg) skewX(70deg);
  visibility: visible;
}
.arc:before {
  box-sizing: border-box;
  display: block;
  border: solid .5em #000000b8;
  width: 200%; height: 200%;
  border-radius: 50%;
  transform: skewX(-70deg);
  content: '';
}
</style>
