<template lang="pug">
  .contact-confirm 
    .overlay
    slot
      .modal 
        h2(:class="myStatus") {{ dataResponse ? dataResponse.message : '入力内容をご確認ください。' }}
        .confirm(v-if="!dataResponse")
          dl 
            dt 名前
            dd {{ getFormData.yourName }}
          dl 
            dt メールアドレス
            dd {{ getFormData.yourEmail }}
          dl 
            dt 題名
            dd {{ getFormData.subject }}
          dl 
            dt お問い合わせ内容
            dd(v-html="getFormData.message")

          .btn-submit(@click="send") 送信
          .btn-return(@click="close") 修正する

        .response(v-if="dataResponse")
          .response-body(v-html="dataResponse.body")
          .btn-return(@click="close") 閉じる
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    dataResponse: {
      type: Object,
      required: false,
      default: null
    }
  },
  computed: {
    myStatus() {
      if (this.dataResponse !== null) {
        return this.dataResponse.status
      } else {
        return ''
      }
    },
    ...mapGetters(['getFormData'])
  },
  methods: {
    close() {
      this.$store.dispatch('resetForm')
      this.$emit('close-modal')
    },
    clear() {
      this.$emit('clear-data')
    },
    send() {
      this.clear()
      this.$emit('submit')
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-confirm {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10010;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    display: block;
    background: rgba(255, 255, 255, 0.95);
  }
  .modal {
    position: relative;
    display: block;
    width: 85%;
    padding: 20px 5vw;
    border: 1vw solid #c7c7c7;
    height: 80vh;
    overflow-y: scroll;
    background: #f2f2f2;
    max-width: 650px;
    @media (min-width: 768px) {
      padding: 20px 30px;
      border: 10px solid #c7c7c7;
    }
  }
  h2 {
    font-size: 4vw;
    color: #fff;
    background: #363636;
    text-align: center;
    line-height: 2.5;
    &.mail_sent {
      background: #379e40;
    }
    &.error {
      background: #ff9e9e;
    }
    @media (min-width: 768px) {
      font-size: 24px;
    }
  }
  dl {
    margin-bottom: 20px;
    font-size: 3.4vw;
    @media (min-width: 768px) {
      font-size: 16px;
    }
    dt {
      font-size: 3.8vw;
      font-weight: bold;
      @media (min-width: 768px) {
        font-size: 16px;
      }
    }
  }
}

.btn-submit {
  display: block;
  position: relative;
  color: #fff;
  text-align: center;
  font-weight: bold;
  background: #6fafd9;
  border: 0;
  padding: 1em;
  border-radius: 0.75em;
  font-size: 3.6vw;
  margin: 1em auto;
  width: 90%;
  max-width: 400px;
  @media (min-width: 768px) {
    font-size: 16px;
  }
  &:hover {
    cursor: pointer;
  }
}

.response-body {
  margin-bottom: 1.5em;
}

.btn-return {
  text-align: center;
  font-weight: bold;
  font-size: 3.2vw;
  &::before {
    content: '＞';
    display: inline-block;
    margin-right: 0.5rem;
  }
  @media (min-width: 768px) {
    font-size: 14px;
  }
  &:hover {
    cursor: pointer;
  }
}
</style>
