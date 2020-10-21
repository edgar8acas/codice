import store from "../store/index";
import { IS_AUTHENTICATED } from "../store/getter-types";

export const authGuard = (to, from, next) => {
  const fn = () => {
    if (to.matched.some((rec) => rec.meta.requiresAuth)) {
      if (!store.getters[`auth/${IS_AUTHENTICATED}`]) {
        next({
          name: "Login",
          query: { redirect: to.fullPath },
        });
      }
      next();
    }
    next();
  };
  // return fn();
  if (!store.state.auth.loading) {
    return fn();
  }

  store.watch(
    (state) => state.auth.loading,
    (loading) => {
      if (loading === false) {
        return fn();
      }
    }
  );
};
