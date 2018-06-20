<a name="Swarm"></a>

## Swarm
<p>Swarm Software Development Toolkit.</p>

**Kind**: global class  

* [Swarm](#Swarm)
    * [new exports.Swarm()](#new_Swarm_new)
    * _instance_
        * [.horizon](#Swarm+horizon)
        * [.api](#Swarm+api)
        * [.wallet](#Swarm+wallet)
        * [.clockDiff](#Swarm+clockDiff)
        * [.legacySignatures](#Swarm+legacySignatures)
        * [.useWallet(wallet)](#Swarm+useWallet)
        * [.ejectWallet()](#Swarm+ejectWallet)
    * _static_
        * [.create(url, [opts])](#Swarm.create) ⇒ [<code>Promise.&lt;Swarm&gt;</code>](#Swarm)

<a name="new_Swarm_new"></a>

### new exports.Swarm()
<p>Internal constructor. Use Swarm.create() instead.</p>

<a name="Swarm+horizon"></a>

### swarm.horizon
<p>Horizon server instance.</p>

**Kind**: instance property of [<code>Swarm</code>](#Swarm)  
<a name="Swarm+api"></a>

### swarm.api
<p>API server instance.</p>

**Kind**: instance property of [<code>Swarm</code>](#Swarm)  
<a name="Swarm+wallet"></a>

### swarm.wallet
<p>User's wallet.</p>

**Kind**: instance property of [<code>Swarm</code>](#Swarm)  
<a name="Swarm+clockDiff"></a>

### swarm.clockDiff
<p>Clock difference with the backend.</p>

**Kind**: instance property of [<code>Swarm</code>](#Swarm)  
<a name="Swarm+legacySignatures"></a>

### swarm.legacySignatures
<p>Use legacy signature scheme instead of IETF HTTP Signatures.</p>

**Kind**: instance property of [<code>Swarm</code>](#Swarm)  
<a name="Swarm+useWallet"></a>

### swarm.useWallet(wallet)
<p>Use a wallet to sign transactions.</p>

**Kind**: instance method of [<code>Swarm</code>](#Swarm)  

| Param | Type | Description |
| --- | --- | --- |
| wallet | [<code>Wallet</code>](#Wallet) | <p>User's wallet.</p> |

<a name="Swarm+ejectWallet"></a>

### swarm.ejectWallet()
<p>Eject current wallet.</p>

**Kind**: instance method of [<code>Swarm</code>](#Swarm)  
<a name="Swarm.create"></a>

### Swarm.create(url, [opts]) ⇒ [<code>Promise.&lt;Swarm&gt;</code>](#Swarm)
<p>Make a new Swarm SDK instance.</p>

**Kind**: static method of [<code>Swarm</code>](#Swarm)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | <p>Swarm backend url.</p> |
| [opts] | <code>object</code> |  |
| [opts.allowHttp] | <code>boolean</code> | <p>Allow connecting to http servers, default: <code>false</code>. This must be set to false in production deployments!</p> |
| [opts.proxy] | <code>object</code> | <p>Proxy configuration. Look <a href="https://github.com/axios/axios#request-config">axios docs</a> for more info</p> |
| [opts.httpBasicAuth] | <code>object</code> | <p>HTTP basic auth credentials. Look <a href="https://github.com/axios/axios#request-config">axios docs</a> for more info.</p> |
| [opts.customHeaders] | <code>object</code> | <p>Custom headers for request.</p> |
| [opts.withCredentials] | <code>boolean</code> | <p>Indicates whether or not cross-site Access-Control requests should be made using credentials.</p> |
| [opts.legacySignatures] | <code>boolean</code> | <p>Use legacy signature scheme instead of IETF HTTP Signatures</p> |

