export default function ({
  store,
  redirect,
  route,
  from,
}) {
  if (!store.getters['ModuleAuth/isLogged']) {
    if (route.name === 'auth' || route.name === 'registration') return;
    redirect('/auth');
  } else if (route.name === 'auth' || route.name === 'registration') {
    redirect(from ? from.path : '/');
  }
}
