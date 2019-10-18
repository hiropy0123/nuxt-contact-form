<template lang="pug">
  section.l-section 
    .l-container 
      h1 Nuxt Contact Form 7 お問い合わせフォーム
      p NuxtからWordPressのContact Form 7 プラグインを使ってお問い合わせフォームのメールを送信するテストです。
      contact-form(ref="form", @open-modal="openModal()")
      transition(name="modal", v-cloak)
        form-modal(
          v-if="isModal", 
          @close-modal="closeModal()", 
          @clear-data="clear()", 
          @submit="submit()",
          :data-response="responseData"
        )
</template>

<script>
import ContactForm from '@/components/ContactForm'
import FormModal from '@/components/FormModal'

export default {
  components: {
    ContactForm,
    FormModal
  },
  data() {
    return {
      isModal: false,
      responseData: null
    }
  },
  methods: {
    openModal() {
      this.isModal = true
    },
    closeModal() {
      this.isModal = false
    },
    clear() {
      this.$refs.form.reset()
    },
    submit() {
      const formData = this.convertJsontoUrlencoded(this.$store.state.formData)
      const USER = process.env.WPUSER
      const PASSWORD = process.env.APPLICATION_PASSWORD
      // Base64に変換
      const TOKEN = window.btoa(`${USER}:${PASSWORD}`)
      const axiosConfig = {
        headers: {
          Authorization: `Basic ${TOKEN}`,
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        }
      }

      this.$axios
        .post(
          '/contact-form-7/v1/contact-forms/5/feedback/',
          formData,
          axiosConfig
        )
        .then(response => {
          console.log(response)
          this.responseData = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    // Conver to JSON Object to application/x-www-form-urlencoded
    convertJsontoUrlencoded(obj) {
      const str = []
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          str.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
        }
      }
      return str.join('&')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  &-enter-active,
  &-leave-active {
    opacity: 1;
    transform: scale(1);
    transition-duration: 0.3s;
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-name: anime__opend;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: scale(0.8);
    transition-duration: 0.3s;
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-name: anime__closed;
  }
}

@keyframes anime__opend {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes anime__closed {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.9);
  }
}
</style>
