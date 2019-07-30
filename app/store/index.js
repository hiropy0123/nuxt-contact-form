// # Modules Mode Vuex Store
export default {
  state: () => ({
    formData: {
      yourName: null,
      yourEmail: null,
      subject: null,
      message: null
    }
  }),
  getters: {
    getFormData: state => state.formData
  },
  mutations: {
    setFormData(state, payload) {
      state.formData = payload
    }
  },
  actions: {
    resetForm(context) {
      const emptyForm = {
        yourName: null,
        yourEmail: null,
        subject: null,
        message: null
      }
      context.commit('setFormData', emptyForm)
    }
  }
}
