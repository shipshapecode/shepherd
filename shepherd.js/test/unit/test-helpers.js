import { mount, unmount } from 'svelte';

export function renderComponent(Component, options = {}) {
  const { props = {}, target } = options;

  const container = target || document.createElement('div');
  document.body.appendChild(container);

  let component;
  try {
    component = mount(Component, {
      target: container,
      props
    });
  } catch (error) {
    console.error('Error mounting component:', error);
    throw error;
  }

  return {
    container,
    component,
    unmount: () => {
      if (component) {
        unmount(component);
      }
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    },
    rerender: (newProps) => {
      Object.assign(component, newProps);
    }
  };
}
