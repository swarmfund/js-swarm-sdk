<a name="CallBuilder"></a>

## CallBuilder
**Kind**: global class  

* [CallBuilder](#CallBuilder)
    * [new CallBuilder(axios, wallet)](#new_CallBuilder_new)
    * [.CallBuilder](#CallBuilder+CallBuilder)
        * [new exports.CallBuilder(axios, [sdk])](#new_CallBuilder+CallBuilder_new)
    * [.appendUrlSegment(segment)](#CallBuilder+appendUrlSegment) ⇒ [<code>CallBuilder</code>](#CallBuilder)
    * [.appendAccountId([accountId])](#CallBuilder+appendAccountId) ⇒ [<code>CallBuilder</code>](#CallBuilder)
    * [.withSignature([wallet])](#CallBuilder+withSignature) ⇒ [<code>CallBuilder</code>](#CallBuilder)
    * [.withTimeout(timeout)](#CallBuilder+withTimeout) ⇒ [<code>CallBuilder</code>](#CallBuilder)
    * [.post([data])](#CallBuilder+post) ⇒ <code>Promise</code>
    * [.get([query])](#CallBuilder+get) ⇒ <code>Promise</code>
    * [.put([data])](#CallBuilder+put) ⇒ <code>Promise</code>
    * [.patch([data])](#CallBuilder+patch) ⇒ <code>Promise</code>
    * [.delete([data])](#CallBuilder+delete) ⇒ <code>Promise</code>

<a name="new_CallBuilder_new"></a>

### new CallBuilder(axios, wallet)
<p>Creates a new [CallBuilder](#CallBuilder).</p>


| Param | Type | Description |
| --- | --- | --- |
| axios | <code>axios</code> | <p>Instance of axios.</p> |
| wallet | [<code>Wallet</code>](#Wallet) | <p>User's wallet.</p> |

<a name="CallBuilder+CallBuilder"></a>

### callBuilder.CallBuilder
**Kind**: instance class of [<code>CallBuilder</code>](#CallBuilder)  
<a name="new_CallBuilder+CallBuilder_new"></a>

#### new exports.CallBuilder(axios, [sdk])
<p>Creates a CallBuilder instance.</p>


| Param | Type | Description |
| --- | --- | --- |
| axios | <code>Object</code> | <p>Axios.js instance.</p> |
| [sdk] | [<code>Swarm</code>](#Swarm) | <p>Swarm SDK instance.</p> |

<a name="CallBuilder+appendUrlSegment"></a>

### callBuilder.appendUrlSegment(segment) ⇒ [<code>CallBuilder</code>](#CallBuilder)
<p>Append URL segment.</p>

**Kind**: instance method of [<code>CallBuilder</code>](#CallBuilder)  
**Returns**: [<code>CallBuilder</code>](#CallBuilder) - <p>Self.</p>  

| Param | Type | Description |
| --- | --- | --- |
| segment | <code>string</code> \| <code>number</code> \| <code>Array.&lt;string&gt;</code> | <p>URL path segment(s).</p> |

<a name="CallBuilder+appendAccountId"></a>

### callBuilder.appendAccountId([accountId]) ⇒ [<code>CallBuilder</code>](#CallBuilder)
<p>Append an account ID to the URL.
Uses wallet's account ID by default.</p>

**Kind**: instance method of [<code>CallBuilder</code>](#CallBuilder)  
**Returns**: [<code>CallBuilder</code>](#CallBuilder) - <p>Self.</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [accountId] | <code>string</code> | <code>null</code> | <p>Custom account ID.</p> |

<a name="CallBuilder+withSignature"></a>

### callBuilder.withSignature([wallet]) ⇒ [<code>CallBuilder</code>](#CallBuilder)
<p>Authorize this request.</p>

**Kind**: instance method of [<code>CallBuilder</code>](#CallBuilder)  
**Returns**: [<code>CallBuilder</code>](#CallBuilder) - <p>Self.</p>  

| Param | Type | Description |
| --- | --- | --- |
| [wallet] | <code>wallet</code> | <p>Use another wallet for signature.</p> |

<a name="CallBuilder+withTimeout"></a>

### callBuilder.withTimeout(timeout) ⇒ [<code>CallBuilder</code>](#CallBuilder)
<p>Set a request timeout.</p>

**Kind**: instance method of [<code>CallBuilder</code>](#CallBuilder)  
**Returns**: [<code>CallBuilder</code>](#CallBuilder) - <p>Self.</p>  

| Param | Type | Description |
| --- | --- | --- |
| timeout | <code>Number</code> | <p>Request timeout.</p> |

<a name="CallBuilder+post"></a>

### callBuilder.post([data]) ⇒ <code>Promise</code>
<p>Perform a POST request.</p>

**Kind**: instance method of [<code>CallBuilder</code>](#CallBuilder)  
**Returns**: <code>Promise</code> - <p>Request result.</p>  

| Param | Type | Description |
| --- | --- | --- |
| [data] | <code>Object</code> | <p>Request body.</p> |

<a name="CallBuilder+get"></a>

### callBuilder.get([query]) ⇒ <code>Promise</code>
<p>Perform a GET request.</p>

**Kind**: instance method of [<code>CallBuilder</code>](#CallBuilder)  
**Returns**: <code>Promise</code> - <p>Request result.</p>  

| Param | Type | Description |
| --- | --- | --- |
| [query] | <code>Object</code> | <p>Request body.</p> |

<a name="CallBuilder+put"></a>

### callBuilder.put([data]) ⇒ <code>Promise</code>
<p>Perform a PUT request.</p>

**Kind**: instance method of [<code>CallBuilder</code>](#CallBuilder)  
**Returns**: <code>Promise</code> - <p>Request result.</p>  

| Param | Type | Description |
| --- | --- | --- |
| [data] | <code>Object</code> | <p>Request body.</p> |

<a name="CallBuilder+patch"></a>

### callBuilder.patch([data]) ⇒ <code>Promise</code>
<p>Perform a PATCH request.</p>

**Kind**: instance method of [<code>CallBuilder</code>](#CallBuilder)  
**Returns**: <code>Promise</code> - <p>Request result.</p>  

| Param | Type | Description |
| --- | --- | --- |
| [data] | <code>Object</code> | <p>Request body.</p> |

<a name="CallBuilder+delete"></a>

### callBuilder.delete([data]) ⇒ <code>Promise</code>
<p>Perform a DELETE request.</p>

**Kind**: instance method of [<code>CallBuilder</code>](#CallBuilder)  
**Returns**: <code>Promise</code> - <p>Request result.</p>  

| Param | Type | Description |
| --- | --- | --- |
| [data] | <code>Object</code> | <p>Request body.</p> |

