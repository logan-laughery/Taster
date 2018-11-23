const beerNoteModule = {
  namespaced: true,
  state: {
    footerNav: {
      forwardRoute: '',
      backRoute: '',
      upperText: '',
      lowerText: '',
    },
  },
  mutations: {
    updateFooterNav: (state, payload) => {
      state.footerNav = payload;
    },
  },
  getters: {
    footerNav: state => state.footerNav,
  },
};

export default beerNoteModule;
