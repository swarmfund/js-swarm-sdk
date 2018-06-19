<a name="Balances"></a>

## Balances
<p>Balances.</p>

**Kind**: global class  

* [Balances](#Balances)
    * [.getPage([query])](#Balances+getPage) ⇒ <code>Promise</code>
    * [.getAsset(balanceId)](#Balances+getAsset)
    * [.getAccount(balanceId)](#Balances+getAccount)

<a name="Balances+getPage"></a>

### balances.getPage([query]) ⇒ <code>Promise</code>
<p>Get balances.</p>

**Kind**: instance method of [<code>Balances</code>](#Balances)  
**Returns**: <code>Promise</code> - <p>Collection of balances.</p>  

| Param | Type | Description |
| --- | --- | --- |
| [query] | <code>object</code> | <p>Request options.</p> |
| [query.limit] | <code>Number</code> | <p>Page limit.</p> |
| [query.cursor] | <code>string</code> | <p>Page cursor.</p> |
| [query.order] | <code>sting</code> | <p>Sorting order.</p> |
| [query.asset] | <code>string</code> | <p>Filter by asset code.</p> |
| [query.account] | <code>string</code> | <p>Filter by balance owner.</p> |

<a name="Balances+getAsset"></a>

### balances.getAsset(balanceId)
<p>Get balance asset.</p>

**Kind**: instance method of [<code>Balances</code>](#Balances)  

| Param | Type | Description |
| --- | --- | --- |
| balanceId | <code>string</code> | <p>Balance ID.</p> |

<a name="Balances+getAccount"></a>

### balances.getAccount(balanceId)
<p>Get balance owner.</p>

**Kind**: instance method of [<code>Balances</code>](#Balances)  

| Param | Type | Description |
| --- | --- | --- |
| balanceId | <code>sting</code> | <p>Balance ID.</p> |

