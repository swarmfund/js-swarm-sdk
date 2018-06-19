<a name="Blobs"></a>

## Blobs
<p>Blobs.</p>

**Kind**: global class  

* [Blobs](#Blobs)
    * [.types](#Blobs+types)
    * [.create(type, data, accountId)](#Blobs+create) ⇒ [<code>ApiResponse</code>](#ApiResponse)
    * [.get(blobId, [accountId])](#Blobs+get)
    * [.getAll(query, [accountId])](#Blobs+getAll)

<a name="Blobs+types"></a>

### blobs.types
<p>Blob types.</p>

**Kind**: instance property of [<code>Blobs</code>](#Blobs)  
<a name="Blobs+create"></a>

### blobs.create(type, data, accountId) ⇒ [<code>ApiResponse</code>](#ApiResponse)
<p>Create a blob.</p>

**Kind**: instance method of [<code>Blobs</code>](#Blobs)  
**Returns**: [<code>ApiResponse</code>](#ApiResponse) - <p>Blob data.</p>  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | <p>Blob type.</p> |
| data | <code>string</code> | <p>Serialized blob data.</p> |
| accountId | <code>string</code> | <p>User's account ID.</p> |

<a name="Blobs+get"></a>

### blobs.get(blobId, [accountId])
<p>Get a blob.</p>

**Kind**: instance method of [<code>Blobs</code>](#Blobs)  

| Param | Type | Description |
| --- | --- | --- |
| blobId | <code>string</code> | <p>Blob ID.</p> |
| [accountId] | <code>string</code> | <p>User's account ID.</p> |

<a name="Blobs+getAll"></a>

### blobs.getAll(query, [accountId])
<p>Get blobs.</p>

**Kind**: instance method of [<code>Blobs</code>](#Blobs)  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | <p>Query params.</p> |
| query.type | <code>Nubmer</code> \| <code>Array.&lt;string&gt;</code> | <p>Filter by type.</p> |
| [accountId] | <code>string</code> | <p>User's account ID.</p> |

