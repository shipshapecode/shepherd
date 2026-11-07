// Runs inside the page. Each fixture builds a DOM and returns { reference, floating, arrow }.
// fixedOnly skips the `absolute` strategy, keepPosition leaves the floating element's CSS position alone.
function div(parent, text = '', tag = 'div') {
  const e = (parent.ownerDocument || document).createElement(tag);
  e.style.cssText = text;
  parent.appendChild(e);
  return e;
}
const REF = 'width:120px;height:40px;background:#ccd;';
const FLOAT =
  'width:200.5px;height:90.25px;background:#fcc;position:absolute;left:0;top:0;';
const ARROW = 'position:absolute;width:16px;height:16px;background:#000;';
function mkFloating(parent, extra = '') {
  const floating = div(parent, FLOAT + extra);
  const arrow = div(floating, ARROW);
  arrow.className = 'shepherd-arrow';
  return { floating, arrow };
}
function svgEl(tag, attrs = {}) {
  const e = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  return e;
}
function bigPage() {
  div(
    document.body,
    'height:3000px;width:100%;position:absolute;top:0;left:0;z-index:-1;pointer-events:none'
  );
}
function classicBar() {
  const style = document.createElement('style');
  style.textContent =
    '::-webkit-scrollbar{width:15px;height:15px;background:#eee}';
  document.head.append(style);
}
const abs = (left, top) => `position:absolute;left:${left}px;top:${top}px;`;
const CENTER = REF + abs(440, 330);
const BOX = 'position:absolute;left:50px;top:80px;width:800px;height:500px;';

