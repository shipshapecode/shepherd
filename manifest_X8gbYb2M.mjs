import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'string-width';
import './chunks/astro_qmXpTbcz.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    })
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"","routes":[{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Ulrar1jj.js"}],"styles":[{"type":"external","src":"/_astro/about.odnpKizA.css"},{"type":"external","src":"/_astro/demo.8qjEG208.css"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Ulrar1jj.js"}],"styles":[{"type":"external","src":"/_astro/about.odnpKizA.css"},{"type":"external","src":"/_astro/demo.8qjEG208.css"}],"routeData":{"route":"/pricing","type":"page","pattern":"^\\/pricing\\/?$","segments":[[{"content":"pricing","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pricing.astro","pathname":"/pricing","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","type":"endpoint","pattern":"^\\/rss\\.xml$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Ulrar1jj.js"}],"styles":[{"type":"external","src":"/_astro/about.odnpKizA.css"},{"type":"external","src":"/_astro/demo.8qjEG208.css"}],"routeData":{"route":"/about","type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Ulrar1jj.js"}],"styles":[{"type":"external","src":"/_astro/about.odnpKizA.css"},{"type":"external","src":"/_astro/demo.8qjEG208.css"},{"type":"inline","content":"main[data-astro-cid-5tznm7mj]{width:960px}ul[data-astro-cid-5tznm7mj]{display:flex;flex-wrap:wrap;gap:2rem;list-style-type:none;margin:0;padding:0}ul[data-astro-cid-5tznm7mj] li[data-astro-cid-5tznm7mj]{width:calc(50% - 1rem)}ul[data-astro-cid-5tznm7mj] li[data-astro-cid-5tznm7mj] [data-astro-cid-5tznm7mj]{text-decoration:none;transition:.2s ease}ul[data-astro-cid-5tznm7mj] li[data-astro-cid-5tznm7mj]:first-child{width:100%;margin-bottom:1rem;text-align:center}ul[data-astro-cid-5tznm7mj] li[data-astro-cid-5tznm7mj]:first-child img[data-astro-cid-5tznm7mj]{width:100%}ul[data-astro-cid-5tznm7mj] li[data-astro-cid-5tznm7mj]:first-child .title[data-astro-cid-5tznm7mj]{font-size:2.369rem}ul[data-astro-cid-5tznm7mj] li[data-astro-cid-5tznm7mj] img[data-astro-cid-5tznm7mj]{margin-bottom:.5rem;border-radius:12px}ul[data-astro-cid-5tznm7mj] li[data-astro-cid-5tznm7mj] a[data-astro-cid-5tznm7mj]{display:block}.title[data-astro-cid-5tznm7mj]{margin:0;color:rgb(var(--black));line-height:1}.date[data-astro-cid-5tznm7mj]{margin:0;color:rgb(var(--gray))}ul[data-astro-cid-5tznm7mj] li[data-astro-cid-5tznm7mj] a[data-astro-cid-5tznm7mj]:hover h4[data-astro-cid-5tznm7mj],ul[data-astro-cid-5tznm7mj] li[data-astro-cid-5tznm7mj] a[data-astro-cid-5tznm7mj]:hover .date[data-astro-cid-5tznm7mj]{color:rgb(var(--accent))}ul[data-astro-cid-5tznm7mj] a[data-astro-cid-5tznm7mj]:hover img[data-astro-cid-5tznm7mj]{box-shadow:var(--box-shadow)}@media (max-width: 720px){ul[data-astro-cid-5tznm7mj]{gap:.5em}ul[data-astro-cid-5tznm7mj] li[data-astro-cid-5tznm7mj]{width:100%;text-align:center}ul[data-astro-cid-5tznm7mj] li[data-astro-cid-5tznm7mj]:first-child{margin-bottom:0}ul[data-astro-cid-5tznm7mj] li[data-astro-cid-5tznm7mj]:first-child .title[data-astro-cid-5tznm7mj]{font-size:1.563em}}\n"}],"routeData":{"route":"/blog","type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Ulrar1jj.js"}],"styles":[{"type":"external","src":"/_astro/about.odnpKizA.css"},{"type":"external","src":"/_astro/demo.8qjEG208.css"}],"routeData":{"route":"/blog/[...slug]","type":"page","pattern":"^\\/blog(?:\\/(.*?))?\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/blog/[...slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Ulrar1jj.js"}],"styles":[{"type":"external","src":"/_astro/about.odnpKizA.css"},{"type":"external","src":"/_astro/demo.8qjEG208.css"}],"routeData":{"route":"/demo","type":"page","pattern":"^\\/demo\\/?$","segments":[[{"content":"demo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/demo.astro","pathname":"/demo","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://example.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/home/runner/work/shepherd/shepherd/landing/src/pages/blog/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/runner/work/shepherd/shepherd/landing/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/runner/work/shepherd/shepherd/landing/src/pages/rss.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@js",{"propagation":"in-tree","containsHead":false}],["/home/runner/work/shepherd/shepherd/landing/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/home/runner/work/shepherd/shepherd/landing/src/pages/demo.astro",{"propagation":"none","containsHead":true}],["/home/runner/work/shepherd/shepherd/landing/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/runner/work/shepherd/shepherd/landing/src/pages/pricing.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var r=(i,c,s)=>{let n=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),n();break}});for(let e of s.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/pricing@_@astro":"pages/pricing.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@js":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/blog/[...slug]@_@astro":"pages/blog/_---slug_.astro.mjs","\u0000@astro-page:src/pages/demo@_@astro":"pages/demo.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000empty-middleware":"_empty-middleware.mjs","/src/pages/about.astro":"chunks/pages/about_fTwXrfZU.mjs","/src/pages/pricing.astro":"chunks/pages/pricing_F4MskHnD.mjs","/src/pages/rss.xml.js":"chunks/pages/rss_xVrmgTEE.mjs","\u0000@astrojs-manifest":"manifest_X8gbYb2M.mjs","/home/runner/work/shepherd/shepherd/landing/src/content/blog/first-post.md?astroContentCollectionEntry=true":"chunks/first-post_LWyONxry.mjs","/home/runner/work/shepherd/shepherd/landing/src/content/blog/markdown-style-guide.md?astroContentCollectionEntry=true":"chunks/markdown-style-guide_j3EmaeaF.mjs","/home/runner/work/shepherd/shepherd/landing/src/content/blog/second-post.md?astroContentCollectionEntry=true":"chunks/second-post_gpx_0Xbc.mjs","/home/runner/work/shepherd/shepherd/landing/src/content/blog/third-post.md?astroContentCollectionEntry=true":"chunks/third-post_VjIOSNjx.mjs","/home/runner/work/shepherd/shepherd/landing/src/content/blog/using-mdx.mdx?astroContentCollectionEntry=true":"chunks/using-mdx_XWVZcOvs.mjs","/home/runner/work/shepherd/shepherd/landing/src/content/blog/first-post.md?astroPropagatedAssets":"chunks/first-post_tAWixxwA.mjs","/home/runner/work/shepherd/shepherd/landing/src/content/blog/markdown-style-guide.md?astroPropagatedAssets":"chunks/markdown-style-guide_QqGXr3Ve.mjs","/home/runner/work/shepherd/shepherd/landing/src/content/blog/second-post.md?astroPropagatedAssets":"chunks/second-post_y94H1pbm.mjs","/home/runner/work/shepherd/shepherd/landing/src/content/blog/third-post.md?astroPropagatedAssets":"chunks/third-post_wwNAf483.mjs","/home/runner/work/shepherd/shepherd/landing/src/content/blog/using-mdx.mdx?astroPropagatedAssets":"chunks/using-mdx_Td6XSixQ.mjs","/home/runner/work/shepherd/shepherd/landing/src/content/blog/first-post.md":"chunks/first-post_5V-9FXwO.mjs","/home/runner/work/shepherd/shepherd/landing/src/content/blog/markdown-style-guide.md":"chunks/markdown-style-guide_0XW3qdLb.mjs","/home/runner/work/shepherd/shepherd/landing/src/content/blog/second-post.md":"chunks/second-post_DECW6_hH.mjs","/home/runner/work/shepherd/shepherd/landing/src/content/blog/third-post.md":"chunks/third-post_PBWOjoRc.mjs","/home/runner/work/shepherd/shepherd/landing/src/content/blog/using-mdx.mdx":"chunks/using-mdx_GKbeN_rD.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.Ulrar1jj.js","astro:scripts/before-hydration.js":""},"assets":[]});

export { manifest };
