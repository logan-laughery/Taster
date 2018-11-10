const layoutModule = {
  namespaced: true,
  state: {
    sidebarOpen: false,
  },
  mutations: {
    updateSidebar: (state, payload) => {
      state.sidebarOpen = payload;
    },
  },
  getters: {
    sidebarOpen: state => state.sidebarOpen,
  },
};

export default layoutModule;
