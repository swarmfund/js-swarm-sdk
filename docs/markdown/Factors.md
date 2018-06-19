<a name="Factors"></a>

## Factors
<p>TFA factors.</p>

**Kind**: global class  

* [Factors](#Factors)
    * [.getAll()](#Factors+getAll) ⇒ [<code>ApiResponse</code>](#ApiResponse)
    * [.createTotpFactor()](#Factors+createTotpFactor)
    * [.changePriority(factorId, priority)](#Factors+changePriority) ⇒ [<code>ApiResponse</code>](#ApiResponse)
    * [.delete(factorId)](#Factors+delete) ⇒ [<code>ApiResponse</code>](#ApiResponse)
    * [.verifyPasswordFactorAndRetry(tfaError, password)](#Factors+verifyPasswordFactorAndRetry) ⇒ [<code>ResponseBase</code>](#ResponseBase)
    * [.verifyTotpFactorAndRetry(tfaError, otp)](#Factors+verifyTotpFactorAndRetry) ⇒ [<code>ResponseBase</code>](#ResponseBase)

<a name="Factors+getAll"></a>

### factors.getAll() ⇒ [<code>ApiResponse</code>](#ApiResponse)
<p>Get all TFA factors.</p>

**Kind**: instance method of [<code>Factors</code>](#Factors)  
**Returns**: [<code>ApiResponse</code>](#ApiResponse) - <p>Factors;</p>  
<a name="Factors+createTotpFactor"></a>

### factors.createTotpFactor()
<p>Create a TOTP factor.</p>

**Kind**: instance method of [<code>Factors</code>](#Factors)  
<a name="Factors+changePriority"></a>

### factors.changePriority(factorId, priority) ⇒ [<code>ApiResponse</code>](#ApiResponse)
<p>Change the factor priority.
Every factor with priority &gt; 0 considered enabled.</p>

**Kind**: instance method of [<code>Factors</code>](#Factors)  
**Returns**: [<code>ApiResponse</code>](#ApiResponse) - <p>Response.</p>  

| Param | Type | Description |
| --- | --- | --- |
| factorId | <code>string</code> | <p>ID of the factor to be updated.</p> |
| priority | <code>Number</code> | <p>Desired factor priority.</p> |

<a name="Factors+delete"></a>

### factors.delete(factorId) ⇒ [<code>ApiResponse</code>](#ApiResponse)
<p>Delete the factor.</p>

**Kind**: instance method of [<code>Factors</code>](#Factors)  
**Returns**: [<code>ApiResponse</code>](#ApiResponse) - <p>Response.</p>  

| Param | Type | Description |
| --- | --- | --- |
| factorId | <code>string</code> | <p>ID of the factor to be deleted.</p> |

<a name="Factors+verifyPasswordFactorAndRetry"></a>

### factors.verifyPasswordFactorAndRetry(tfaError, password) ⇒ [<code>ResponseBase</code>](#ResponseBase)
<p>Verify password factor and retry the failed request.</p>

**Kind**: instance method of [<code>Factors</code>](#Factors)  
**Returns**: [<code>ResponseBase</code>](#ResponseBase) - <p>Response of the retried request.</p>  

| Param | Type | Description |
| --- | --- | --- |
| tfaError | <code>TFAError</code> | <p>TFA error instance.</p> |
| password | <code>string</code> | <p>User's password.</p> |

<a name="Factors+verifyTotpFactorAndRetry"></a>

### factors.verifyTotpFactorAndRetry(tfaError, otp) ⇒ [<code>ResponseBase</code>](#ResponseBase)
<p>Verify TOTP factor and retry the failed request.</p>

**Kind**: instance method of [<code>Factors</code>](#Factors)  
**Returns**: [<code>ResponseBase</code>](#ResponseBase) - <p>Response of the retried request.</p>  

| Param | Type | Description |
| --- | --- | --- |
| tfaError | <code>TFAError</code> | <p>TFA error instance.</p> |
| otp | <code>string</code> | <p>One time password from a TOTP app.</p> |

