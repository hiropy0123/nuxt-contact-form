<template lang="pug">
  div.contact-form
    .form-content 
      label.required 名前
      input(
        v-model="formData.yourName"
        type="text" 
        class="form-control" 
        name="yourName" 
        required 
        autocomplete="name"
        @blur="touched.yourName = true"
      )
      .input-hint 
        span.error(v-show="touched.yourName && !formData.yourName") 必須項目です

    .form-content 
      label.required メールアドレス
      input(
        v-model="formData.yourEmail"
        type="text" 
        class="form-control" 
        name="yourEmail" 
        required 
        autocomplete="email"
        @blur="touched.yourEmail = true"
      )
      .input-hint 
        span.error(v-show="touched.yourEmail && !formData.yourEmail") 必須項目です。
        span.error(v-show="touched.yourEmail && !validEmail(formData.yourEmail)") メールアドレスを正しく入力してください。

    .form-content 
      label 題名
      input(
        v-model="formData.subject"
        type="text" 
        class="form-control" 
        name="subject" 
      )

    .form-content 
      label お問い合わせ内容
      textarea(
        v-model="formData.message"
        class="form-control" 
        name="message" 
        rows="8" 
      )
    
    button(:disabled="hasError", @click="confirm") 確認画面へ
  
</template>

<script>
import _ from 'lodash'

const initialState = () => {
  return {
    formData: {
      yourName: '',
      yourEmail: '',
      subject: '',
      message: ''
    },
    touched: {
      yourName: false,
      yourEmail: false
    },
    valid: {
      yourName: false,
      yourEmail: false
    },
    isModal: false
  }
}

export default {
  data() {
    return initialState()
  },
  computed: {
    hasError() {
      return !this.validateForm()
    }
  },
  methods: {
    // バリデーション
    validEmail(email) {
      const RegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      return RegExp.test(email)
    },
    validateForm() {
      // 入力をトライしたかどうか
      const array = _.map(this.touched, item => {
        return item
      })
      const allTouched = array.every(value => {
        return value === true
      })

      if (this.formData.yourName) {
        this.valid.yourName = true
      } else {
        this.valid.yourName = false
      }
      if (this.formData.yourEmail) {
        this.valid.yourEmail = true
      } else {
        this.valid.yourEmail = false
      }

      // 入力されているかどうか
      const array2 = _.map(this.valid, item => {
        return item
      })
      const allValid = array2.every(value => {
        return value === true
      })

      return allTouched && allValid
    },
    // Vuexに保存
    storeForm() {
      const form = this.formData
      this.$store.commit('setFormData', form)
    },
    // 確認ページ
    confirm() {
      this.storeForm()
      this.open()
    },
    // モーダルを開く
    open() {
      this.$emit('open-modal')
    },
    // モーダルを閉じる
    close() {
      this.$emit('close-modal')
    },

    // dataを初期値に戻す
    reset() {
      Object.assign(this.$data, initialState())
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-form {
  max-width: 620px;
  margin: 3.5rem auto;
}
.form-content {
  margin-bottom: 1.6rem;
}
label {
  display: block;
  font-weight: bold;
  &.required {
    &::after {
      content: '※';
      color: #f57567;
      display: inline-block;
      padding: 0 0.5rem;
    }
  }
}
.input-hint {
  font-size: 75%;
  color: #999;
  span {
    display: block;
    &.error {
      color: #f57567;
    }
  }
}

input, textarea {
  width: 100%;
  font-size: 16px;
  padding: .5em .75em;
  border-radius: 3px;
  border: 1px solid #aaa;
}

button {
  display: block;
  position: relative;
  color: #fff;
  background: #6fafd9;
  border: 0;
  padding: 1em;
  border-radius: 0.75em;
  font-size: 3.6vw;
  margin: 1em auto;
  width: 90%;
  max-width: 400px;
  border: 0;
  &[disabled] {
    background: #cccccc;
  }
  @media (min-width: 768px) {
    font-size: 22px;
    padding: 0.5em;
  }
}

.scroll-inline {
  position: relative;
  width: 100%;
  height: 200px;
  overflow-y: scroll;
  border: 1px solid #cdcdcd;
  margin: 1rem 0;
  padding: 0 0.75em 3em;
}

.checkbox {
  display: inline-block;
  margin-right: 0.5rem;
}
</style>
