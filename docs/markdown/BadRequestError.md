<a name="BadRequestError"></a>

## BadRequestError
<p>&quot;Bad Request&quot; error.
<code>error.nestedErrors</code> may contain per-field errors.</p>

**Kind**: global class  
**Export**:   

* [BadRequestError](#BadRequestError)
    * [new exports.BadRequestError(originalError, axios)](#new_BadRequestError_new)
    * [.nestedErrors](#BadRequestError+nestedErrors)

<a name="new_BadRequestError_new"></a>

### new exports.BadRequestError(originalError, axios)
<p>Wrap a raw API error response.</p>


| Param | Type | Description |
| --- | --- | --- |
| originalError | <code>Error</code> | <p>Original error response.</p> |
| axios | <code>axios</code> | <p>Axios instance used for the request.</p> |

<a name="BadRequestError+nestedErrors"></a>

### badRequestError.nestedErrors
<p>Errors for every invalid field.</p>

**Kind**: instance property of [<code>BadRequestError</code>](#BadRequestError)  
