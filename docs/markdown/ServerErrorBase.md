<a name="ServerErrorBase"></a>

## ServerErrorBase
<p>Base class for server errors.</p>

**Kind**: global class  

* [ServerErrorBase](#ServerErrorBase)
    * [new exports.ServerErrorBase(originalError, axios)](#new_ServerErrorBase_new)
    * [.httpStatus](#ServerErrorBase+httpStatus)
    * [.meta](#ServerErrorBase+meta)
    * [.title](#ServerErrorBase+title)
    * [.detail](#ServerErrorBase+detail)
    * [.retryRequest()](#ServerErrorBase+retryRequest)

<a name="new_ServerErrorBase_new"></a>

### new exports.ServerErrorBase(originalError, axios)
<p>Wrap a raw axios error.</p>


| Param | Type | Description |
| --- | --- | --- |
| originalError | <code>object</code> | <p>Raw axios response.</p> |
| axios | <code>axios</code> | <p>Axios instance used for request.</p> |

<a name="ServerErrorBase+httpStatus"></a>

### serverErrorBase.httpStatus
<p>Response HTTP status.</p>

**Kind**: instance property of [<code>ServerErrorBase</code>](#ServerErrorBase)  
<a name="ServerErrorBase+meta"></a>

### serverErrorBase.meta
<p>Error meta.</p>

**Kind**: instance property of [<code>ServerErrorBase</code>](#ServerErrorBase)  
<a name="ServerErrorBase+title"></a>

### serverErrorBase.title
<p>A short, human-readable summary of the problem.</p>

**Kind**: instance property of [<code>ServerErrorBase</code>](#ServerErrorBase)  
<a name="ServerErrorBase+detail"></a>

### serverErrorBase.detail
<p>A human-readable explanation specific to this occurrence of the problem.</p>

**Kind**: instance property of [<code>ServerErrorBase</code>](#ServerErrorBase)  
<a name="ServerErrorBase+retryRequest"></a>

### serverErrorBase.retryRequest()
<p>Retry the failed request.
Use it to retry requests after 2FA.</p>

**Kind**: instance method of [<code>ServerErrorBase</code>](#ServerErrorBase)  
