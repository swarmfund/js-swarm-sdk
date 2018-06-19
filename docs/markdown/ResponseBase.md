<a name="ResponseBase"></a>

## ResponseBase
<p>Base class for request responses.</p>

**Kind**: global class  

* [ResponseBase](#ResponseBase)
    * [new exports.ResponseBase(rawResponse)](#new_ResponseBase_new)
    * [.data](#ResponseBase+data)
    * [.httpStatus](#ResponseBase+httpStatus)
    * [.headers](#ResponseBase+headers)
    * [.toJSON()](#ResponseBase+toJSON) ⇒ <code>object</code>

<a name="new_ResponseBase_new"></a>

### new exports.ResponseBase(rawResponse)
<p>Wrap a raw axios.js response object.</p>


| Param | Type | Description |
| --- | --- | --- |
| rawResponse | <code>object</code> | <p>Raw axios.js response object.</p> |

<a name="ResponseBase+data"></a>

### responseBase.data
<p>Get response data.</p>

**Kind**: instance property of [<code>ResponseBase</code>](#ResponseBase)  
<a name="ResponseBase+httpStatus"></a>

### responseBase.httpStatus
<p>Get response HTTP status.</p>

**Kind**: instance property of [<code>ResponseBase</code>](#ResponseBase)  
<a name="ResponseBase+headers"></a>

### responseBase.headers
<p>Get response headers.</p>

**Kind**: instance property of [<code>ResponseBase</code>](#ResponseBase)  
<a name="ResponseBase+toJSON"></a>

### responseBase.toJSON() ⇒ <code>object</code>
<p>Override JSON serialization.</p>

**Kind**: instance method of [<code>ResponseBase</code>](#ResponseBase)  
**Returns**: <code>object</code> - <p>Data to be serialized.</p>  
