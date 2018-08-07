<a name="Users"></a>

## Users
<p>Users.</p>

**Kind**: global class  

* [Users](#Users)
    * [.getPage([query])](#Users+getPage) ⇒ <code>Promise</code>
    * [.get([accountId])](#Users+get) ⇒ <code>Promise</code>
    * [.create([accountId])](#Users+create) ⇒ <code>Promise</code>

<a name="Users+getPage"></a>

### users.getPage([query]) ⇒ <code>Promise</code>
<p>Get users.</p>

**Kind**: instance method of [<code>Users</code>](#Users)  
**Returns**: <code>Promise</code> - <p>Collection of balances.</p>  

| Param | Type | Description |
| --- | --- | --- |
| [query] | <code>object</code> | <p>Request options.</p> |
| [query.page] | <code>Number</code> | <p>Page number.</p> |
| [query.state] | <code>Number</code> | <p>Bit mask to filter users by state.</p> |
| [query.type] | <code>Number</code> | <p>Bit mask to filter users by type.</p> |
| [query.email] | <code>string</code> | <p>Substring to match against user emails.</p> |
| [query.address] | <code>string</code> | <p>Substring to match against account addresses.</p> |

<a name="Users+get"></a>

### users.get([accountId]) ⇒ <code>Promise</code>
<p>Get a user.</p>

**Kind**: instance method of [<code>Users</code>](#Users)  
**Returns**: <code>Promise</code> - <p>Collection of balances.</p>  

| Param | Type | Description |
| --- | --- | --- |
| [accountId] | <code>string</code> | <p>Other user's account.</p> |

<p>An example to get the accountId</p>

```js
 let accountID = sdk.wallet.accountId 
```

<a name="Users+create"></a>

### users.create([accountId]) ⇒ <code>Promise</code>
<p>Create a user.</p>

**Kind**: instance method of [<code>Users</code>](#Users)  
**Returns**: <code>Promise</code> - <p>Collection of balances.</p>  

| Param | Type | Description |
| --- | --- | --- |
| [accountId] | <code>string</code> | <p>Other user's account.</p> |

