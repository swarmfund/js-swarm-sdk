<a name="ServerBase"></a>

## ServerBase
**Kind**: global class  

* [ServerBase](#ServerBase)
    * [new ServerBase()](#new_ServerBase_new)
    * [.ServerBase](#ServerBase+ServerBase)
        * [new exports.ServerBase(sdk, serverUrl, [opts])](#new_ServerBase+ServerBase_new)
    * [.useRequestInterceptor(handleSuccess, handleFailure)](#ServerBase+useRequestInterceptor) ⇒ <code>Object</code>
    * [.ejectRequestInterceptor(interceptor)](#ServerBase+ejectRequestInterceptor)
    * [.useResponseInterceptor(handleSuccess, handleFailure)](#ServerBase+useResponseInterceptor) ⇒ <code>Object</code>
    * [.ejectResponseInterceptor(interceptor)](#ServerBase+ejectResponseInterceptor)

<a name="new_ServerBase_new"></a>

### new ServerBase()
<p>Server handles the network connection to some remote server
instance and exposes an interface for requests to that instance.</p>

<a name="ServerBase+ServerBase"></a>

### serverBase.ServerBase
**Kind**: instance class of [<code>ServerBase</code>](#ServerBase)  
<a name="new_ServerBase+ServerBase_new"></a>

#### new exports.ServerBase(sdk, serverUrl, [opts])
<p>Creates a Server instance.</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sdk | [<code>Swarm</code>](#Swarm) |  | <p>Parent Swarm SDK instance.</p> |
| serverUrl | <code>string</code> |  | <p>Server url.</p> |
| [opts] | <code>object</code> |  |  |
| [opts.allowHttp] | <code>boolean</code> |  | <p>Allow connecting to http servers, default: <code>false</code>. This must be set to false in production deployments!</p> |
| [opts.proxy] | <code>Object</code> |  | <p>Proxy configuration. Look <a href="https://github.com/axios/axios#request-config">axios docs</a> for more info</p> |
| [opts.httpBasicAuth] | <code>Object</code> |  | <p>HTTP basic auth credentials. Look <a href="https://github.com/axios/axios#request-config">axios docs</a> for more info.</p> |
| [opts.customHeaders] | <code>Object</code> |  | <p>Custom headers for request.</p> |
| [opts.withCredentials] | <code>boolean</code> |  | <p>Indicates whether or not cross-site Access-Control requests should be made using credentials.</p> |
| [opts.responseType] | <code>string</code> | <code>&quot;&#x27;json&#x27;&quot;</code> | <p>Indicates the type of data that the server will respond with options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'.</p> |

<a name="ServerBase+useRequestInterceptor"></a>

### serverBase.useRequestInterceptor(handleSuccess, handleFailure) ⇒ <code>Object</code>
<p>Use request interceptor.</p>

**Kind**: instance method of [<code>ServerBase</code>](#ServerBase)  
**Returns**: <code>Object</code> - <p>Axios.js interceptor object.</p>  
**See**: <p><a href="https://github.com/axios/axios#interceptors">axios.js docs</a></p>  

| Param | Type | Description |
| --- | --- | --- |
| handleSuccess | <code>function</code> | <p>Handler for successful requests.</p> |
| handleFailure | <code>function</code> | <p>Handler for failed requests.</p> |

<a name="ServerBase+ejectRequestInterceptor"></a>

### serverBase.ejectRequestInterceptor(interceptor)
<p>Eject request interceptor.</p>

**Kind**: instance method of [<code>ServerBase</code>](#ServerBase)  
**See**: <p><a href="https://github.com/axios/axios#interceptors">axios.js docs</a></p>  

| Param | Type | Description |
| --- | --- | --- |
| interceptor | <code>Object</code> | <p>Axios.js interceptor descriptor.</p> |

<a name="ServerBase+useResponseInterceptor"></a>

### serverBase.useResponseInterceptor(handleSuccess, handleFailure) ⇒ <code>Object</code>
<p>Use response interceptor.</p>

**Kind**: instance method of [<code>ServerBase</code>](#ServerBase)  
**Returns**: <code>Object</code> - <p>Axios.js interceptor object.</p>  
**See**: <p><a href="https://github.com/axios/axios#interceptors">axios.js docs</a></p>  

| Param | Type | Description |
| --- | --- | --- |
| handleSuccess | <code>function</code> | <p>Handler for successful responses.</p> |
| handleFailure | <code>function</code> | <p>Handler for failed responses.</p> |

<a name="ServerBase+ejectResponseInterceptor"></a>

### serverBase.ejectResponseInterceptor(interceptor)
<p>Eject response interceptor.</p>

**Kind**: instance method of [<code>ServerBase</code>](#ServerBase)  
**See**: <p><a href="https://github.com/axios/axios#interceptors">axios.js docs</a></p>  

| Param | Type | Description |
| --- | --- | --- |
| interceptor | <code>Object</code> | <p>Axios.js interceptor descriptor.</p> |

