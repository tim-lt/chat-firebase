// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';

const state = new WeakMap();

Vue.directive('dragscroll', {
  bind(el, binding) {
    let isDrag = false;
    let x = 0;
    let scrollLeft = 0;
    let onMouseMove;

    const mouseDown = (e) => {
      isDrag = true;
      x = e.pageX;
      ({ scrollLeft } = el);
      e.preventDefault();
    };
    const mouseMove = (e) => {
      if (isDrag) {
        // eslint-disable-next-line no-param-reassign
        el.scrollLeft = scrollLeft - (e.pageX - x);
        if (onMouseMove) onMouseMove();
      }
    };
    const mouseUp = () => {
      isDrag = false;
    };
    state.set(el, {
      mouseMove,
      mouseUp,
    });

    ({ onMouseMove } = binding.value || {});
    // eslint-disable-next-line no-param-reassign
    el.onmousedown = mouseDown;
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  },
  unbind(el) {
    const { mouseMove, mouseUp } = state.get(el);
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
    state.delete(el);
  },
});
