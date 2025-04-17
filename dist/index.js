"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var index_exports = {};
__export(index_exports, {
  ActivityObjectType: () => ActivityObjectType,
  ActivityOwnerType: () => ActivityOwnerType,
  BackgroundActionInfoNameEnum: () => BackgroundActionInfoNameEnum,
  Configuration: () => Configuration,
  ControlBackgroundActionNameEnum: () => ControlBackgroundActionNameEnum,
  IdmWorkspaceScope: () => IdmWorkspaceScope,
  JobsCommand: () => JobsCommand,
  JobsTaskStatus: () => JobsTaskStatus,
  ListNamespaceValuesOperationOperationEnum: () => ListNamespaceValuesOperationOperationEnum,
  LookupFilterMetaFilterOp: () => LookupFilterMetaFilterOp,
  LookupFilterTextSearchIn: () => LookupFilterTextSearchIn,
  NodeServiceApi: () => NodeServiceApi,
  NodeServiceApiAxiosParamCreator: () => NodeServiceApiAxiosParamCreator,
  NodeServiceApiFactory: () => NodeServiceApiFactory,
  NodeServiceApiFp: () => NodeServiceApiFp,
  PerformActionNameEnum: () => PerformActionNameEnum,
  RestActionStatus: () => RestActionStatus,
  RestFlag: () => RestFlag,
  RestMetaUpdateOp: () => RestMetaUpdateOp,
  RestMode: () => RestMode,
  RestNsOp: () => RestNsOp,
  RestShareLinkAccessType: () => RestShareLinkAccessType,
  RestUserActionType: () => RestUserActionType,
  RestVersionsTypes: () => RestVersionsTypes,
  ServiceResourcePolicyAction: () => ServiceResourcePolicyAction,
  ServiceResourcePolicyPolicyEffect: () => ServiceResourcePolicyPolicyEffect,
  StatusFilterDeletedStatus: () => StatusFilterDeletedStatus,
  TreeNodeChangeEventEventType: () => TreeNodeChangeEventEventType,
  TreeNodeType: () => TreeNodeType
});
module.exports = __toCommonJS(index_exports);

// api/node-service-api.ts
var import_axios2 = __toESM(require("axios"));

// base.ts
var import_axios = __toESM(require("axios"));
var BASE_PATH = "http://localhost".replace(/\/+$/, "");
var BaseAPI = class {
  constructor(configuration, basePath = BASE_PATH, axios = import_axios.default) {
    this.basePath = basePath;
    this.axios = axios;
    var _a;
    if (configuration) {
      this.configuration = configuration;
      this.basePath = (_a = configuration.basePath) != null ? _a : basePath;
    }
  }
};
var RequiredError = class extends Error {
  constructor(field, msg) {
    super(msg);
    this.field = field;
    this.name = "RequiredError";
  }
};
var operationServerMap = {};

// common.ts
var DUMMY_BASE_URL = "https://example.com";
var assertParamExists = function(functionName, paramName, paramValue) {
  if (paramValue === null || paramValue === void 0) {
    throw new RequiredError(paramName, `Required parameter ${paramName} was null or undefined when calling ${functionName}.`);
  }
};
var setApiKeyToObject = async function(object, keyParamName, configuration) {
  if (configuration && configuration.apiKey) {
    const localVarApiKeyValue = typeof configuration.apiKey === "function" ? await configuration.apiKey(keyParamName) : await configuration.apiKey;
    object[keyParamName] = localVarApiKeyValue;
  }
};
function setFlattenedQueryParams(urlSearchParams, parameter, key = "") {
  if (parameter == null) return;
  if (typeof parameter === "object") {
    if (Array.isArray(parameter)) {
      parameter.forEach((item) => setFlattenedQueryParams(urlSearchParams, item, key));
    } else {
      Object.keys(parameter).forEach(
        (currentKey) => setFlattenedQueryParams(urlSearchParams, parameter[currentKey], `${key}${key !== "" ? "." : ""}${currentKey}`)
      );
    }
  } else {
    if (urlSearchParams.has(key)) {
      urlSearchParams.append(key, parameter);
    } else {
      urlSearchParams.set(key, parameter);
    }
  }
}
var setSearchParams = function(url, ...objects) {
  const searchParams = new URLSearchParams(url.search);
  setFlattenedQueryParams(searchParams, objects);
  url.search = searchParams.toString();
};
var serializeDataIfNeeded = function(value, requestOptions, configuration) {
  const nonString = typeof value !== "string";
  const needsSerialization = nonString && configuration && configuration.isJsonMime ? configuration.isJsonMime(requestOptions.headers["Content-Type"]) : nonString;
  return needsSerialization ? JSON.stringify(value !== void 0 ? value : {}) : value || "";
};
var toPathString = function(url) {
  return url.pathname + url.search + url.hash;
};
var createRequestFunction = function(axiosArgs, globalAxios3, BASE_PATH2, configuration) {
  return (axios = globalAxios3, basePath = BASE_PATH2) => {
    var _a;
    const axiosRequestArgs = __spreadProps(__spreadValues({}, axiosArgs.options), { url: (axios.defaults.baseURL ? "" : (_a = configuration == null ? void 0 : configuration.basePath) != null ? _a : basePath) + axiosArgs.url });
    return axios.request(axiosRequestArgs);
  };
};

