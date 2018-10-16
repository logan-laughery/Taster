<template>
  <svg viewBox="0 0 100 10">
    <line x1="0" y1="5" x2="100" y2="5" class="dashed" />
  </svg>
</template>

<script>
export default {
  name: 'DashedDivider',
};
</script>

<style scoped>
svg {
  height: 40px;
  width: 100%;
}
line {
  fill: transparent;
  stroke: #00000075;
  stroke-width: 1px;
}
.dashed {
  stroke-dasharray: 10%, 5%;
}
div {
  height: 300px;
  width: 200px;
  padding: 12px;
}
</style>
