<a name="Memo"></a>

## Memo
**Kind**: global class  
**See**: <p><a href="https://www.stellar.org/developers/learn/concepts/transactions.html">Transactions concept</a></p>  

* [Memo](#Memo)
    * [new Memo()](#new_Memo_new)
    * [.none()](#Memo.none) ⇒ <code>xdr.Memo</code>
    * [.text(text)](#Memo.text) ⇒ <code>xdr.Memo</code>
    * [.id(id)](#Memo.id) ⇒ <code>xdr.Memo</code>
    * [.hash(hash)](#Memo.hash) ⇒ <code>xdr.Memo</code>
    * [.returnHash(hash)](#Memo.returnHash) ⇒ <code>xdr.Memo</code>

<a name="new_Memo_new"></a>

### new Memo()
<p><code>Memo</code> represents memos attached to transactions. Use static methods to create memos.</p>

<a name="Memo.none"></a>

### Memo.none() ⇒ <code>xdr.Memo</code>
<p>Returns an empty memo (<code>MEMO_NONE</code>).</p>

**Kind**: static method of [<code>Memo</code>](#Memo)  
<a name="Memo.text"></a>

### Memo.text(text) ⇒ <code>xdr.Memo</code>
<p>Creates and returns a <code>MEMO_TEXT</code> memo.</p>

**Kind**: static method of [<code>Memo</code>](#Memo)  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | <p>memo text</p> |

<a name="Memo.id"></a>

### Memo.id(id) ⇒ <code>xdr.Memo</code>
<p>Creates and returns a <code>MEMO_ID</code> memo.</p>

**Kind**: static method of [<code>Memo</code>](#Memo)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>64-bit number represented as a string</p> |

<a name="Memo.hash"></a>

### Memo.hash(hash) ⇒ <code>xdr.Memo</code>
<p>Creates and returns a <code>MEMO_HASH</code> memo.</p>

**Kind**: static method of [<code>Memo</code>](#Memo)  

| Param | Type | Description |
| --- | --- | --- |
| hash | <code>array</code> \| <code>string</code> | <p>32 byte hash or hex encoded string</p> |

<a name="Memo.returnHash"></a>

### Memo.returnHash(hash) ⇒ <code>xdr.Memo</code>
<p>Creates and returns a <code>MEMO_RETURN</code> memo.</p>

**Kind**: static method of [<code>Memo</code>](#Memo)  

| Param | Type | Description |
| --- | --- | --- |
| hash | <code>array</code> \| <code>string</code> | <p>32 byte hash or hex encoded string</p> |