window.FIXTURES = {
  plain() {
    const reference = div(document.body, CENTER);
    return { reference, ...mkFloating(document.body) };
  },
  cornerTopLeft() {
    const reference = div(document.body, REF + abs(0, 0));
    return { reference, ...mkFloating(document.body) };
  },
  cornerBottomRight() {
    const reference = div(
      document.body,
      REF + 'position:absolute;left:880px;top:660px'
    );
    return { reference, ...mkFloating(document.body) };
  },
  bodyMargin() {
    document.body.style.margin = '37px 19px';
    const reference = div(document.body, REF + 'margin:100px 0 0 300px');
    return { reference, ...mkFloating(document.body) };
  },
  bodyNarrow() {
    document.body.style.cssText = 'width:800px;margin:0 auto;';
    const reference = div(document.body, REF + 'margin:200px 0 0 300px');
    return { reference, ...mkFloating(document.body) };
  },
  bodySlightlyNarrow() {
    document.body.style.cssText = 'width:calc(100% - 20px);margin:0;';
    const reference = div(document.body, REF + 'margin:200px 0 0 860px');
    return { reference, ...mkFloating(document.body) };
  },
  bodyPositioned() {
    document.body.style.cssText = 'position:relative;margin:23px;';
    const reference = div(document.body, REF + 'margin:100px 0 0 300px');
    return { reference, ...mkFloating(document.body) };
  },
  htmlPositioned() {
    document.documentElement.style.cssText = 'position:relative;margin:11px;';
    const reference = div(document.body, REF + 'margin:100px 0 0 300px');
    return { reference, ...mkFloating(document.body) };
  },
  htmlMarginBorder() {
    document.documentElement.style.cssText =
      'margin:13px;border:7px solid red;';
    const reference = div(document.body, REF + 'margin:100px 0 0 300px');
    return { reference, ...mkFloating(document.body) };
  },
  bodyTransformed() {
    document.body.style.cssText =
      'transform:translate(30px,40px);margin:5px;height:1500px;';
    const reference = div(document.body, REF + 'margin:100px 0 0 300px');
    return { reference, ...mkFloating(document.body) };
  },
  scrolled() {
    bigPage();
    const reference = div(document.body, REF + abs(440, 830));
    const r = { reference, ...mkFloating(document.body) };
    window.scrollTo(0, 500);
    return r;
  },
  scrolledXY() {
    div(
      document.body,
      'position:absolute;left:0;top:0;width:4000px;height:4000px;z-index:-1'
    );
    const reference = div(document.body, REF + abs(1440, 1830));
    const r = { reference, ...mkFloating(document.body) };
    window.scrollTo(1000, 1500);
    return r;
  },
  scrolledNearEdge() {
    bigPage();
    const reference = div(document.body, REF + abs(440, 510));
    const r = { reference, ...mkFloating(document.body) };
    window.scrollTo(0, 500);
    return r;
  },
  rtl() {
    document.documentElement.setAttribute('dir', 'rtl');
    bigPage();
    const reference = div(document.body, CENTER);
    return { reference, ...mkFloating(document.body) };
  },
  rtlOverflowX() {
    document.documentElement.setAttribute('dir', 'rtl');
    div(document.body, 'width:3000px;height:10px');
    const reference = div(
      document.body,
      REF + 'position:absolute;left:-600px;top:330px'
    );
    const r = { reference, ...mkFloating(document.body) };
    window.scrollTo(-500, 0);
    return r;
  },
  rtlFloatingOnly() {
    const reference = div(document.body, CENTER);
    const m = mkFloating(document.body);
    m.floating.setAttribute('dir', 'rtl');
    return { reference, ...m };
  },
  overflowParent() {
    const host = div(
      document.body,
      'position:absolute;left:300px;top:200px;width:400px;height:300px;overflow:auto'
    );
    const inner = div(host, 'position:relative;height:1200px;width:900px');
    const reference = div(inner, REF + abs(140, 300));
    host.scrollTop = 200;
    return { reference, ...mkFloating(document.body) };
  },
  overflowParentBoth() {
    const host = div(
      document.body,
      'position:absolute;left:300px;top:200px;width:400px;height:300px;overflow:auto;border:5px solid red'
    );
    const inner = div(host, 'position:relative;height:1200px;width:900px');
    const reference = div(inner, REF + abs(140, 300));
    host.scrollTop = 200;
    host.scrollLeft = 50;
    return { reference, ...mkFloating(inner) };
  },
  overflowStaticWrapperEscaped() {
    const host = div(
      document.body,
      'overflow:hidden;width:300px;height:200px;margin:150px 0 0 300px'
    );
    const reference = div(host, REF);
    return { reference, ...mkFloating(host) };
  },
  overflowPositionedWrapperClips() {
    const host = div(
      document.body,
      'position:relative;overflow:hidden;width:300px;height:200px;margin:150px 0 0 300px'
    );
    const reference = div(host, REF);
    return { reference, ...mkFloating(host) };
  },
  overflowFixedEscapes() {
    const host = div(
      document.body,
      'overflow:hidden;width:300px;height:200px;margin:150px 0 0 300px;position:relative'
    );
    const reference = div(host, REF);
    return {
      reference,
      ...mkFloating(host, 'position:fixed;'),
      fixedOnly: true
    };
  },
  overflowFixedInTransformClips() {
    const host = div(
      document.body,
      'overflow:hidden;width:300px;height:200px;margin:150px 0 0 300px;transform:translateX(5px)'
    );
    const reference = div(host, REF);
    return {
      reference,
      ...mkFloating(host, 'position:fixed;'),
      fixedOnly: true
    };
  },
  overflowNested() {
    const a = div(
      document.body,
      'position:relative;overflow:hidden;width:500px;height:400px;margin:50px'
    );
    const b = div(
      a,
      'position:relative;overflow:auto;width:300px;height:500px;margin:20px'
    );
    const reference = div(b, REF + 'margin:100px');
    return { reference, ...mkFloating(b) };
  },
  htmlMarginOverflowParent() {
    document.documentElement.style.margin = '11px';
    const host = div(
      document.body,
      'position:relative;overflow:hidden;width:300px;height:200px;margin:150px 0 0 300px'
    );
    const reference = div(host, REF);
    return { reference, ...mkFloating(host) };
  },
  htmlMarginTransformed() {
    document.documentElement.style.margin = '11px';
    const c = div(
      document.body,
      BOX + 'transform:translate(10px,10px);overflow:hidden'
    );
    const reference = div(c, REF + abs(140, 130));
    return { reference, ...mkFloating(c) };
  },
  overflowInline() {
    const host = div(document.body, 'display:inline;overflow:hidden');
    const reference = div(host, REF + 'margin:100px');
    return { reference, ...mkFloating(host) };
  },
  overflowContents() {
    const host = div(document.body, 'display:contents;overflow:hidden');
    const reference = div(host, REF + 'margin:100px');
    return { reference, ...mkFloating(host) };
  },
  bodyOverflowOwnScroller() {
    document.documentElement.style.cssText = 'height:100%;overflow:hidden';
    document.body.style.cssText = 'height:100%;overflow:auto;margin:0';
    div(document.body, 'height:3000px');
    const reference = div(document.body, REF + abs(300, 900));
    const r = { reference, ...mkFloating(document.body) };
    document.body.scrollTop = 600;
    return r;
  },
  bodyOverflowPropagated() {
    document.documentElement.style.cssText = 'height:100%';
    document.body.style.cssText = 'height:100%;overflow:auto;margin:0';
    div(document.body, 'height:3000px');
    const reference = div(document.body, REF + abs(300, 900));
    const r = { reference, ...mkFloating(document.body) };
    window.scrollTo(0, 600);
    return r;
  },
  htmlOverflowHidden() {
    document.documentElement.style.cssText = 'overflow:hidden';
    bigPage();
    const reference = div(document.body, REF + abs(300, 300));
    return { reference, ...mkFloating(document.body) };
  },
  transformedContainer() {
    const c = div(document.body, BOX + 'transform:translate(10px,10px)');
    const reference = div(document.body, CENTER);
    return { reference, ...mkFloating(c) };
  },
  scaledContainer() {
    const c = div(
      document.body,
      BOX + 'transform:scale(0.5);transform-origin:0 0'
    );
    const reference = div(document.body, CENTER);
    return { reference, ...mkFloating(c) };
  },
  scaledBorderedContainer() {
    const c = div(
      document.body,
      BOX + 'transform:scale(0.5);transform-origin:0 0;border:4px solid red'
    );
    const reference = div(document.body, CENTER);
    return { reference, ...mkFloating(c) };
  },
  scaledNonUniformBoth() {
    const c = div(
      document.body,
      BOX + 'transform:scale(1.5,0.75);transform-origin:0 0'
    );
    const reference = div(c, REF + abs(140, 130));
    return { reference, ...mkFloating(c) };
  },
  scaleProperty() {
    const c = div(document.body, BOX + 'scale:0.7;transform-origin:0 0');
    const reference = div(c, REF + abs(140, 130));
    return { reference, ...mkFloating(c) };
  },
  zoomedContainer() {
    const c = div(document.body, BOX + 'zoom:1.5');
    const reference = div(c, REF + abs(140, 130));
    return { reference, ...mkFloating(c) };
  },
  fixedTarget() {
    bigPage();
    const reference = div(
      document.body,
      REF + 'position:fixed;left:440px;top:330px'
    );
    const r = { reference, ...mkFloating(document.body) };
    window.scrollTo(0, 250);
    return r;
  },
  fixedInFilter() {
    const c = div(document.body, BOX + 'filter:blur(0)');
    const reference = div(c, REF + abs(140, 130));
    return { reference, ...mkFloating(c, 'position:fixed;'), fixedOnly: true };
  },
  fixedInWillChange() {
    const c = div(document.body, BOX + 'will-change:transform');
    const reference = div(c, REF + abs(140, 130));
    return { reference, ...mkFloating(c, 'position:fixed;'), fixedOnly: true };
  },
  fixedInContainPaint() {
    const c = div(document.body, BOX + 'contain:paint');
    const reference = div(c, REF + abs(140, 130));
    return { reference, ...mkFloating(c, 'position:fixed;'), fixedOnly: true };
  },
  fixedInPerspective() {
    const c = div(document.body, BOX + 'perspective:100px');
    const reference = div(c, REF + abs(140, 130));
    return { reference, ...mkFloating(c, 'position:fixed;'), fixedOnly: true };
  },
  fixedInBackdrop() {
    const c = div(document.body, BOX + 'backdrop-filter:blur(1px)');
    const reference = div(c, REF + abs(140, 130));
    return { reference, ...mkFloating(c, 'position:fixed;'), fixedOnly: true };
  },
  staticTd() {
    const t = div(
      document.body,
      'margin:150px 0 0 300px;border-collapse:collapse',
      'table'
    );
    const tr = div(t, '', 'tr');
    const td = div(
      tr,
      'width:300px;height:200px;padding:5px;position:static',
      'td'
    );
    const reference = div(td, REF);
    return { reference, ...mkFloating(td) };
  },
  positionedTd() {
    const t = div(document.body, 'margin:150px 0 0 300px;', 'table');
    const tr = div(t, '', 'tr');
    const td = div(
      tr,
      'width:300px;height:200px;padding:5px;position:relative',
      'td'
    );
    const reference = div(td, REF);
    return { reference, ...mkFloating(td) };
  },
  staticTdInPositioned() {
    const wrap = div(document.body, 'position:relative;margin:100px');
    const t = div(wrap, '', 'table');
    const tr = div(t, '', 'tr');
    const td = div(tr, 'width:300px;height:200px', 'td');
    const reference = div(td, REF);
    return { reference, ...mkFloating(td) };
  },
  staticFloatingInTd() {
    const wrap = div(document.body, 'position:relative;margin:100px');
    const t = div(wrap, '', 'table');
    const tr = div(t, '', 'tr');
    const td = div(tr, 'width:300px;height:200px', 'td');
    const reference = div(td, REF);
    const m = mkFloating(td, 'position:static;');
    return { reference, ...m, keepPosition: true };
  },
  staticFloatingInBody() {
    const reference = div(document.body, CENTER);
    const m = mkFloating(document.body, 'position:static;');
    return { reference, ...m, keepPosition: true };
  },
  svgReference() {
    const s = svgEl('svg', { width: 400, height: 300 });
    s.style.cssText = abs(300, 200);
    document.body.appendChild(s);
    const r = svgEl('rect', { x: 50, y: 60, width: 100, height: 40 });
    s.appendChild(r);
    return { reference: r, ...mkFloating(document.body) };
  },
  svgArrow() {
    const reference = div(document.body, CENTER);
    const m = mkFloating(document.body);
    const s = svgEl('svg', { width: 16, height: 16, class: 'shepherd-arrow' });
    s.style.cssText = 'position:absolute';
    m.floating.appendChild(s);
    m.arrow.remove();
    m.arrow = s;
    return { reference, ...m };
  },
  svgArrowNested() {
    const reference = div(document.body, CENTER);
    const m = mkFloating(document.body);
    const wrap = div(
      m.floating,
      'position:absolute;left:0;top:0;width:100px;height:50px'
    );
    const s = svgEl('svg', { width: 16, height: 16, class: 'shepherd-arrow' });
    s.style.cssText = 'position:absolute';
    wrap.appendChild(s);
    m.arrow.remove();
    m.arrow = s;
    return { reference, ...m };
  },
  shadowReference() {
    const h = div(document.body, abs(300, 200));
    const root = h.attachShadow({ mode: 'open' });
    const scroller = document.createElement('div');
    scroller.style.cssText =
      'overflow:auto;width:300px;height:200px;position:relative';
    root.appendChild(scroller);
    const inner = div(scroller, 'height:800px');
    const reference = div(inner, REF + 'margin-top:150px');
    scroller.scrollTop = 100;
    return { reference, ...mkFloating(document.body) };
  },
  shadowFloating() {
    const h = div(document.body, abs(300, 200) + 'width:300px;height:200px');
    const root = h.attachShadow({ mode: 'open' });
    const reference = div(document.body, CENTER);
    const wrap = document.createElement('div');
    wrap.style.cssText =
      'position:relative;overflow:hidden;width:300px;height:200px';
    root.appendChild(wrap);
    return { reference, ...mkFloating(wrap) };
  },
  slotted() {
    const h = div(document.body, abs(300, 200));
    const root = h.attachShadow({ mode: 'open' });
    const wrap = document.createElement('div');
    wrap.style.cssText =
      'overflow:hidden;position:relative;width:400px;height:300px';
    wrap.appendChild(document.createElement('slot'));
    root.appendChild(wrap);
    const reference = div(h, REF + 'margin:60px');
    return { reference, ...mkFloating(h) };
  },
  popoverFloating() {
    const reference = div(document.body, CENTER);
    const m = mkFloating(document.body, 'margin:0;inset:auto;');
    if (!m.floating.showPopover) return null;
    m.floating.setAttribute('popover', 'manual');
    m.floating.showPopover();
    return { reference, ...m };
  },
  popoverInTransform() {
    const c = div(
      document.body,
      BOX + 'transform:translate(10px,10px);overflow:hidden'
    );
    const reference = div(c, REF + abs(140, 130));
    const m = mkFloating(c, 'margin:0;inset:auto;');
    if (!m.floating.showPopover) return null;
    m.floating.setAttribute('popover', 'manual');
    m.floating.showPopover();
    return { reference, ...m };
  },
  dialogModalFloating() {
    const reference = div(document.body, CENTER);
    const d = document.createElement('dialog');
    d.style.cssText = FLOAT + 'margin:0;padding:0;border:0;';
    const a = div(d, ARROW);
    a.className = 'shepherd-arrow';
    document.body.appendChild(d);
    d.showModal();
    return { reference, floating: d, arrow: a, closeDialog: d };
  },
  floatingInModalDialog() {
    const d = document.createElement('dialog');
    d.style.cssText = 'width:500px;height:400px;';
    document.body.appendChild(d);
    d.showModal();
    const reference = div(d, REF + 'margin:50px');
    return { reference, ...mkFloating(d), closeDialog: d };
  },
  fixedFloatingInModalInTransform() {
    const w = div(
      document.body,
      'transform:translate(10px,10px);' +
        abs(30, 30) +
        'width:100px;height:100px'
    );
    const d = document.createElement('dialog');
    d.style.cssText = 'width:500px;height:400px;';
    w.appendChild(d);
    d.showModal();
    const reference = div(d, REF + 'margin:50px');
    return {
      reference,
      ...mkFloating(d, 'position:fixed;'),
      closeDialog: d,
      fixedOnly: true
    };
  },
  dialogNonModal() {
    const d = document.createElement('dialog');
    d.style.cssText = FLOAT + 'margin:0;padding:0;border:0;';
    const a = div(d, ARROW);
    a.className = 'shepherd-arrow';
    document.body.appendChild(d);
    d.show();
    const reference = div(document.body, CENTER);
    return { reference, floating: d, arrow: a };
  },
  classicScrollbar() {
    classicBar();
    document.documentElement.style.overflowY = 'scroll';
    div(document.body, 'height:3000px');
    const reference = div(document.body, REF + abs(880, 330));
    return { reference, ...mkFloating(document.body) };
  },
  classicScrollbarRtl() {
    classicBar();
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.style.overflowY = 'scroll';
    div(document.body, 'height:3000px');
    const reference = div(document.body, REF + abs(0, 330));
    return { reference, ...mkFloating(document.body) };
  },
  scrollbarGutter() {
    classicBar();
    document.documentElement.style.cssText =
      'scrollbar-gutter:stable;overflow-y:auto';
    const reference = div(document.body, REF + abs(880, 200));
    return { reference, ...mkFloating(document.body) };
  },
  scrollbarGutterBoth() {
    classicBar();
    document.documentElement.style.cssText =
      'scrollbar-gutter:stable both-edges;overflow-y:auto';
    const reference = div(document.body, REF + abs(880, 200));
    return { reference, ...mkFloating(document.body) };
  },
  bodyNarrowerThanHtml() {
    document.body.style.cssText = 'margin:0;width:calc(100% - 20px)';
    div(document.body, 'position:relative;width:100%;height:3000px');
    const reference = div(document.body, REF + abs(880, 330));
    return { reference, ...mkFloating(document.body) };
  },
  gutterHidden() {
    classicBar();
    document.documentElement.style.cssText =
      'overflow:hidden;scrollbar-gutter:stable';
    const reference = div(document.body, REF + abs(880, 200));
    return { reference, ...mkFloating(document.body) };
  },
  gutterHiddenBoth() {
    classicBar();
    document.documentElement.style.cssText =
      'overflow:hidden;scrollbar-gutter:stable both-edges';
    const reference = div(document.body, REF + abs(880, 200));
    return { reference, ...mkFloating(document.body) };
  },
  gutterStable() {
    document.documentElement.style.scrollbarGutter = 'stable';
    const reference = div(
      document.body,
      REF + 'position:absolute;right:0;top:330px'
    );
    return { reference, ...mkFloating(document.body) };
  },
  gutterBoth() {
    document.documentElement.style.scrollbarGutter = 'stable both-edges';
    const reference = div(
      document.body,
      REF + 'position:absolute;right:0;top:330px'
    );
    return { reference, ...mkFloating(document.body) };
  },
  scrollbars() {
    bigPage();
    div(document.body, 'width:3000px;height:1px');
    const reference = div(document.body, REF + abs(0, 330));
    return { reference, ...mkFloating(document.body) };
  },
  stickyReference() {
    bigPage();
    const w = div(document.body, 'position:relative;height:2000px;width:100%');
    const reference = div(
      w,
      REF + 'position:sticky;top:10px;margin-left:300px'
    );
    const r = { reference, ...mkFloating(document.body) };
    window.scrollTo(0, 400);
    return r;
  },
  zeroSizeReference() {
    const reference = div(document.body, abs(440, 330) + 'width:0;height:0');
    return { reference, ...mkFloating(document.body) };
  },
  hiddenReference() {
    const reference = div(document.body, REF + 'display:none');
    return { reference, ...mkFloating(document.body) };
  },
  hiddenFloating() {
    const reference = div(document.body, CENTER);
    return { reference, ...mkFloating(document.body, 'display:none;') };
  },
  detachedReference() {
    const reference = document.createElement('div');
    return { reference, ...mkFloating(document.body) };
  },
  tinyReference() {
    const reference = div(
      document.body,
      abs(440, 330) + 'width:6px;height:6px;background:#000'
    );
    return { reference, ...mkFloating(document.body) };
  },
  hugeReference() {
    const reference = div(
      document.body,
      abs(10, 10) + 'width:900px;height:600px;background:#000'
    );
    return { reference, ...mkFloating(document.body) };
  },
  bodyAsReference() {
    return { reference: document.body, ...mkFloating(document.body) };
  },
  floatingInFlowRelative() {
    const c = div(
      document.body,
      'position:relative;border:6px solid red;padding:10px;margin:60px;width:600px;height:400px'
    );
    const reference = div(c, REF + 'margin:100px');
    return { reference, ...mkFloating(c) };
  },
  iframeReference() {
    const fr = document.createElement('iframe');
    fr.style.cssText =
      abs(100, 80) +
      'width:600px;height:400px;border:9px solid red;padding:6px;';
    document.body.appendChild(fr);
    const d = fr.contentDocument;
    d.body.style.margin = '0';
    const reference = div(d.body, REF + abs(200, 150));
    return { reference, ...mkFloating(document.body) };
  },
  iframeScaled() {
    const fr = document.createElement('iframe');
    fr.style.cssText =
      abs(100, 80) +
      'width:600px;height:400px;border:0;transform:scale(0.5);transform-origin:0 0';
    document.body.appendChild(fr);
    const d = fr.contentDocument;
    d.body.style.margin = '0';
    const reference = div(d.body, REF + abs(200, 150));
    return { reference, ...mkFloating(document.body) };
  },
  iframeNested() {
    const fr = document.createElement('iframe');
    fr.style.cssText =
      abs(50, 40) + 'width:800px;height:600px;border:3px solid red;';
    document.body.appendChild(fr);
    const d = fr.contentDocument;
    d.body.style.margin = '0';
    const fr2 = d.createElement('iframe');
    fr2.style.cssText =
      abs(60, 50) + 'width:500px;height:400px;border:5px solid blue;';
    d.body.appendChild(fr2);
    const d2 = fr2.contentDocument;
    d2.body.style.margin = '0';
    const reference = div(d2.body, REF + abs(100, 80));
    return { reference, ...mkFloating(document.body) };
  },
  iframeBothInside() {
    const fr = document.createElement('iframe');
    fr.style.cssText = abs(100, 80) + 'width:700px;height:500px;border:0;';
    document.body.appendChild(fr);
    const d = fr.contentDocument;
    d.body.style.margin = '0';
    const reference = div(d.body, REF + abs(200, 150));
    const m = mkFloating(d.body);
    return { reference, ...m };
  },
  iframeScrolledReference() {
    const fr = document.createElement('iframe');
    fr.style.cssText = abs(100, 80) + 'width:600px;height:400px;border:0;';
    document.body.appendChild(fr);
    const d = fr.contentDocument;
    d.body.style.margin = '0';
    div(d.body, 'height:3000px');
    const reference = div(d.body, REF + abs(200, 850));
    fr.contentWindow.scrollTo(0, 700);
    return { reference, ...mkFloating(document.body) };
  }
};

