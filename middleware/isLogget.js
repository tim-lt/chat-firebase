export default function ({ store, redirect }) {
  if (!store.getters['ModuleAuth/isLogged']) {
    redirect('/auth');
  }
}
