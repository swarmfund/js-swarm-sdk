<a name="ApiServer"></a>

## ApiServer
<p>Facilitates interaction with the API server.</p>

**Kind**: global class  

* [ApiServer](#ApiServer)
    * [new exports.ApiServer(sdk, serverUrl, opts)](#new_ApiServer_new)
    * [.wallets](#ApiServer+wallets)
    * [.factors](#ApiServer+factors)
    * [.users](#ApiServer+users)
    * [.documents](#ApiServer+documents)
    * [.kycEntities](#ApiServer+kycEntities)
    * [.blobs](#ApiServer+blobs)

<a name="new_ApiServer_new"></a>

### new exports.ApiServer(sdk, serverUrl, opts)
<p>Create a new API server instance.</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sdk | [<code>Swarm</code>](#Swarm) |  | <p>Parent SDK instance.</p> |
| serverUrl | <code>string</code> |  | <p>API server URL.</p> |
| opts | <code>Object</code> |  |  |
| [opts.allowHttp] | <code>boolean</code> |  | <p>Allow connecting to http servers, default: <code>false</code>. This must be set to false in production deployments!</p> |
| [opts.proxy] | <code>Object</code> |  | <p>Proxy configuration. Look <a href="https://github.com/axios/axios#request-config">axios docs</a> for more info</p> |
| [opts.httpBasicAuth] | <code>Object</code> |  | <p>HTTP basic auth credentials. Look <a href="https://github.com/axios/axios#request-config">axios docs</a> for more info.</p> |
| [opts.customHeaders] | <code>Object</code> |  | <p>Custom headers for request.</p> |
| [opts.withCredentials] | <code>boolean</code> |  | <p>Indicates whether or not cross-site Access-Control requests should be made using credentials.</p> |
| [opts.responseType] | <code>string</code> | <code>&quot;&#x27;json&#x27;&quot;</code> | <p>Indicates the type of data that the server will respond with options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'.</p> |

<a name="ApiServer+wallets"></a>

### apiServer.wallets
<p>Wallets.</p>

**Kind**: instance property of [<code>ApiServer</code>](#ApiServer)  
<a name="ApiServer+factors"></a>

### apiServer.factors
<p>TFA factors.</p>

**Kind**: instance property of [<code>ApiServer</code>](#ApiServer)  
<a name="ApiServer+users"></a>

### apiServer.users
<p>Users.</p>

**Kind**: instance property of [<code>ApiServer</code>](#ApiServer)  
<a name="ApiServer+documents"></a>

### apiServer.documents
<p>Documents.</p>

**Kind**: instance property of [<code>ApiServer</code>](#ApiServer)  
<a name="ApiServer+kycEntities"></a>

### apiServer.kycEntities
<p>KYC entities.</p>

**Kind**: instance property of [<code>ApiServer</code>](#ApiServer)  
<a name="ApiServer+blobs"></a>

### apiServer.blobs
<p>Blobs.</p>

**Kind**: instance property of [<code>ApiServer</code>](#ApiServer)  
