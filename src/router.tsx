import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Cross-fade/slide between routes via the native View Transitions API.
    // Browsers without support (Firefox) fall back to instant navigation.
    defaultViewTransition: true,
  });

  return router;
};
