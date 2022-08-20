export default {
    state: {
        token: localStorage.getItem('user-token') || ''
    },
    mutations: {
        login(state, token) {
            localStorage.setItem('user-token', token);
            state.token = localStorage.getItem('user-token');
        },
        logout(state) {
            localStorage.removeItem('user-token');
            state.token = '';
            location.reload();
        }
    },
    actions: {
        login: ({ commit }, token) => {
            commit('login', token);
        },
        logout: ({ commit }) => {
            commit('logout');
        }
    },
    getters: {
        isAuthenticated: state => !!state.token,
        token: state => state.token
    }
}