<a name="Wallets"></a>

## Wallets
<p>Wallets.</p>

**Kind**: global class  

* [Wallets](#Wallets)
    * [.getKdfParams([email], [isRecovery])](#Wallets+getKdfParams)
    * [.get(email, password)](#Wallets+get) ⇒ [<code>Promise.&lt;Wallet&gt;</code>](#Wallet)
    * [.create(email, password)](#Wallets+create) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.verifyEmail(payload)](#Wallets+verifyEmail)
    * [.resendEmail([walletId])](#Wallets+resendEmail)
    * [.recovery(email, recoverySeed, newPassword)](#Wallets+recovery) ⇒ [<code>Wallet</code>](#Wallet)
    * [.changePassword(newPassword)](#Wallets+changePassword) ⇒ [<code>Wallet</code>](#Wallet)

<a name="Wallets+getKdfParams"></a>

### wallets.getKdfParams([email], [isRecovery])
<p>Get key derivation params.</p>

**Kind**: instance method of [<code>Wallets</code>](#Wallets)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [email] | <code>string</code> |  | <p>User's email.</p> |
| [isRecovery] | <code>boolean</code> | <code>false</code> | <p>If true, get params for the recovery wallet.</p> |

<a name="Wallets+get"></a>

### wallets.get(email, password) ⇒ [<code>Promise.&lt;Wallet&gt;</code>](#Wallet)
<p>Get an encrypted wallet.</p>
<p>If verification is required, look for wallet ID in the errors meta:</p>
<pre class="prettyprint source"><code>err.meta.walletId</code></pre>

**Kind**: instance method of [<code>Wallets</code>](#Wallets)  
**Returns**: [<code>Promise.&lt;Wallet&gt;</code>](#Wallet) - <p>User's wallet.</p>  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | <p>User's email.</p> |
| password | <code>string</code> | <p>User's password.</p> |

<a name="Wallets+create"></a>

### wallets.create(email, password) ⇒ <code>Promise.&lt;object&gt;</code>
<p>Create a wallet.</p>

**Kind**: instance method of [<code>Wallets</code>](#Wallets)  
**Returns**: <code>Promise.&lt;object&gt;</code> - <p>User's wallet and a recovery seed.</p>  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | <p>User's email.</p> |
| password | <code>string</code> | <p>User's password.</p> |

<a name="Wallets+verifyEmail"></a>

### wallets.verifyEmail(payload)
<p>Verify email.</p>

**Kind**: instance method of [<code>Wallets</code>](#Wallets)  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>string</code> | <p>Base64 encoded payload from the email link.</p> |

<a name="Wallets+resendEmail"></a>

### wallets.resendEmail([walletId])
<p>Re-send verification email.</p>

**Kind**: instance method of [<code>Wallets</code>](#Wallets)  

| Param | Type | Description |
| --- | --- | --- |
| [walletId] | <code>string</code> | <p>ID of the wallet to resend email for.</p> |

<a name="Wallets+recovery"></a>

### wallets.recovery(email, recoverySeed, newPassword) ⇒ [<code>Wallet</code>](#Wallet)
<p>Recover a wallet using the recovery seed.</p>

**Kind**: instance method of [<code>Wallets</code>](#Wallets)  
**Returns**: [<code>Wallet</code>](#Wallet) - <p>New wallet.</p>  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | <p>User's email.</p> |
| recoverySeed | <code>string</code> | <p>User's recovery seed.</p> |
| newPassword | <code>string</code> | <p>Desired password.</p> |

<a name="Wallets+changePassword"></a>

### wallets.changePassword(newPassword) ⇒ [<code>Wallet</code>](#Wallet)
<p>Change password.</p>

**Kind**: instance method of [<code>Wallets</code>](#Wallets)  
**Returns**: [<code>Wallet</code>](#Wallet) - <p>New wallet.</p>  

| Param | Type | Description |
| --- | --- | --- |
| newPassword | <code>string</code> | <p>Desired password.</p> |