// What getPositionConfig() builds, in stock middleware.
window.stockOptions = function (FUI, on, arrowEl, strategy, position) {
  const { offset, padding, flip = true } = position;
  const hasAuto = on.includes('auto');
  const edge = on.includes('-start') || on.includes('-end');
  const middleware = [];
  if (offset) middleware.push(FUI.offset(offset));
  if (hasAuto) {
    middleware.push(
      FUI.autoPlacement({
        crossAxis: true,
        alignment: edge ? on.split('-').pop() : null,
        padding
      })
    );
  } else if (flip) {
    middleware.push(FUI.flip({ padding }));
  }
  middleware.push(
    FUI.shift({ limiter: FUI.limitShift(), crossAxis: true, padding })
  );
  middleware.push(FUI.arrow({ element: arrowEl, padding: edge ? 4 : 0 }));
  return { strategy, placement: hasAuto ? undefined : on, middleware };
};

// Each `positionOptions` a consumer can pass, other than `strategy`, which
// every fixture runs both ways.
window.POSITION_CONFIGS = {
  none: {},
  offset: { offset: 12 },
  offsetCross: { offset: { mainAxis: 4, crossAxis: 8 } },
  padding: { padding: 24 },
  noFlip: { flip: false },
  combined: { offset: 8, padding: 12, flip: false }
};
