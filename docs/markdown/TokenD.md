<a name="TokenD"></a>

## TokenD
<p>TokendD Software Development Toolkit.</p>

**Kind**: global class  

* [TokenD](#TokenD)
    * [new exports.TokenD()](#new_TokenD_new)
    * _instance_
        * [.horizon](#TokenD+horizon)
        * [.api](#TokenD+api)
        * [.wallet](#TokenD+wallet)
        * [.clockDiff](#TokenD+clockDiff)
        * [.legacySignatures](#TokenD+legacySignatures)
        * [.useWallet(wallet)](#TokenD+useWallet)
        * [.ejectWallet()](#TokenD+ejectWallet)
    * _static_
        * [.create(url, [opts])](#TokenD.create) ⇒ [<code>Promise.&lt;TokenD&gt;</code>](#TokenD)

<a name="new_TokenD_new"></a>

### new exports.TokenD()
<p>Internal constructor. Use TokenD.create() instead.</p>

<a name="TokenD+horizon"></a>

### tokenD.horizon
<p>Horizon server instance.</p>

**Kind**: instance property of [<code>TokenD</code>](#TokenD)  
<a name="TokenD+api"></a>

### tokenD.api
<p>API server instance.</p>

**Kind**: instance property of [<code>TokenD</code>](#TokenD)  
<a name="TokenD+wallet"></a>

### tokenD.wallet
<p>User's wallet.</p>

**Kind**: instance property of [<code>TokenD</code>](#TokenD)  
<a name="TokenD+clockDiff"></a>

### tokenD.clockDiff
<p>Clock difference with the backend.</p>

**Kind**: instance property of [<code>TokenD</code>](#TokenD)  
<a name="TokenD+legacySignatures"></a>

### tokenD.legacySignatures
<p>Use legacy signature scheme instead of IETF HTTP Signatures.</p>

**Kind**: instance property of [<code>TokenD</code>](#TokenD)  
<a name="TokenD+useWallet"></a>

### tokenD.useWallet(wallet)
<p>Use a wallet to sign transactions.</p>

**Kind**: instance method of [<code>TokenD</code>](#TokenD)  

| Param | Type | Description |
| --- | --- | --- |
| wallet | [<code>Wallet</code>](#Wallet) | <p>User's wallet.</p> |

<a name="TokenD+ejectWallet"></a>

### tokenD.ejectWallet()
<p>Eject current wallet.</p>

**Kind**: instance method of [<code>TokenD</code>](#TokenD)  
<a name="TokenD.create"></a>

### TokenD.create(url, [opts]) ⇒ [<code>Promise.&lt;TokenD&gt;</code>](#TokenD)
<p>Make a new TokenD SDK instance.</p>

**Kind**: static method of [<code>TokenD</code>](#TokenD)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | <p>TokenD backend url.</p> |
| [opts] | <code>object</code> |  |
| [opts.allowHttp] | <code>boolean</code> | <p>Allow connecting to http servers, default: <code>false</code>. This must be set to false in production deployments!</p> |
| [opts.proxy] | <code>object</code> | <p>Proxy configuration. Look <a href="https://github.com/axios/axios#request-config">axios docs</a> for more info</p> |
| [opts.httpBasicAuth] | <code>object</code> | <p>HTTP basic auth credentials. Look <a href="https://github.com/axios/axios#request-config">axios docs</a> for more info.</p> |
| [opts.customHeaders] | <code>object</code> | <p>Custom headers for request.</p> |
| [opts.withCredentials] | <code>boolean</code> | <p>Indicates whether or not cross-site Access-Control requests should be made using credentials.</p> |
| [opts.legacySignatures] | <code>boolean</code> | <p>Use legacy signature scheme instead of IETF HTTP Signatures</p> |

