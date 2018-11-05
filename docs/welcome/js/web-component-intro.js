let myElement = document.querySelector('web-component-intro');

let shadow = myElement.attachShadow({
  mode: 'open'
});
shadow.innerHTML = `
  <style>
    /* Cut and pasted styles to get a consistent look */
    h3 {
      font-size: 1.3em;
      padding-top: 13px;
      color: #ffffff;
      font-weight: normal;
      line-height: 1;
      margin: 0 0 20px;
    }
    pre {
      background: rgba(0, 0, 0, .1);
      margin: .5em 0;
      overflow: auto;
      font-size: 14px;
      color: #b3eecf;
      font-family: Consolas, Monaco, 'Andale Mono', monospace;
      direction: ltr;
      text-align: left;
      white-space: pre;
      word-spacing: normal;
      -moz-tab-size: 4;
      -o-tab-size: 4;
      tab-size: 4;
      -webkit-hyphens: none;
      -moz-hyphens: none;
      -ms-hyphens: none;
      hyphens: none;
      border: 1px solid rgba(0, 0, 0, 0.15);
      line-height: 1.4em;
    }
  </style>

  <h3>New: Web Component/Shadow DOM Support</h3>
  <pre id="" class=" ">
    <code id="shadow-dom-example-step-code">
  tour.addStep('example-attach-to-shadow-dom', {
    title: 'Example Attaching Step to Shadow Dom',
    text: 'You can easily attach to shadow DOM inside a web component using an array of selectors.',
    attachTo: {element: ['#example-web-component', '#shadow-dom-example-step-code'], on: 'top'},
    buttons: [
      {
        action: shepherd.next,
        text: 'Next'
      }
    ]
  });
  </pre>
`;
