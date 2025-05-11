export default defineNuxtRouteMiddleware((to, _) => {
    if (to.path === "/posts" && !to.query.page) {
        return navigateTo({ path: "/posts", query: { page: "1" } });
    }
    if (to.path === "/login") {
        if (useAuth().user.value !== null) {
            return navigateTo("/");
        }
    }
    if (to.path === "/dashboard") {
      const timer = setTimeout(() => {
        if (useAuth().user.value === null) {
            clearTimeout(timer);
            return navigateTo("/");
        }
      }, 500);
    }
});
