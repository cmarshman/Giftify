/** @jsx h */
import { h } from 'preact';
import { readDataAttributes, hasDataAttributes } from '../../helpers/insights';

var findInsightsTarget = function findInsightsTarget(startElement, endElement) {
  var element = startElement;

  while (element && !hasDataAttributes(element)) {
    if (element === endElement) {
      return null;
    }

    element = element.parentElement;
  }

  return element;
};

var insightsListener = function insightsListener(BaseComponent) {
  function WithInsightsListener(props) {
    var handleClick = function handleClick(event) {
      var insightsTarget = findInsightsTarget(event.target, event.currentTarget);
      if (!insightsTarget) return;

      var _readDataAttributes = readDataAttributes(insightsTarget),
          method = _readDataAttributes.method,
          payload = _readDataAttributes.payload;

      props.insights(method, payload);
    };

    return h("div", {
      onClick: handleClick
    }, h(BaseComponent, props));
  }

  return WithInsightsListener;
};

export default insightsListener;