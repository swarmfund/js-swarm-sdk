<a name="Documents"></a>

## Documents
<p>Documents.</p>

**Kind**: global class  

* [Documents](#Documents)
    * [.types](#Documents+types)
    * [.supportedMimeTypes](#Documents+supportedMimeTypes)
    * [.create(documentType, mimeType, data)](#Documents+create) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.get(documentId)](#Documents+get) ⇒ [<code>ApiResponse</code>](#ApiResponse)

<a name="Documents+types"></a>

### documents.types
<p>Document types.</p>

**Kind**: instance property of [<code>Documents</code>](#Documents)  
<a name="Documents+supportedMimeTypes"></a>

### documents.supportedMimeTypes
<p>Supported content types.</p>

**Kind**: instance property of [<code>Documents</code>](#Documents)  
<a name="Documents+create"></a>

### documents.create(documentType, mimeType, data) ⇒ <code>Promise.&lt;Object&gt;</code>
<p>Create a document upload config.</p>

**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - <p>Upload URL and form data.</p>  

| Param | Type | Description |
| --- | --- | --- |
| documentType | <code>string</code> | <p>Document type.</p> |
| mimeType | <code>string</code> | <p>Content type.</p> |
| data | <code>Buffer</code> | <p>Document contents.</p> |

<a name="Documents+get"></a>

### documents.get(documentId) ⇒ [<code>ApiResponse</code>](#ApiResponse)
<p>Get document details by ID.</p>

**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Returns**: [<code>ApiResponse</code>](#ApiResponse) - <p>Response containing an access URL.</p>  

| Param | Type | Description |
| --- | --- | --- |
| documentId | <code>string</code> | <p>Document ID.</p> |

