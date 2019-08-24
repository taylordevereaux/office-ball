<template>
  <div :class="['card shadow h-100 py-2', 'border-left-' + color]">
    <div class="card-body">
      <div class="row no-gutters align-items-center">
        <div class="col mr-2">
          <div :class="['text-xs font-weight-bold text-uppercase mb-1', 'text-' + color]">
            <span>{{ text }}</span>
          </div>
          <div class="h5 mb-0 font-weight-bold text-gray-800">
            <span>{{ value }}</span>
          </div>
        </div>
        <div class="col-auto">
          <i :class="['fa fa-2x', 'fa-' + icon, 'text-' + color]"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["color", "text", "value", "icon"]
};
</script>

<style>
</style>