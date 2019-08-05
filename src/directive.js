import Vue from "vue";
import Tooltip from "./Tooltip.vue";

const MyTooltip = Vue.extend(Tooltip);

const tooltipDirective = {};
tooltipDirective.install = Vue => {
  Vue.directive("tooltip", {
    bind: function(el, binding, vnode) {
      const textExr = analyzeText(el, binding);

      if (!textExr) return;

      const { placement , size } = analyzeModifiers(el, binding);

      const vm = vnode.context;
      const tooltip = new MyTooltip({
        el: document.createElement("span"),
        data: {
          text: (vm && vm[textExr]) || textExr
        }
      });

      el.instance = tooltip;
      el.tooltip = tooltip.$el;
      addEvents(el, binding, placement, size);
    },
    update: function(el, binding, vnode) {
      const vm = vnode.context;
      const textExr = analyzeText(el, binding);

      try {
        el.instance.text = (vm && vm[textExr]) || textExr;
      } catch (e) {
        //error no informativo
      }
    }
  });

  const analyzeModifiers = (el, binding) => {
    const POSITIONS = ["top", "left", "right", "bottom"];
    const SIZES = ["xl", "lg", "md", "sm", "xs"];
    const COLOR = ["light", "dark"];
    let placement = "bottom";
    let color = "dark";
    let size = "md";
    for (const item in binding.modifiers) {
      if (POSITIONS.includes(item)) {
        placement = item;
      }
      if (SIZES.includes(item)) {
        size = item;
      }
      if (COLOR.includes(item)) {
        color = item;
      }
    }

    return {
      placement,
      size,
      color
    };
  };

  const analyzeText = (el, binding) => {
    const value = binding.value;
    const title = el.getAttribute("title");

    let textExr = "";
    if (!value) {
      const hasTitle = title && typeof title === "string";
      if (!hasTitle) return false;

      textExr = title;
    } else {
      textExr = value;
    }

    return textExr;
  };

  const addEvents = (el, binding, placement, size) => {
    const addTooltip = () => {
      document.body.appendChild(el.tooltip);
      var rect = el.getBoundingClientRect();
      
      el.instance.visible = true;
      el.instance.position = "t-" + placement;
      el.instance.size = 't-'+size;
      el.instance.top = rect.top;
      el.instance.left = rect.left;
      el.instance.width = el.offsetWidth;
      el.instance.height = el.offsetHeight;
    };

    const hideTooltip = () => {
      el.instance.visible = false;
    };

    el.addEventListener("mouseenter", addTooltip, false);
    el.addEventListener("mouseleave", hideTooltip, false);
  };
};

export default tooltipDirective;
