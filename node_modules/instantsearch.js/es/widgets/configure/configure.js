import connectConfigure from '../../connectors/configure/connectConfigure';

var configure = function configure(widgetParams) {
  // This is a renderless widget that falls back to the connector's
  // noop render and unmount functions.
  var makeWidget = connectConfigure();
  return makeWidget({
    searchParameters: widgetParams
  });
};

export default configure;