

function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var DisplayEditor = function (props) {
    var handleDivClick = function (event, path) {
        event.preventDefault();
        event.stopPropagation();
        var curKeyValue = props.json;
        for (var i = 0; i < path.length - 1; i++) {
            var level = path[i];
            curKeyValue = curKeyValue[level];
        }
        var lastPath = path[path.length - 1];
        console.log({ lastPath: lastPath, value: curKeyValue[lastPath] });
    };
    return (React__default['default'].createElement("div", { onClick: function (event) { return handleDivClick(event, props.path); }, className: props.className }, props.children));
};

var JsonEditor = function (json) {
    var _a = React.useState(json), curJson = _a[0], setCurJson = _a[1];
    var keyFormat = function (key) { return "\"" + key + "\""; };
    var formatJSON = function (json, path) {
        var keys = Object.keys(json);
        var nodeArray = [];
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var jsonValue = json[key];
            var curPath = path.concat(key);
            if (Array.isArray(jsonValue)) {
                var arrValue = jsonValue;
                var arrNodeArray = [];
                for (var j = 0; j < arrValue.length; j++) {
                    var curPath_1 = path.concat(key, j);
                    var subArr = arrValue[j];
                    arrNodeArray.push(React__default['default'].createElement(DisplayEditor, { json: curJson, path: curPath_1, type: "object" },
                        "{ ",
                        formatJSON(subArr, curPath_1),
                        " } ",
                        j < arrValue.length - 1 ? ',' : ''));
                }
                nodeArray.push(React__default['default'].createElement(DisplayEditor, { json: curJson, path: curPath, type: "array" },
                    "[-] ",
                    keyFormat(key),
                    ": [ ",
                    arrNodeArray,
                    " ]"));
            }
            else {
                switch (typeof jsonValue) {
                    case 'string':
                        nodeArray.push(React__default['default'].createElement(DisplayEditor, { json: curJson, path: curPath, type: "string" },
                            keyFormat(key),
                            ": ",
                            React__default['default'].createElement("span", { className: "json-editor-string" },
                                "\"",
                                jsonValue,
                                "\""),
                            " ",
                            i < keys.length - 1 ? ',' : ''));
                        break;
                    case 'number':
                        nodeArray.push(React__default['default'].createElement(DisplayEditor, { json: curJson, path: curPath, type: "number" },
                            keyFormat(key),
                            ": ",
                            React__default['default'].createElement("span", { className: "json-editor-number" }, jsonValue),
                            " ",
                            i < keys.length - 1 ? ',' : ''));
                        break;
                    case 'boolean':
                        var boolDisplay = function (jsonValue) { return React__default['default'].createElement("span", { className: "json-editor-bool-" + jsonValue }, jsonValue.toString()); };
                        nodeArray.push(React__default['default'].createElement(DisplayEditor, { json: curJson, path: curPath, type: "boolean" },
                            keyFormat(key),
                            ": ",
                            boolDisplay(jsonValue),
                            " ",
                            i < keys.length - 1 ? ',' : ''));
                        break;
                    default:
                        nodeArray.push(React__default['default'].createElement(DisplayEditor, { json: curJson, path: curPath, type: "object" },
                            keyFormat(key),
                            ": { ",
                            formatJSON(jsonValue, curPath),
                            " }",
                            ' ',
                            i < keys.length - 1 ? ',' : ''));
                        break;
                }
            }
        }
        return nodeArray;
    };
    return React__default['default'].createElement("div", { className: 'json-editor' }, curJson && formatJSON(curJson, []));
};

exports.JsonEditor = JsonEditor;
//# sourceMappingURL=index.js.map
