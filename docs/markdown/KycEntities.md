<a name="KycEntities"></a>

## KycEntities
<p>KYC entities.</p>

**Kind**: global class  

* [KycEntities](#KycEntities)
    * [.types](#KycEntities+types)
    * [.create(documentType, kycData, [accountId])](#KycEntities+create) ⇒ [<code>ApiResponse</code>](#ApiResponse)
    * [.getAll([accountId])](#KycEntities+getAll) ⇒ [<code>ApiResponse</code>](#ApiResponse)
    * [.update(entityId, kycData, [accountId])](#KycEntities+update) ⇒ [<code>ApiResponse</code>](#ApiResponse)

<a name="KycEntities+types"></a>

### kycEntities.types
<p>Document types.</p>

**Kind**: instance property of [<code>KycEntities</code>](#KycEntities)  
<a name="KycEntities+create"></a>

### kycEntities.create(documentType, kycData, [accountId]) ⇒ [<code>ApiResponse</code>](#ApiResponse)
<p>Create a document upload config.</p>

**Kind**: instance method of [<code>KycEntities</code>](#KycEntities)  
**Returns**: [<code>ApiResponse</code>](#ApiResponse) - <p>Response.</p>  

| Param | Type | Description |
| --- | --- | --- |
| documentType | <code>string</code> | <p>Entity type.</p> |
| kycData | <code>string</code> | <p>KYC data.</p> |
| [accountId] | <code>string</code> | <p>User's account ID.</p> |

<a name="KycEntities+getAll"></a>

### kycEntities.getAll([accountId]) ⇒ [<code>ApiResponse</code>](#ApiResponse)
<p>Get all entities.</p>

**Kind**: instance method of [<code>KycEntities</code>](#KycEntities)  
**Returns**: [<code>ApiResponse</code>](#ApiResponse) - <p>List of KYC entities.</p>  

| Param | Type | Description |
| --- | --- | --- |
| [accountId] | <code>string</code> | <p>User's account ID.</p> |

<a name="KycEntities+update"></a>

### kycEntities.update(entityId, kycData, [accountId]) ⇒ [<code>ApiResponse</code>](#ApiResponse)
<p>Update an entity.</p>

**Kind**: instance method of [<code>KycEntities</code>](#KycEntities)  
**Returns**: [<code>ApiResponse</code>](#ApiResponse) - <p>Response.</p>  

| Param | Type | Description |
| --- | --- | --- |
| entityId | <code>string</code> | <p>Entity ID.</p> |
| kycData | <code>object</code> | <p>KYC data.</p> |
| [accountId] | <code>string</code> | <p>User's account ID.</p> |

