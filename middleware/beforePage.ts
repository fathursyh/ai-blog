export default defineNuxtRouteMiddleware((to, _) => {
    if (to.path === "/posts") {
        if (to.query.page === undefined) {
            return navigateTo({ path: "/posts", query: { page: "1" } }, {replace: true});
        }
    }
    if (to.path === "/dashboard/posts") {
          if (to.query.page === undefined) {
              return navigateTo({ path: "/dashboard/posts", query: { page: "1" }}, {replace: true});
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
