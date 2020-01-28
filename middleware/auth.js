export default async function ({
  store, from, route, req,
}) {
  if (from !== undefined) {
    if (from.path === route.path) return;
  }

  // If nuxt generate, pass this middleware
  if (process.server && !req) return;

  try {
    await store.dispatch('ModuleAuth/getUid');
  } catch (e) {
    console.log(e);
  }
}
