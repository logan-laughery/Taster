<template>
  <svg viewBox="0 0 220 320">
    <rect x="10" y="5" rx="20" ry="20" width="200" height="300" class="dashed" />
    <foreignObject x="10" y="5" height="100px" width="100px">
      <div>
        <slot/>
      </div>
    </foreignObject>
  </svg>
</template>

<script>
export default {
  name: 'DashedBorder',
};
</script>

<style scoped>
svg {
  height: 295px;
  width: 200px;
}
rect {
  fill: transparent;
  stroke: #000000b8;
  stroke-width: 8;
  stroke-dashoffset: 866;
}
.dashed {
  stroke-dasharray: 35, 25;
}
div {
  height: 300px;
  width: 200px;
  padding: 12px;
}
</style>
