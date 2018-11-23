const layoutModule = {
  namespaced: true,
  state: {
    sidebarOpen: false,
    needScrolling: false,
  },
  mutations: {
    updateSidebar: (state, payload) => {
      state.sidebarOpen = payload;
    },
    updateNeedScrolling: (state, payload) => {
      state.needScrolling = payload;
    },
  },
  getters: {
    sidebarOpen: state => state.sidebarOpen,
    needScrolling: state => state.needScrolling,
  },
};

export default layoutModule;
