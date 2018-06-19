<a name="Account"></a>

## Account
<p>Account.</p>

**Kind**: global class  

* [Account](#Account)
    * [.get([accountId])](#Account+get) ⇒ [<code>HorizonResponse</code>](#HorizonResponse)
    * [.getBalances([query], [accountId])](#Account+getBalances) ⇒ [<code>HorizonResponse</code>](#HorizonResponse)
    * [.getDetails([accountId])](#Account+getDetails) ⇒ [<code>HorizonResponse</code>](#HorizonResponse)
    * [.getReferrals([query], [accountId])](#Account+getReferrals) ⇒ [<code>HorizonResponse</code>](#HorizonResponse)
    * [.getSigners([accountId])](#Account+getSigners) ⇒ [<code>HorizonResponse</code>](#HorizonResponse)
    * [.getSigner(signerId, [accountId])](#Account+getSigner) ⇒ [<code>HorizonResponse</code>](#HorizonResponse)
    * [.getSummary([query], [accountId])](#Account+getSummary) ⇒ [<code>HorizonResponse</code>](#HorizonResponse)

<a name="Account+get"></a>

### account.get([accountId]) ⇒ [<code>HorizonResponse</code>](#HorizonResponse)
<p>Get user's account.</p>

**Kind**: instance method of [<code>Account</code>](#Account)  

| Param | Type | Description |
| --- | --- | --- |
| [accountId] | <code>sting</code> | <p>User's account ID. Use account ID of the attached wallet by default.</p> |

<a name="Account+getBalances"></a>

### account.getBalances([query], [accountId]) ⇒ [<code>HorizonResponse</code>](#HorizonResponse)
<p>Get balances.</p>

**Kind**: instance method of [<code>Account</code>](#Account)  
**Returns**: [<code>HorizonResponse</code>](#HorizonResponse) - <p>Collection of balances.</p>  

| Param | Type | Description |
| --- | --- | --- |
| [query] | <code>object</code> | <p>Request options.</p> |
| [query.limit] | <code>Number</code> | <p>Page limit.</p> |
| [query.cursor] | <code>string</code> | <p>Page cursor.</p> |
| [query.order] | <code>sting</code> | <p>Sorting order.</p> |
| [accountId] | <code>sting</code> | <p>User's account ID. Use account ID of the attached wallet by default.</p> |

<a name="Account+getDetails"></a>

### account.getDetails([accountId]) ⇒ [<code>HorizonResponse</code>](#HorizonResponse)
<p>Get balances details.</p>

**Kind**: instance method of [<code>Account</code>](#Account)  

| Param | Type | Description |
| --- | --- | --- |
| [accountId] | <code>sting</code> | <p>User's account ID. Use account ID of the attached wallet by default.</p> |

<a name="Account+getReferrals"></a>

### account.getReferrals([query], [accountId]) ⇒ [<code>HorizonResponse</code>](#HorizonResponse)
<p>Get referrals.</p>

**Kind**: instance method of [<code>Account</code>](#Account)  

| Param | Type | Description |
| --- | --- | --- |
| [query] | <code>object</code> | <p>Request options.</p> |
| [query.limit] | <code>Number</code> | <p>Page limit.</p> |
| [query.cursor] | <code>string</code> | <p>Page cursor.</p> |
| [query.order] | <code>sting</code> | <p>Sorting order.</p> |
| [accountId] | <code>sting</code> | <p>User's account ID. Use account ID of the attached wallet by default.</p> |

<a name="Account+getSigners"></a>

### account.getSigners([accountId]) ⇒ [<code>HorizonResponse</code>](#HorizonResponse)
<p>Get account signers.</p>

**Kind**: instance method of [<code>Account</code>](#Account)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [accountId] | <code>sting</code> | <code></code> | <p>User's account ID. Use account ID of the attached wallet by default.</p> |

<a name="Account+getSigner"></a>

### account.getSigner(signerId, [accountId]) ⇒ [<code>HorizonResponse</code>](#HorizonResponse)
<p>Get account signers.</p>

**Kind**: instance method of [<code>Account</code>](#Account)  

| Param | Type | Description |
| --- | --- | --- |
| signerId | <code>sting</code> | <p>Signer ID.</p> |
| [accountId] | <code>sting</code> | <p>User's account ID. Use account ID of the attached wallet by default.</p> |

<a name="Account+getSummary"></a>

### account.getSummary([query], [accountId]) ⇒ [<code>HorizonResponse</code>](#HorizonResponse)
<p>Get balances.</p>

**Kind**: instance method of [<code>Account</code>](#Account)  
**Returns**: [<code>HorizonResponse</code>](#HorizonResponse) - <p>Collection of balances.</p>  

| Param | Type | Description |
| --- | --- | --- |
| [query] | <code>object</code> | <p>Request options.</p> |
| [query.since] | <code>Number</code> | <p>Start of the timespan.</p> |
| [query.to] | <code>Number</code> | <p>End of the timespan.</p> |
| [accountId] | <code>sting</code> | <p>User's account ID. Use account ID of the attached wallet by default.</p> |

