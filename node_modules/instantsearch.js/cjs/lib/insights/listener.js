"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _insights = require("../../helpers/insights");

/** @jsx h */
var findInsightsTarget = function findInsightsTarget(startElement, endElement) {
  var element = startElement;

  while (element && !(0, _insights.hasDataAttributes)(element)) {
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

      var _readDataAttributes = (0, _insights.readDataAttributes)(insightsTarget),
          method = _readDataAttributes.method,
          payload = _readDataAttributes.payload;

      props.insights(method, payload);
    };

    return (0, _preact.h)("div", {
      onClick: handleClick
    }, (0, _preact.h)(BaseComponent, props));
  }

  return WithInsightsListener;
};

var _default = insightsListener;
exports.default = _default;