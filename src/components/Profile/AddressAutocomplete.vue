<template>
  <GmapAutocomplete
      :value="value"
      @place_changed="updateAddress"
  ></GmapAutocomplete>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    updateAddress(place) {
      // Emit the formatted_address to the parent component
      this.$emit('input', place.formatted_address);
    }
  }
};
</script>
