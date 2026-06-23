import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { handleSitemapRequest } from "./lib/sitemap";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);

      // Canonicalise scheme AND host in a single 301 hop:
      //   http(s)://www.example  ->  https://example   (one redirect, no chains/loops)
      // The real scheme arrives via the CF-Visitor header (and X-Forwarded-Proto)
      // behind Cloudflare, since the Worker may otherwise see https. The www ->
      // non-www redirect removes the duplicate-URL split that splits SEO equity.
      const cfVisitor = request.headers.get("cf-visitor") ?? "";
      const isHttp =
        url.protocol === "http:" ||
        request.headers.get("x-forwarded-proto") === "http" ||
        /"scheme"\s*:\s*"http"/.test(cfVisitor);
      const isWww = url.hostname.startsWith("www.");
      if (isHttp || isWww) {
        url.protocol = "https:";
        if (isWww) url.hostname = url.hostname.slice(4);
        return Response.redirect(url.toString(), 301);
      }

      // Permanent redirects for renamed URLs, so old inbound links and any
      // search-index entries keep their equity instead of hitting a 404.
      const LEGACY_REDIRECTS: Record<string, string> = {
        "/blog/bholera-vs-other-smart-cities": "/blog/dholera-vs-other-smart-cities",
      };
      const legacyTarget = LEGACY_REDIRECTS[url.pathname];
      if (legacyTarget) {
        url.pathname = legacyTarget;
        return Response.redirect(url.toString(), 301);
      }

      // Dynamic sitemap: generated from the live `blogs` table so newly
      // published posts appear without a redeploy. Served here (not via a
      // file route) because this TanStack Start version has no server-route
      // API, and the static public/sitemap.xml was removed so it can't shadow.
      if (url.pathname === "/sitemap.xml") {
        return await handleSitemapRequest();
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
