export default defineNuxtRouteMiddleware((to, _) => {
    if (to.path === "/posts") {
        if (to.query.page === undefined) {
            to.query.page = "1";
        }
    }
    if (to.path === "/dashboard/posts") {
          if (to.query.page === undefined) {
            to.query.page = "1";
        }
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
