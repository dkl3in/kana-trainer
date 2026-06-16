<template>
  <Teleport to="body">
    <div v-if="modelValue" class="reset-overlay" @click.self="$emit('update:modelValue', false)">
      <div class="reset-dialog">
        <div class="reset-dialog__icon"><Icon icon="carbon:warning-filled" /></div>
        <h3 class="reset-dialog__title">{{ $t('stats.reset.title') }}</h3>
        <p class="reset-dialog__text" v-html="$t('stats.reset.text')"></p>
        <div class="reset-dialog__actions">
          <button class="reset-dialog__cancel" @click="$emit('update:modelValue', false)">
            {{ $t('stats.reset.cancel') }}
          </button>
          <button class="reset-dialog__confirm" @click="$emit('confirm')">
            {{ $t('stats.reset.confirm') }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { Icon } from '@iconify/vue'
defineProps({ modelValue: Boolean })
defineEmits(['update:modelValue', 'confirm'])
</script>
