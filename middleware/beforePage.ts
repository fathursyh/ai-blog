export default defineNuxtRouteMiddleware((to, _) => {
  if (to.path === '/posts' && !to.query.page) {
    return navigateTo({ path: '/posts', query: { page: '1' } });
  }
});
