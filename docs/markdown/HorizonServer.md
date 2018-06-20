<a name="HorizonServer"></a>

## HorizonServer
<p>Facilitates interaction with a Horizon server instance.</p>

**Kind**: global class  

* [HorizonServer](#HorizonServer)
    * [new exports.HorizonServer(sdk, serverUrl)](#new_HorizonServer_new)
    * [.balances](#HorizonServer+balances) ⇒ [<code>Balances</code>](#Balances)
    * [.account](#HorizonServer+account) ⇒ [<code>Account</code>](#Account)
    * [.transactions](#HorizonServer+transactions) ⇒ [<code>Account</code>](#Account)
    * [.getNetworkDetails()](#HorizonServer+getNetworkDetails) ⇒ [<code>HorizonResponse</code>](#HorizonResponse)

<a name="new_HorizonServer_new"></a>

### new exports.HorizonServer(sdk, serverUrl)
<p>Create a new Horizon instance.</p>


| Param | Type | Description |
| --- | --- | --- |
| sdk | [<code>Swarm</code>](#Swarm) | <p>Parent SDK instance.</p> |
| serverUrl | <code>string</code> | <p>Horizon server instance URL.</p> |
| [opts.allowHttp] | <code>boolean</code> | <p>Allow connecting to http servers, default: <code>false</code>. This must be set to false in production deployments!</p> |
| [opts.proxy] | <code>Object</code> | <p>Proxy configuration. Look <a href="https://github.com/axios/axios#request-config">axios docs</a> for more info</p> |
| [opts.httpBasicAuth] | <code>Object</code> | <p>HTTP basic auth credentials. Look <a href="https://github.com/axios/axios#request-config">axios docs</a> for more info.</p> |
| [opts.customHeaders] | <code>Object</code> | <p>Custom headers for request.</p> |
| [opts.withCredentials] | <code>boolean</code> | <p>Indicates whether or not cross-site Access-Control requests should be made using credentials.</p> |

<a name="HorizonServer+balances"></a>

### horizonServer.balances ⇒ [<code>Balances</code>](#Balances)
<p>Balances.</p>

**Kind**: instance property of [<code>HorizonServer</code>](#HorizonServer)  
<a name="HorizonServer+account"></a>

### horizonServer.account ⇒ [<code>Account</code>](#Account)
<p>Account details.</p>

**Kind**: instance property of [<code>HorizonServer</code>](#HorizonServer)  
<a name="HorizonServer+transactions"></a>

### horizonServer.transactions ⇒ [<code>Account</code>](#Account)
<p>Transactions.</p>

**Kind**: instance property of [<code>HorizonServer</code>](#HorizonServer)  
<a name="HorizonServer+getNetworkDetails"></a>

### horizonServer.getNetworkDetails() ⇒ [<code>HorizonResponse</code>](#HorizonResponse)
<p>Get network details.</p>

**Kind**: instance method of [<code>HorizonServer</code>](#HorizonServer)  
**Returns**: [<code>HorizonResponse</code>](#HorizonResponse) - <p>Network details.</p>  
