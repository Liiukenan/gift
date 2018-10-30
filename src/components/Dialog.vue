<template>
  <transition name="dialog-fadein">
    <div class="dialog-wrap" v-if="isShow" @click.stop @touchmove="touchmove">
      <div class="content-wrap">

        <div class="content" :style="dailogSixe">
          <span class="close icon icon-ic_closed" @click="closeDialog()"></span>
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

  export default {
    data() {
      return {
      }
    },
    props: {
      dailogSixe: {
        type: Object,
        default: () => {
          return {
            width: '300px',
            height: 'auto',
            borderRadius: '12px'
          }
        }
      },
      isShow: {
        type: Boolean,
        default: false
      }
    },
    components: {
    },
    methods: {
      closeDialog() {
        this.$emit('cancelDialog')
      },
      touchmove(event) {
        event.preventDefault();
      }
    },
  }
</script>

<style scoped lang="stylus">
.dialog-wrap
  position fixed
  left 0
  top 0
  right 0
  bottom 0
  background rgba(0,0,0,0.40)
  z-index 99999
  &.dialog-fadein-enter-active
    animation: confirm-fadein 0.3s
    .content
      animation dialog-zoom .3s
  .content-wrap
    position absolute
    top 50%
    left 50%
    transform translate3d(-50%, -50%, 0)
    .content
      height auto
      background #ffffff
      padding-bottom 15px
    .close
      position absolute
      width 24px
      height 24px
      right -12px
      top -12px
      border-radius 50%
    .content-bot
      padding: 0 24px
@keyframes confirm-fadein
  0%
    opacity: 0
  100%
    opacity: 1

@keyframes dialog-zoom
  0%
    transform: scale(0)
  50%
    transform: scale(1.1)
  100%
    transform: scale(1)
</style>