// api/node-service-api.ts
var NodeServiceApiAxiosParamCreator = function(configuration) {
  return {
    /**
     * 
     * @summary Retrieve information about an action running in background
     * @param {BackgroundActionInfoNameEnum} name 
     * @param {string} jobUuid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    backgroundActionInfo: async (name, jobUuid, options = {}) => {
      assertParamExists("backgroundActionInfo", "name", name);
      assertParamExists("backgroundActionInfo", "jobUuid", jobUuid);
      const localVarPath = `/n/action/{Name}/{JobUuid}`.replace(`{${"Name"}}`, encodeURIComponent(String(name))).replace(`{${"JobUuid"}}`, encodeURIComponent(String(jobUuid)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = __spreadValues(__spreadValues({ method: "GET" }, baseOptions), options);
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = __spreadValues(__spreadValues(__spreadValues({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * 
     * @summary Update/delete user meta in batch. Passed UserMetas must contain a NodeUuid
     * @param {RestBatchUpdateMetaList} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    batchUpdateMeta: async (body, options = {}) => {
      assertParamExists("batchUpdateMeta", "body", body);
      const localVarPath = `/n/meta/batch`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = __spreadValues(__spreadValues({ method: "PATCH" }, baseOptions), options);
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = __spreadValues(__spreadValues(__spreadValues({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
      localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * 
     * @summary Send control commands to a background job
     * @param {ControlBackgroundActionNameEnum} name 
     * @param {string} jobUuid 
     * @param {JobsCtrlCommand} command 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    controlBackgroundAction: async (name, jobUuid, command, options = {}) => {
      assertParamExists("controlBackgroundAction", "name", name);
      assertParamExists("controlBackgroundAction", "jobUuid", jobUuid);
      assertParamExists("controlBackgroundAction", "command", command);
      const localVarPath = `/n/action/{Name}/{JobUuid}`.replace(`{${"Name"}}`, encodeURIComponent(String(name))).replace(`{${"JobUuid"}}`, encodeURIComponent(String(jobUuid)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = __spreadValues(__spreadValues({ method: "PATCH" }, baseOptions), options);
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = __spreadValues(__spreadValues(__spreadValues({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
      localVarRequestOptions.data = serializeDataIfNeeded(command, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * 
     * @summary Create one or many files (empty or hydrated from a TemplateUuid) or folders
     * @param {RestCreateRequest} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    create: async (body, options = {}) => {
      assertParamExists("create", "body", body);
      const localVarPath = `/n/nodes/create`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = __spreadValues(__spreadValues({ method: "POST" }, baseOptions), options);
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = __spreadValues(__spreadValues(__spreadValues({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
      localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * 
     * @summary Apply some pre-validation checks on node name before sending an upload
     * @param {RestCreateCheckRequest} body Request for pre-checking nodes before uploading or creating them.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createCheck: async (body, options = {}) => {
      assertParamExists("createCheck", "body", body);
      const localVarPath = `/n/nodes/create/precheck`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = __spreadValues(__spreadValues({ method: "POST" }, baseOptions), options);
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = __spreadValues(__spreadValues(__spreadValues({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
      localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * 
     * @summary Create a public link on a given node
     * @param {string} uuid 
     * @param {RestPublicLinkRequest} publicLinkRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createPublicLink: async (uuid, publicLinkRequest, options = {}) => {
      assertParamExists("createPublicLink", "uuid", uuid);
      assertParamExists("createPublicLink", "publicLinkRequest", publicLinkRequest);
      const localVarPath = `/n/node/{Uuid}/link`.replace(`{${"Uuid"}}`, encodeURIComponent(String(uuid)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = __spreadValues(__spreadValues({ method: "POST" }, baseOptions), options);
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = __spreadValues(__spreadValues(__spreadValues({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
      localVarRequestOptions.data = serializeDataIfNeeded(publicLinkRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * 
     * @summary Create and persist a temporary selection of nodes, that can be used by other actions
     * @param {RestSelection} body Request to create a selection from a list of nodes.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createSelection: async (body, options = {}) => {
      assertParamExists("createSelection", "body", body);
      const localVarPath = `/n/selection`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = __spreadValues(__spreadValues({ method: "POST" }, baseOptions), options);
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = __spreadValues(__spreadValues(__spreadValues({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
      localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * 
     * @summary Remove a public link
     * @param {string} linkUuid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deletePublicLink: async (linkUuid, options = {}) => {
      assertParamExists("deletePublicLink", "linkUuid", linkUuid);
      const localVarPath = `/n/link/{LinkUuid}`.replace(`{${"LinkUuid"}}`, encodeURIComponent(String(linkUuid)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = __spreadValues(__spreadValues({ method: "DELETE" }, baseOptions), options);
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = __spreadValues(__spreadValues(__spreadValues({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * 
     * @summary Delete a version by its ID
     * @param {string} uuid 
     * @param {string} versionId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteVersion: async (uuid, versionId, options = {}) => {
      assertParamExists("deleteVersion", "uuid", uuid);
      assertParamExists("deleteVersion", "versionId", versionId);
      const localVarPath = `/n/node/{Uuid}/versions/{VersionId}`.replace(`{${"Uuid"}}`, encodeURIComponent(String(uuid))).replace(`{${"VersionId"}}`, encodeURIComponent(String(versionId)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = __spreadValues(__spreadValues({ method: "DELETE" }, baseOptions), options);
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = __spreadValues(__spreadValues(__spreadValues({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * 
     * @summary Load a node by its Uuid
     * @param {string} uuid 
     * @param {string} [path] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getByUuid: async (uuid, path, options = {}) => {
      assertParamExists("getByUuid", "uuid", uuid);
      const localVarPath = `/n/node/{Uuid}`.replace(`{${"Uuid"}}`, encodeURIComponent(String(uuid)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = __spreadValues(__spreadValues({ method: "GET" }, baseOptions), options);
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);
      if (path !== void 0) {
        localVarQueryParameter["Path"] = path;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = __spreadValues(__spreadValues(__spreadValues({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * 
     * @summary Load public link information by Uuid
     * @param {string} linkUuid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getPublicLink: async (linkUuid, options = {}) => {
      assertParamExists("getPublicLink", "linkUuid", linkUuid);
      const localVarPath = `/n/link/{LinkUuid}`.replace(`{${"LinkUuid"}}`, encodeURIComponent(String(linkUuid)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = __spreadValues(__spreadValues({ method: "GET" }, baseOptions), options);
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = __spreadValues(__spreadValues(__spreadValues({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * 
     * @summary List values for a given namespace
     * @param {string} namespace List persisted values for this namespace
     * @param {ListNamespaceValuesOperationOperationEnum} operationOperation 
     * @param {Array<string>} operationValues 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listNamespaceValues: async (namespace, operationOperation, operationValues, options = {}) => {
      assertParamExists("listNamespaceValues", "namespace", namespace);
      assertParamExists("listNamespaceValues", "operationOperation", operationOperation);
      assertParamExists("listNamespaceValues", "operationValues", operationValues);
      const localVarPath = `/n/meta/namespace/{Namespace}`.replace(`{${"Namespace"}}`, encodeURIComponent(String(namespace)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = __spreadValues(__spreadValues({ method: "GET" }, baseOptions), options);
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);
      if (operationOperation !== void 0) {
        localVarQueryParameter["Operation.Operation"] = operationOperation;
      }
      if (operationValues) {
        localVarQueryParameter["Operation.Values"] = operationValues;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = __spreadValues(__spreadValues(__spreadValues({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * 
     * @summary List defined meta namespaces
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listNamespaces: async (options = {}) => {
      const localVarPath = `/n/meta/namespace`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = __spreadValues(__spreadValues({ method: "GET" }, baseOptions), options);
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = __spreadValues(__spreadValues(__spreadValues({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * 
     * @summary Generic request to either list (using Locators) or search (using Query) for nodes
     * @param {RestLookupRequest} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    lookup: async (body, options = {}) => {
      assertParamExists("lookup", "body", body);
      const localVarPath = `/n/nodes`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = __spreadValues(__spreadValues({ method: "POST" }, baseOptions), options);
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = __spreadValues(__spreadValues(__spreadValues({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
      localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * 
     * @summary List all known versions of a node
     * @param {string} uuid The node Uuid
     * @param {RestNodeVersionsFilter} query Additional parameters for filtering/sorting
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    nodeVersions: async (uuid, query, options = {}) => {
      assertParamExists("nodeVersions", "uuid", uuid);
      assertParamExists("nodeVersions", "query", query);
      const localVarPath = `/n/node/{Uuid}/versions`.replace(`{${"Uuid"}}`, encodeURIComponent(String(uuid)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = __spreadValues(__spreadValues({ method: "POST" }, baseOptions), options);
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = __spreadValues(__spreadValues(__spreadValues({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
      localVarRequestOptions.data = serializeDataIfNeeded(query, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * 
     * @summary Update a node specific meta. It is used for reserved meta as well (bookmarks, contentLock)
     * @param {string} uuid 
     * @param {RestNodeUpdates} nodeUpdates 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    patchNode: async (uuid, nodeUpdates, options = {}) => {
      assertParamExists("patchNode", "uuid", uuid);
      assertParamExists("patchNode", "nodeUpdates", nodeUpdates);
      const localVarPath = `/n/node/{Uuid}`.replace(`{${"Uuid"}}`, encodeURIComponent(String(uuid)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = __spreadValues(__spreadValues({ method: "PATCH" }, baseOptions), options);
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = __spreadValues(__spreadValues(__spreadValues({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
      localVarRequestOptions.data = serializeDataIfNeeded(nodeUpdates, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * 
     * @summary Trigger an action on the tree. Returns a JobInfo describing a background task.
     * @param {PerformActionNameEnum} name 
     * @param {RestActionParameters} parameters 
     * @param {string} [jobUuid] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    performAction: async (name, parameters, jobUuid, options = {}) => {
      assertParamExists("performAction", "name", name);
      assertParamExists("performAction", "parameters", parameters);
      const localVarPath = `/n/action/{Name}`.replace(`{${"Name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = __spreadValues(__spreadValues({ method: "POST" }, baseOptions), options);
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);
      if (jobUuid !== void 0) {
        localVarQueryParameter["JobUuid"] = jobUuid;
      }
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = __spreadValues(__spreadValues(__spreadValues({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
      localVarRequestOptions.data = serializeDataIfNeeded(parameters, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * 
     * @summary Promotes a version by ID to be the publicly available content of the node - files only
     * @param {string} uuid 
     * @param {string} versionId 
     * @param {RestPromoteParameters} parameters 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    promoteVersion: async (uuid, versionId, parameters, options = {}) => {
      assertParamExists("promoteVersion", "uuid", uuid);
      assertParamExists("promoteVersion", "versionId", versionId);
      assertParamExists("promoteVersion", "parameters", parameters);
      const localVarPath = `/n/node/{Uuid}/versions/{VersionId}/promote`.replace(`{${"Uuid"}}`, encodeURIComponent(String(uuid))).replace(`{${"VersionId"}}`, encodeURIComponent(String(versionId)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = __spreadValues(__spreadValues({ method: "POST" }, baseOptions), options);
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = __spreadValues(__spreadValues(__spreadValues({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
      localVarRequestOptions.data = serializeDataIfNeeded(parameters, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * 
     * @summary Unset draft status of a resource, typically to publish a folder in draft mode
     * @param {string} uuid 
     * @param {RestPublishNodeParameters} parameters 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    publishNode: async (uuid, parameters, options = {}) => {
      assertParamExists("publishNode", "uuid", uuid);
      assertParamExists("publishNode", "parameters", parameters);
      const localVarPath = `/n/node/{Uuid}/publish`.replace(`{${"Uuid"}}`, encodeURIComponent(String(uuid)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = __spreadValues(__spreadValues({ method: "POST" }, baseOptions), options);
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = __spreadValues(__spreadValues(__spreadValues({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
      localVarRequestOptions.data = serializeDataIfNeeded(parameters, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * 
     * @summary Search a list of meta by node Id or by User id and by namespace
     * @param {IdmSearchUserMetaRequest} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    searchMeta: async (body, options = {}) => {
      assertParamExists("searchMeta", "body", body);
      const localVarPath = `/n/meta/find`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = __spreadValues(__spreadValues({ method: "POST" }, baseOptions), options);
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = __spreadValues(__spreadValues(__spreadValues({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
      localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * 
     * @summary List available templates for hydrating empty files
     * @param {string} [templateType] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    templates: async (templateType, options = {}) => {
      const localVarPath = `/n/templates`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = __spreadValues(__spreadValues({ method: "GET" }, baseOptions), options);
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);
      if (templateType !== void 0) {
        localVarQueryParameter["TemplateType"] = templateType;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = __spreadValues(__spreadValues(__spreadValues({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * 
     * @summary Add/delete a values for a given namespace
     * @param {string} namespace List persisted values for this namespace
     * @param {RestNamespaceValuesOperation} operation 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateNamespaceValues: async (namespace, operation, options = {}) => {
      assertParamExists("updateNamespaceValues", "namespace", namespace);
      assertParamExists("updateNamespaceValues", "operation", operation);
      const localVarPath = `/n/meta/namespace/{Namespace}`.replace(`{${"Namespace"}}`, encodeURIComponent(String(namespace)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = __spreadValues(__spreadValues({ method: "PATCH" }, baseOptions), options);
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = __spreadValues(__spreadValues(__spreadValues({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
      localVarRequestOptions.data = serializeDataIfNeeded(operation, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * 
     * @summary Update public link settings
     * @param {string} linkUuid 
     * @param {RestPublicLinkRequest} publicLinkRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updatePublicLink: async (linkUuid, publicLinkRequest, options = {}) => {
      assertParamExists("updatePublicLink", "linkUuid", linkUuid);
      assertParamExists("updatePublicLink", "publicLinkRequest", publicLinkRequest);
      const localVarPath = `/n/link/{LinkUuid}`.replace(`{${"LinkUuid"}}`, encodeURIComponent(String(linkUuid)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = __spreadValues(__spreadValues({ method: "PATCH" }, baseOptions), options);
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = __spreadValues(__spreadValues(__spreadValues({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
      localVarRequestOptions.data = serializeDataIfNeeded(publicLinkRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * 
     * @summary Special API for Bookmarks, will load userMeta and the associated nodes, and return as a node list
     * @param {boolean} [all] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userBookmarks: async (all, options = {}) => {
      const localVarPath = `/n/nodes/bookmarks`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = __spreadValues(__spreadValues({ method: "GET" }, baseOptions), options);
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);
      if (all !== void 0) {
        localVarQueryParameter["All"] = all;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = __spreadValues(__spreadValues(__spreadValues({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var NodeServiceApiFp = function(configuration) {
  const localVarAxiosParamCreator = NodeServiceApiAxiosParamCreator(configuration);
  return {
    /**
     * 
     * @summary Retrieve information about an action running in background
     * @param {BackgroundActionInfoNameEnum} name 
     * @param {string} jobUuid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async backgroundActionInfo(name, jobUuid, options) {
      var _a, _b, _c;
      const localVarAxiosArgs = await localVarAxiosParamCreator.backgroundActionInfo(name, jobUuid, options);
      const localVarOperationServerIndex = (_a = configuration == null ? void 0 : configuration.serverIndex) != null ? _a : 0;
      const localVarOperationServerBasePath = (_c = (_b = operationServerMap["NodeServiceApi.backgroundActionInfo"]) == null ? void 0 : _b[localVarOperationServerIndex]) == null ? void 0 : _c.url;
      return (axios, basePath) => createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 
     * @summary Update/delete user meta in batch. Passed UserMetas must contain a NodeUuid
     * @param {RestBatchUpdateMetaList} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async batchUpdateMeta(body, options) {
      var _a, _b, _c;
      const localVarAxiosArgs = await localVarAxiosParamCreator.batchUpdateMeta(body, options);
      const localVarOperationServerIndex = (_a = configuration == null ? void 0 : configuration.serverIndex) != null ? _a : 0;
      const localVarOperationServerBasePath = (_c = (_b = operationServerMap["NodeServiceApi.batchUpdateMeta"]) == null ? void 0 : _b[localVarOperationServerIndex]) == null ? void 0 : _c.url;
      return (axios, basePath) => createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 
     * @summary Send control commands to a background job
     * @param {ControlBackgroundActionNameEnum} name 
     * @param {string} jobUuid 
     * @param {JobsCtrlCommand} command 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async controlBackgroundAction(name, jobUuid, command, options) {
      var _a, _b, _c;
      const localVarAxiosArgs = await localVarAxiosParamCreator.controlBackgroundAction(name, jobUuid, command, options);
      const localVarOperationServerIndex = (_a = configuration == null ? void 0 : configuration.serverIndex) != null ? _a : 0;
      const localVarOperationServerBasePath = (_c = (_b = operationServerMap["NodeServiceApi.controlBackgroundAction"]) == null ? void 0 : _b[localVarOperationServerIndex]) == null ? void 0 : _c.url;
      return (axios, basePath) => createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 
     * @summary Create one or many files (empty or hydrated from a TemplateUuid) or folders
     * @param {RestCreateRequest} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async create(body, options) {
      var _a, _b, _c;
      const localVarAxiosArgs = await localVarAxiosParamCreator.create(body, options);
      const localVarOperationServerIndex = (_a = configuration == null ? void 0 : configuration.serverIndex) != null ? _a : 0;
      const localVarOperationServerBasePath = (_c = (_b = operationServerMap["NodeServiceApi.create"]) == null ? void 0 : _b[localVarOperationServerIndex]) == null ? void 0 : _c.url;
      return (axios, basePath) => createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 
     * @summary Apply some pre-validation checks on node name before sending an upload
     * @param {RestCreateCheckRequest} body Request for pre-checking nodes before uploading or creating them.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createCheck(body, options) {
      var _a, _b, _c;
      const localVarAxiosArgs = await localVarAxiosParamCreator.createCheck(body, options);
      const localVarOperationServerIndex = (_a = configuration == null ? void 0 : configuration.serverIndex) != null ? _a : 0;
      const localVarOperationServerBasePath = (_c = (_b = operationServerMap["NodeServiceApi.createCheck"]) == null ? void 0 : _b[localVarOperationServerIndex]) == null ? void 0 : _c.url;
      return (axios, basePath) => createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 
     * @summary Create a public link on a given node
     * @param {string} uuid 
     * @param {RestPublicLinkRequest} publicLinkRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createPublicLink(uuid, publicLinkRequest, options) {
      var _a, _b, _c;
      const localVarAxiosArgs = await localVarAxiosParamCreator.createPublicLink(uuid, publicLinkRequest, options);
      const localVarOperationServerIndex = (_a = configuration == null ? void 0 : configuration.serverIndex) != null ? _a : 0;
      const localVarOperationServerBasePath = (_c = (_b = operationServerMap["NodeServiceApi.createPublicLink"]) == null ? void 0 : _b[localVarOperationServerIndex]) == null ? void 0 : _c.url;
      return (axios, basePath) => createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 
     * @summary Create and persist a temporary selection of nodes, that can be used by other actions
     * @param {RestSelection} body Request to create a selection from a list of nodes.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createSelection(body, options) {
      var _a, _b, _c;
      const localVarAxiosArgs = await localVarAxiosParamCreator.createSelection(body, options);
      const localVarOperationServerIndex = (_a = configuration == null ? void 0 : configuration.serverIndex) != null ? _a : 0;
      const localVarOperationServerBasePath = (_c = (_b = operationServerMap["NodeServiceApi.createSelection"]) == null ? void 0 : _b[localVarOperationServerIndex]) == null ? void 0 : _c.url;
      return (axios, basePath) => createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 
     * @summary Remove a public link
     * @param {string} linkUuid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deletePublicLink(linkUuid, options) {
      var _a, _b, _c;
      const localVarAxiosArgs = await localVarAxiosParamCreator.deletePublicLink(linkUuid, options);
      const localVarOperationServerIndex = (_a = configuration == null ? void 0 : configuration.serverIndex) != null ? _a : 0;
      const localVarOperationServerBasePath = (_c = (_b = operationServerMap["NodeServiceApi.deletePublicLink"]) == null ? void 0 : _b[localVarOperationServerIndex]) == null ? void 0 : _c.url;
      return (axios, basePath) => createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 
     * @summary Delete a version by its ID
     * @param {string} uuid 
     * @param {string} versionId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deleteVersion(uuid, versionId, options) {
      var _a, _b, _c;
      const localVarAxiosArgs = await localVarAxiosParamCreator.deleteVersion(uuid, versionId, options);
      const localVarOperationServerIndex = (_a = configuration == null ? void 0 : configuration.serverIndex) != null ? _a : 0;
      const localVarOperationServerBasePath = (_c = (_b = operationServerMap["NodeServiceApi.deleteVersion"]) == null ? void 0 : _b[localVarOperationServerIndex]) == null ? void 0 : _c.url;
      return (axios, basePath) => createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 
     * @summary Load a node by its Uuid
     * @param {string} uuid 
     * @param {string} [path] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getByUuid(uuid, path, options) {
      var _a, _b, _c;
      const localVarAxiosArgs = await localVarAxiosParamCreator.getByUuid(uuid, path, options);
      const localVarOperationServerIndex = (_a = configuration == null ? void 0 : configuration.serverIndex) != null ? _a : 0;
      const localVarOperationServerBasePath = (_c = (_b = operationServerMap["NodeServiceApi.getByUuid"]) == null ? void 0 : _b[localVarOperationServerIndex]) == null ? void 0 : _c.url;
      return (axios, basePath) => createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 
     * @summary Load public link information by Uuid
     * @param {string} linkUuid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getPublicLink(linkUuid, options) {
      var _a, _b, _c;
      const localVarAxiosArgs = await localVarAxiosParamCreator.getPublicLink(linkUuid, options);
      const localVarOperationServerIndex = (_a = configuration == null ? void 0 : configuration.serverIndex) != null ? _a : 0;
      const localVarOperationServerBasePath = (_c = (_b = operationServerMap["NodeServiceApi.getPublicLink"]) == null ? void 0 : _b[localVarOperationServerIndex]) == null ? void 0 : _c.url;
      return (axios, basePath) => createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 
     * @summary List values for a given namespace
     * @param {string} namespace List persisted values for this namespace
     * @param {ListNamespaceValuesOperationOperationEnum} operationOperation 
     * @param {Array<string>} operationValues 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async listNamespaceValues(namespace, operationOperation, operationValues, options) {
      var _a, _b, _c;
      const localVarAxiosArgs = await localVarAxiosParamCreator.listNamespaceValues(namespace, operationOperation, operationValues, options);
      const localVarOperationServerIndex = (_a = configuration == null ? void 0 : configuration.serverIndex) != null ? _a : 0;
      const localVarOperationServerBasePath = (_c = (_b = operationServerMap["NodeServiceApi.listNamespaceValues"]) == null ? void 0 : _b[localVarOperationServerIndex]) == null ? void 0 : _c.url;
      return (axios, basePath) => createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 
     * @summary List defined meta namespaces
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async listNamespaces(options) {
      var _a, _b, _c;
      const localVarAxiosArgs = await localVarAxiosParamCreator.listNamespaces(options);
      const localVarOperationServerIndex = (_a = configuration == null ? void 0 : configuration.serverIndex) != null ? _a : 0;
      const localVarOperationServerBasePath = (_c = (_b = operationServerMap["NodeServiceApi.listNamespaces"]) == null ? void 0 : _b[localVarOperationServerIndex]) == null ? void 0 : _c.url;
      return (axios, basePath) => createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 
     * @summary Generic request to either list (using Locators) or search (using Query) for nodes
     * @param {RestLookupRequest} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async lookup(body, options) {
      var _a, _b, _c;
      const localVarAxiosArgs = await localVarAxiosParamCreator.lookup(body, options);
      const localVarOperationServerIndex = (_a = configuration == null ? void 0 : configuration.serverIndex) != null ? _a : 0;
      const localVarOperationServerBasePath = (_c = (_b = operationServerMap["NodeServiceApi.lookup"]) == null ? void 0 : _b[localVarOperationServerIndex]) == null ? void 0 : _c.url;
      return (axios, basePath) => createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 
     * @summary List all known versions of a node
     * @param {string} uuid The node Uuid
     * @param {RestNodeVersionsFilter} query Additional parameters for filtering/sorting
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async nodeVersions(uuid, query, options) {
      var _a, _b, _c;
      const localVarAxiosArgs = await localVarAxiosParamCreator.nodeVersions(uuid, query, options);
      const localVarOperationServerIndex = (_a = configuration == null ? void 0 : configuration.serverIndex) != null ? _a : 0;
      const localVarOperationServerBasePath = (_c = (_b = operationServerMap["NodeServiceApi.nodeVersions"]) == null ? void 0 : _b[localVarOperationServerIndex]) == null ? void 0 : _c.url;
      return (axios, basePath) => createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 
     * @summary Update a node specific meta. It is used for reserved meta as well (bookmarks, contentLock)
     * @param {string} uuid 
     * @param {RestNodeUpdates} nodeUpdates 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async patchNode(uuid, nodeUpdates, options) {
      var _a, _b, _c;
      const localVarAxiosArgs = await localVarAxiosParamCreator.patchNode(uuid, nodeUpdates, options);
      const localVarOperationServerIndex = (_a = configuration == null ? void 0 : configuration.serverIndex) != null ? _a : 0;
      const localVarOperationServerBasePath = (_c = (_b = operationServerMap["NodeServiceApi.patchNode"]) == null ? void 0 : _b[localVarOperationServerIndex]) == null ? void 0 : _c.url;
      return (axios, basePath) => createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 
     * @summary Trigger an action on the tree. Returns a JobInfo describing a background task.
     * @param {PerformActionNameEnum} name 
     * @param {RestActionParameters} parameters 
     * @param {string} [jobUuid] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async performAction(name, parameters, jobUuid, options) {
      var _a, _b, _c;
      const localVarAxiosArgs = await localVarAxiosParamCreator.performAction(name, parameters, jobUuid, options);
      const localVarOperationServerIndex = (_a = configuration == null ? void 0 : configuration.serverIndex) != null ? _a : 0;
      const localVarOperationServerBasePath = (_c = (_b = operationServerMap["NodeServiceApi.performAction"]) == null ? void 0 : _b[localVarOperationServerIndex]) == null ? void 0 : _c.url;
      return (axios, basePath) => createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 
     * @summary Promotes a version by ID to be the publicly available content of the node - files only
     * @param {string} uuid 
     * @param {string} versionId 
     * @param {RestPromoteParameters} parameters 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async promoteVersion(uuid, versionId, parameters, options) {
      var _a, _b, _c;
      const localVarAxiosArgs = await localVarAxiosParamCreator.promoteVersion(uuid, versionId, parameters, options);
      const localVarOperationServerIndex = (_a = configuration == null ? void 0 : configuration.serverIndex) != null ? _a : 0;
      const localVarOperationServerBasePath = (_c = (_b = operationServerMap["NodeServiceApi.promoteVersion"]) == null ? void 0 : _b[localVarOperationServerIndex]) == null ? void 0 : _c.url;
      return (axios, basePath) => createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 
     * @summary Unset draft status of a resource, typically to publish a folder in draft mode
     * @param {string} uuid 
     * @param {RestPublishNodeParameters} parameters 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async publishNode(uuid, parameters, options) {
      var _a, _b, _c;
      const localVarAxiosArgs = await localVarAxiosParamCreator.publishNode(uuid, parameters, options);
      const localVarOperationServerIndex = (_a = configuration == null ? void 0 : configuration.serverIndex) != null ? _a : 0;
      const localVarOperationServerBasePath = (_c = (_b = operationServerMap["NodeServiceApi.publishNode"]) == null ? void 0 : _b[localVarOperationServerIndex]) == null ? void 0 : _c.url;
      return (axios, basePath) => createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 
     * @summary Search a list of meta by node Id or by User id and by namespace
     * @param {IdmSearchUserMetaRequest} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async searchMeta(body, options) {
      var _a, _b, _c;
      const localVarAxiosArgs = await localVarAxiosParamCreator.searchMeta(body, options);
      const localVarOperationServerIndex = (_a = configuration == null ? void 0 : configuration.serverIndex) != null ? _a : 0;
      const localVarOperationServerBasePath = (_c = (_b = operationServerMap["NodeServiceApi.searchMeta"]) == null ? void 0 : _b[localVarOperationServerIndex]) == null ? void 0 : _c.url;
      return (axios, basePath) => createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 
     * @summary List available templates for hydrating empty files
     * @param {string} [templateType] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async templates(templateType, options) {
      var _a, _b, _c;
      const localVarAxiosArgs = await localVarAxiosParamCreator.templates(templateType, options);
      const localVarOperationServerIndex = (_a = configuration == null ? void 0 : configuration.serverIndex) != null ? _a : 0;
      const localVarOperationServerBasePath = (_c = (_b = operationServerMap["NodeServiceApi.templates"]) == null ? void 0 : _b[localVarOperationServerIndex]) == null ? void 0 : _c.url;
      return (axios, basePath) => createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 
     * @summary Add/delete a values for a given namespace
     * @param {string} namespace List persisted values for this namespace
     * @param {RestNamespaceValuesOperation} operation 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updateNamespaceValues(namespace, operation, options) {
      var _a, _b, _c;
      const localVarAxiosArgs = await localVarAxiosParamCreator.updateNamespaceValues(namespace, operation, options);
      const localVarOperationServerIndex = (_a = configuration == null ? void 0 : configuration.serverIndex) != null ? _a : 0;
      const localVarOperationServerBasePath = (_c = (_b = operationServerMap["NodeServiceApi.updateNamespaceValues"]) == null ? void 0 : _b[localVarOperationServerIndex]) == null ? void 0 : _c.url;
      return (axios, basePath) => createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 
     * @summary Update public link settings
     * @param {string} linkUuid 
     * @param {RestPublicLinkRequest} publicLinkRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updatePublicLink(linkUuid, publicLinkRequest, options) {
      var _a, _b, _c;
      const localVarAxiosArgs = await localVarAxiosParamCreator.updatePublicLink(linkUuid, publicLinkRequest, options);
      const localVarOperationServerIndex = (_a = configuration == null ? void 0 : configuration.serverIndex) != null ? _a : 0;
      const localVarOperationServerBasePath = (_c = (_b = operationServerMap["NodeServiceApi.updatePublicLink"]) == null ? void 0 : _b[localVarOperationServerIndex]) == null ? void 0 : _c.url;
      return (axios, basePath) => createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 
     * @summary Special API for Bookmarks, will load userMeta and the associated nodes, and return as a node list
     * @param {boolean} [all] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async userBookmarks(all, options) {
      var _a, _b, _c;
      const localVarAxiosArgs = await localVarAxiosParamCreator.userBookmarks(all, options);
      const localVarOperationServerIndex = (_a = configuration == null ? void 0 : configuration.serverIndex) != null ? _a : 0;
      const localVarOperationServerBasePath = (_c = (_b = operationServerMap["NodeServiceApi.userBookmarks"]) == null ? void 0 : _b[localVarOperationServerIndex]) == null ? void 0 : _c.url;
      return (axios, basePath) => createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    }
  };
};
var NodeServiceApiFactory = function(configuration, basePath, axios) {
  const localVarFp = NodeServiceApiFp(configuration);
  return {
    /**
     * 
     * @summary Retrieve information about an action running in background
     * @param {BackgroundActionInfoNameEnum} name 
     * @param {string} jobUuid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    backgroundActionInfo(name, jobUuid, options) {
      return localVarFp.backgroundActionInfo(name, jobUuid, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Update/delete user meta in batch. Passed UserMetas must contain a NodeUuid
     * @param {RestBatchUpdateMetaList} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    batchUpdateMeta(body, options) {
      return localVarFp.batchUpdateMeta(body, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Send control commands to a background job
     * @param {ControlBackgroundActionNameEnum} name 
     * @param {string} jobUuid 
     * @param {JobsCtrlCommand} command 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    controlBackgroundAction(name, jobUuid, command, options) {
      return localVarFp.controlBackgroundAction(name, jobUuid, command, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Create one or many files (empty or hydrated from a TemplateUuid) or folders
     * @param {RestCreateRequest} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    create(body, options) {
      return localVarFp.create(body, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Apply some pre-validation checks on node name before sending an upload
     * @param {RestCreateCheckRequest} body Request for pre-checking nodes before uploading or creating them.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createCheck(body, options) {
      return localVarFp.createCheck(body, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Create a public link on a given node
     * @param {string} uuid 
     * @param {RestPublicLinkRequest} publicLinkRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createPublicLink(uuid, publicLinkRequest, options) {
      return localVarFp.createPublicLink(uuid, publicLinkRequest, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Create and persist a temporary selection of nodes, that can be used by other actions
     * @param {RestSelection} body Request to create a selection from a list of nodes.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createSelection(body, options) {
      return localVarFp.createSelection(body, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Remove a public link
     * @param {string} linkUuid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deletePublicLink(linkUuid, options) {
      return localVarFp.deletePublicLink(linkUuid, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Delete a version by its ID
     * @param {string} uuid 
     * @param {string} versionId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteVersion(uuid, versionId, options) {
      return localVarFp.deleteVersion(uuid, versionId, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Load a node by its Uuid
     * @param {string} uuid 
     * @param {string} [path] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getByUuid(uuid, path, options) {
      return localVarFp.getByUuid(uuid, path, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Load public link information by Uuid
     * @param {string} linkUuid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getPublicLink(linkUuid, options) {
      return localVarFp.getPublicLink(linkUuid, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary List values for a given namespace
     * @param {string} namespace List persisted values for this namespace
     * @param {ListNamespaceValuesOperationOperationEnum} operationOperation 
     * @param {Array<string>} operationValues 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listNamespaceValues(namespace, operationOperation, operationValues, options) {
      return localVarFp.listNamespaceValues(namespace, operationOperation, operationValues, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary List defined meta namespaces
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listNamespaces(options) {
      return localVarFp.listNamespaces(options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Generic request to either list (using Locators) or search (using Query) for nodes
     * @param {RestLookupRequest} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    lookup(body, options) {
      return localVarFp.lookup(body, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary List all known versions of a node
     * @param {string} uuid The node Uuid
     * @param {RestNodeVersionsFilter} query Additional parameters for filtering/sorting
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    nodeVersions(uuid, query, options) {
      return localVarFp.nodeVersions(uuid, query, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Update a node specific meta. It is used for reserved meta as well (bookmarks, contentLock)
     * @param {string} uuid 
     * @param {RestNodeUpdates} nodeUpdates 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    patchNode(uuid, nodeUpdates, options) {
      return localVarFp.patchNode(uuid, nodeUpdates, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Trigger an action on the tree. Returns a JobInfo describing a background task.
     * @param {PerformActionNameEnum} name 
     * @param {RestActionParameters} parameters 
     * @param {string} [jobUuid] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    performAction(name, parameters, jobUuid, options) {
      return localVarFp.performAction(name, parameters, jobUuid, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Promotes a version by ID to be the publicly available content of the node - files only
     * @param {string} uuid 
     * @param {string} versionId 
     * @param {RestPromoteParameters} parameters 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    promoteVersion(uuid, versionId, parameters, options) {
      return localVarFp.promoteVersion(uuid, versionId, parameters, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Unset draft status of a resource, typically to publish a folder in draft mode
     * @param {string} uuid 
     * @param {RestPublishNodeParameters} parameters 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    publishNode(uuid, parameters, options) {
      return localVarFp.publishNode(uuid, parameters, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Search a list of meta by node Id or by User id and by namespace
     * @param {IdmSearchUserMetaRequest} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    searchMeta(body, options) {
      return localVarFp.searchMeta(body, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary List available templates for hydrating empty files
     * @param {string} [templateType] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    templates(templateType, options) {
      return localVarFp.templates(templateType, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Add/delete a values for a given namespace
     * @param {string} namespace List persisted values for this namespace
     * @param {RestNamespaceValuesOperation} operation 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateNamespaceValues(namespace, operation, options) {
      return localVarFp.updateNamespaceValues(namespace, operation, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Update public link settings
     * @param {string} linkUuid 
     * @param {RestPublicLinkRequest} publicLinkRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updatePublicLink(linkUuid, publicLinkRequest, options) {
      return localVarFp.updatePublicLink(linkUuid, publicLinkRequest, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Special API for Bookmarks, will load userMeta and the associated nodes, and return as a node list
     * @param {boolean} [all] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userBookmarks(all, options) {
      return localVarFp.userBookmarks(all, options).then((request) => request(axios, basePath));
    }
  };
};
var NodeServiceApi = class extends BaseAPI {
  /**
   * 
   * @summary Retrieve information about an action running in background
   * @param {BackgroundActionInfoNameEnum} name 
   * @param {string} jobUuid 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NodeServiceApi
   */
  backgroundActionInfo(name, jobUuid, options) {
    return NodeServiceApiFp(this.configuration).backgroundActionInfo(name, jobUuid, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * 
   * @summary Update/delete user meta in batch. Passed UserMetas must contain a NodeUuid
   * @param {RestBatchUpdateMetaList} body 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NodeServiceApi
   */
  batchUpdateMeta(body, options) {
    return NodeServiceApiFp(this.configuration).batchUpdateMeta(body, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * 
   * @summary Send control commands to a background job
   * @param {ControlBackgroundActionNameEnum} name 
   * @param {string} jobUuid 
   * @param {JobsCtrlCommand} command 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NodeServiceApi
   */
  controlBackgroundAction(name, jobUuid, command, options) {
    return NodeServiceApiFp(this.configuration).controlBackgroundAction(name, jobUuid, command, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * 
   * @summary Create one or many files (empty or hydrated from a TemplateUuid) or folders
   * @param {RestCreateRequest} body 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NodeServiceApi
   */
  create(body, options) {
    return NodeServiceApiFp(this.configuration).create(body, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * 
   * @summary Apply some pre-validation checks on node name before sending an upload
   * @param {RestCreateCheckRequest} body Request for pre-checking nodes before uploading or creating them.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NodeServiceApi
   */
  createCheck(body, options) {
    return NodeServiceApiFp(this.configuration).createCheck(body, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * 
   * @summary Create a public link on a given node
   * @param {string} uuid 
   * @param {RestPublicLinkRequest} publicLinkRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NodeServiceApi
   */
  createPublicLink(uuid, publicLinkRequest, options) {
    return NodeServiceApiFp(this.configuration).createPublicLink(uuid, publicLinkRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * 
   * @summary Create and persist a temporary selection of nodes, that can be used by other actions
   * @param {RestSelection} body Request to create a selection from a list of nodes.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NodeServiceApi
   */
  createSelection(body, options) {
    return NodeServiceApiFp(this.configuration).createSelection(body, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * 
   * @summary Remove a public link
   * @param {string} linkUuid 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NodeServiceApi
   */
  deletePublicLink(linkUuid, options) {
    return NodeServiceApiFp(this.configuration).deletePublicLink(linkUuid, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * 
   * @summary Delete a version by its ID
   * @param {string} uuid 
   * @param {string} versionId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NodeServiceApi
   */
  deleteVersion(uuid, versionId, options) {
    return NodeServiceApiFp(this.configuration).deleteVersion(uuid, versionId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * 
   * @summary Load a node by its Uuid
   * @param {string} uuid 
   * @param {string} [path] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NodeServiceApi
   */
  getByUuid(uuid, path, options) {
    return NodeServiceApiFp(this.configuration).getByUuid(uuid, path, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * 
   * @summary Load public link information by Uuid
   * @param {string} linkUuid 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NodeServiceApi
   */
  getPublicLink(linkUuid, options) {
    return NodeServiceApiFp(this.configuration).getPublicLink(linkUuid, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * 
   * @summary List values for a given namespace
   * @param {string} namespace List persisted values for this namespace
   * @param {ListNamespaceValuesOperationOperationEnum} operationOperation 
   * @param {Array<string>} operationValues 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NodeServiceApi
   */
  listNamespaceValues(namespace, operationOperation, operationValues, options) {
    return NodeServiceApiFp(this.configuration).listNamespaceValues(namespace, operationOperation, operationValues, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * 
   * @summary List defined meta namespaces
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NodeServiceApi
   */
  listNamespaces(options) {
    return NodeServiceApiFp(this.configuration).listNamespaces(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * 
   * @summary Generic request to either list (using Locators) or search (using Query) for nodes
   * @param {RestLookupRequest} body 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NodeServiceApi
   */
  lookup(body, options) {
    return NodeServiceApiFp(this.configuration).lookup(body, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * 
   * @summary List all known versions of a node
   * @param {string} uuid The node Uuid
   * @param {RestNodeVersionsFilter} query Additional parameters for filtering/sorting
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NodeServiceApi
   */
  nodeVersions(uuid, query, options) {
    return NodeServiceApiFp(this.configuration).nodeVersions(uuid, query, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * 
   * @summary Update a node specific meta. It is used for reserved meta as well (bookmarks, contentLock)
   * @param {string} uuid 
   * @param {RestNodeUpdates} nodeUpdates 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NodeServiceApi
   */
  patchNode(uuid, nodeUpdates, options) {
    return NodeServiceApiFp(this.configuration).patchNode(uuid, nodeUpdates, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * 
   * @summary Trigger an action on the tree. Returns a JobInfo describing a background task.
   * @param {PerformActionNameEnum} name 
   * @param {RestActionParameters} parameters 
   * @param {string} [jobUuid] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NodeServiceApi
   */
  performAction(name, parameters, jobUuid, options) {
    return NodeServiceApiFp(this.configuration).performAction(name, parameters, jobUuid, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * 
   * @summary Promotes a version by ID to be the publicly available content of the node - files only
   * @param {string} uuid 
   * @param {string} versionId 
   * @param {RestPromoteParameters} parameters 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NodeServiceApi
   */
  promoteVersion(uuid, versionId, parameters, options) {
    return NodeServiceApiFp(this.configuration).promoteVersion(uuid, versionId, parameters, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * 
   * @summary Unset draft status of a resource, typically to publish a folder in draft mode
   * @param {string} uuid 
   * @param {RestPublishNodeParameters} parameters 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NodeServiceApi
   */
  publishNode(uuid, parameters, options) {
    return NodeServiceApiFp(this.configuration).publishNode(uuid, parameters, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * 
   * @summary Search a list of meta by node Id or by User id and by namespace
   * @param {IdmSearchUserMetaRequest} body 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NodeServiceApi
   */
  searchMeta(body, options) {
    return NodeServiceApiFp(this.configuration).searchMeta(body, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * 
   * @summary List available templates for hydrating empty files
   * @param {string} [templateType] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NodeServiceApi
   */
  templates(templateType, options) {
    return NodeServiceApiFp(this.configuration).templates(templateType, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * 
   * @summary Add/delete a values for a given namespace
   * @param {string} namespace List persisted values for this namespace
   * @param {RestNamespaceValuesOperation} operation 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NodeServiceApi
   */
  updateNamespaceValues(namespace, operation, options) {
    return NodeServiceApiFp(this.configuration).updateNamespaceValues(namespace, operation, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * 
   * @summary Update public link settings
   * @param {string} linkUuid 
   * @param {RestPublicLinkRequest} publicLinkRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NodeServiceApi
   */
  updatePublicLink(linkUuid, publicLinkRequest, options) {
    return NodeServiceApiFp(this.configuration).updatePublicLink(linkUuid, publicLinkRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * 
   * @summary Special API for Bookmarks, will load userMeta and the associated nodes, and return as a node list
   * @param {boolean} [all] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NodeServiceApi
   */
  userBookmarks(all, options) {
    return NodeServiceApiFp(this.configuration).userBookmarks(all, options).then((request) => request(this.axios, this.basePath));
  }
};
var BackgroundActionInfoNameEnum = {
  Delete: "delete",
  Restore: "restore",
  Copy: "copy",
  Move: "move",
  Extract: "extract",
  Compress: "compress"
};
var ControlBackgroundActionNameEnum = {
  Delete: "delete",
  Restore: "restore",
  Copy: "copy",
  Move: "move",
  Extract: "extract",
  Compress: "compress"
};
var ListNamespaceValuesOperationOperationEnum = {
  Put: "PUT",
  Delete: "DELETE"
};
var PerformActionNameEnum = {
  Delete: "delete",
  Restore: "restore",
  Copy: "copy",
  Move: "move",
  Extract: "extract",
  Compress: "compress"
};

// configuration.ts
var Configuration = class {
  constructor(param = {}) {
    var _a;
    this.apiKey = param.apiKey;
    this.username = param.username;
    this.password = param.password;
    this.accessToken = param.accessToken;
    this.basePath = param.basePath;
    this.serverIndex = param.serverIndex;
    this.baseOptions = __spreadProps(__spreadValues({}, param.baseOptions), {
      headers: __spreadValues({}, (_a = param.baseOptions) == null ? void 0 : _a.headers)
    });
    this.formDataCtor = param.formDataCtor;
  }
  /**
   * Check if the given MIME is a JSON MIME.
   * JSON MIME examples:
   *   application/json
   *   application/json; charset=UTF8
   *   APPLICATION/JSON
   *   application/vnd.company+json
   * @param mime - MIME (Multipurpose Internet Mail Extensions)
   * @return True if the given MIME is JSON, false otherwise.
   */
  isJsonMime(mime) {
    const jsonMime = new RegExp("^(application/json|[^;/ 	]+/[^;/ 	]+[+]json)[ 	]*(;.*)?$", "i");
    return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === "application/json-patch+json");
  }
};

// models/activity-object-type.ts
var ActivityObjectType = {
  BaseObject: "BaseObject",
  Activity: "Activity",
  Link: "Link",
  Mention: "Mention",
  Collection: "Collection",
  OrderedCollection: "OrderedCollection",
  CollectionPage: "CollectionPage",
  OrderedCollectionPage: "OrderedCollectionPage",
  Application: "Application",
  Group: "Group",
  Organization: "Organization",
  Person: "Person",
  Service: "Service",
  Article: "Article",
  Audio: "Audio",
  Document: "Document",
  Event: "Event",
  Image: "Image",
  Note: "Note",
  Page: "Page",
  Place: "Place",
  Profile: "Profile",
  Relationship: "Relationship",
  Tombstone: "Tombstone",
  Video: "Video",
  Accept: "Accept",
  Add: "Add",
  Announce: "Announce",
  Arrive: "Arrive",
  Block: "Block",
  Create: "Create",
  Delete: "Delete",
  Dislike: "Dislike",
  Flag: "Flag",
  Follow: "Follow",
  Ignore: "Ignore",
  Invite: "Invite",
  Join: "Join",
  Leave: "Leave",
  Like: "Like",
  Listen: "Listen",
  Move: "Move",
  Offer: "Offer",
  Question: "Question",
  Reject: "Reject",
  Read: "Read",
  Remove: "Remove",
  TentativeReject: "TentativeReject",
  TentativeAccept: "TentativeAccept",
  Travel: "Travel",
  Undo: "Undo",
  Update: "Update",
  UpdateComment: "UpdateComment",
  UpdateMeta: "UpdateMeta",
  View: "View",
  Workspace: "Workspace",
  Digest: "Digest",
  Folder: "Folder",
  Cell: "Cell",
  Share: "Share"
};

// models/activity-owner-type.ts
var ActivityOwnerType = {
  Node: "NODE",
  User: "USER"
};

// models/idm-workspace-scope.ts
var IdmWorkspaceScope = {
  Any: "ANY",
  Admin: "ADMIN",
  Room: "ROOM",
  Link: "LINK"
};

// models/jobs-command.ts
var JobsCommand = {
  None: "None",
  Pause: "Pause",
  Resume: "Resume",
  Stop: "Stop",
  Delete: "Delete",
  RunOnce: "RunOnce",
  Inactive: "Inactive",
  Active: "Active"
};

// models/jobs-task-status.ts
var JobsTaskStatus = {
  Unknown: "Unknown",
  Idle: "Idle",
  Running: "Running",
  Finished: "Finished",
  Interrupted: "Interrupted",
  Paused: "Paused",
  Any: "Any",
  Error: "Error",
  Queued: "Queued"
};

// models/lookup-filter-meta-filter-op.ts
var LookupFilterMetaFilterOp = {
  Must: "Must",
  Should: "Should",
  Not: "Not"
};

// models/lookup-filter-text-search-in.ts
var LookupFilterTextSearchIn = {
  BaseName: "BaseName",
  Contents: "Contents",
  BaseOrContents: "BaseOrContents"
};

// models/rest-action-status.ts
var RestActionStatus = {
  Performed: "Performed",
  Background: "Background"
};

// models/rest-flag.ts
var RestFlag = {
  WithMetaDefaults: "WithMetaDefaults",
  WithMetaCoreOnly: "WithMetaCoreOnly",
  WithMetaNone: "WithMetaNone",
  WithVersionsAll: "WithVersionsAll",
  WithVersionsDraft: "WithVersionsDraft",
  WithVersionsPublished: "WithVersionsPublished",
  WithPreSignedUrls: "WithPreSignedURLs"
};

// models/rest-meta-update-op.ts
var RestMetaUpdateOp = {
  Put: "PUT",
  Delete: "DELETE"
};

// models/rest-mode.ts
var RestMode = {
  Default: "Default",
  NodeReadOnly: "NodeReadOnly",
  NodeWriteOnly: "NodeWriteOnly",
  LevelReadOnly: "LevelReadOnly"
};

// models/rest-ns-op.ts
var RestNsOp = {
  Put: "PUT",
  Delete: "DELETE"
};

// models/rest-share-link-access-type.ts
var RestShareLinkAccessType = {
  NoAccess: "NoAccess",
  Preview: "Preview",
  Download: "Download",
  Upload: "Upload"
};

// models/rest-user-action-type.ts
var RestUserActionType = {
  Delete: "delete",
  Restore: "restore",
  Copy: "copy",
  Move: "move",
  Extract: "extract",
  Compress: "compress"
};

// models/rest-versions-types.ts
var RestVersionsTypes = {
  VersionsAll: "VersionsAll",
  VersionsDraft: "VersionsDraft",
  VersionsPublished: "VersionsPublished"
};

// models/service-resource-policy-action.ts
var ServiceResourcePolicyAction = {
  Any: "ANY",
  Owner: "OWNER",
  Read: "READ",
  Write: "WRITE",
  EditRules: "EDIT_RULES"
};

// models/service-resource-policy-policy-effect.ts
var ServiceResourcePolicyPolicyEffect = {
  Deny: "deny",
  Allow: "allow"
};

// models/status-filter-deleted-status.ts
var StatusFilterDeletedStatus = {
  Not: "Not",
  Only: "Only",
  Any: "Any"
};

// models/tree-node-change-event-event-type.ts
var TreeNodeChangeEventEventType = {
  Create: "CREATE",
  Read: "READ",
  UpdatePath: "UPDATE_PATH",
  UpdateContent: "UPDATE_CONTENT",
  UpdateMeta: "UPDATE_META",
  UpdateUserMeta: "UPDATE_USER_META",
  Delete: "DELETE"
};

// models/tree-node-type.ts
var TreeNodeType = {
  Unknown: "UNKNOWN",
  Leaf: "LEAF",
  Collection: "COLLECTION"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActivityObjectType,
  ActivityOwnerType,
  BackgroundActionInfoNameEnum,
  Configuration,
  ControlBackgroundActionNameEnum,
  IdmWorkspaceScope,
  JobsCommand,
  JobsTaskStatus,
  ListNamespaceValuesOperationOperationEnum,
  LookupFilterMetaFilterOp,
  LookupFilterTextSearchIn,
  NodeServiceApi,
  NodeServiceApiAxiosParamCreator,
  NodeServiceApiFactory,
  NodeServiceApiFp,
  PerformActionNameEnum,
  RestActionStatus,
  RestFlag,
  RestMetaUpdateOp,
  RestMode,
  RestNsOp,
  RestShareLinkAccessType,
  RestUserActionType,
  RestVersionsTypes,
  ServiceResourcePolicyAction,
  ServiceResourcePolicyPolicyEffect,
  StatusFilterDeletedStatus,
  TreeNodeChangeEventEventType,
  TreeNodeType
});
//# sourceMappingURL=index.js.map