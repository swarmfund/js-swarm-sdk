<a name="Wallet"></a>

## Wallet
<p>Manages user's key pair.</p>

**Kind**: global class  

* [Wallet](#Wallet)
    * [new exports.Wallet(email, keypair, accountId, [walletId])](#new_Wallet_new)
    * _instance_
        * [.id](#Wallet+id)
        * [.accountId](#Wallet+accountId)
        * [.email](#Wallet+email)
        * [.secretSeed](#Wallet+secretSeed)
        * [.keypair](#Wallet+keypair)
        * [.encrypt(kdfParams, password)](#Wallet+encrypt) ⇒ <code>object</code>
        * [.encryptRecoveryData(kdfParams, recoveryKeypair)](#Wallet+encryptRecoveryData)
    * _static_
        * [.generate(email, [accountId])](#Wallet.generate) ⇒ [<code>Wallet</code>](#Wallet)
        * [.fromEncrypted(keychainData, kdfParams, salt, email, password)](#Wallet.fromEncrypted)
        * [.fromRecoverySeed(kdfParams, salt, email, recoverySeed)](#Wallet.fromRecoverySeed)
        * [.deriveId(email, password, kdfParams, salt)](#Wallet.deriveId) ⇒ <code>string</code>

<a name="new_Wallet_new"></a>

### new exports.Wallet(email, keypair, accountId, [walletId])
<p>Create a new instance from user's key pair.</p>


| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | <p>User's email.</p> |
| keypair | <code>Keypair</code> \| <code>string</code> | <p>User's key pair or a secret seed.</p> |
| accountId | <code>string</code> | <p>User's account ID.</p> |
| [walletId] | <code>string</code> | <p>Wallet ID.</p> |

<a name="Wallet+id"></a>

### wallet.id
<p>Wallet ID.</p>

**Kind**: instance property of [<code>Wallet</code>](#Wallet)  
<a name="Wallet+accountId"></a>

### wallet.accountId
<p>Account ID.</p>

**Kind**: instance property of [<code>Wallet</code>](#Wallet)  
<a name="Wallet+email"></a>

### wallet.email
<p>Email used for login.</p>

**Kind**: instance property of [<code>Wallet</code>](#Wallet)  
<a name="Wallet+secretSeed"></a>

### wallet.secretSeed
<p>Secret seed.</p>

**Kind**: instance property of [<code>Wallet</code>](#Wallet)  
<a name="Wallet+keypair"></a>

### wallet.keypair
<p>Get signing keypair.</p>

**Kind**: instance property of [<code>Wallet</code>](#Wallet)  
<a name="Wallet+encrypt"></a>

### wallet.encrypt(kdfParams, password) ⇒ <code>object</code>
<p>Encrypt wallet to securely store it.</p>

**Kind**: instance method of [<code>Wallet</code>](#Wallet)  
**Returns**: <code>object</code> - <p>Encrypted keychain and metadata.</p>  

| Param | Type | Description |
| --- | --- | --- |
| kdfParams | <code>object</code> | <p>Scrypt params.</p> |
| password | <code>string</code> | <p>User's password.</p> |

<a name="Wallet+encryptRecoveryData"></a>

### wallet.encryptRecoveryData(kdfParams, recoveryKeypair)
<p>Generate wallet recovery data.</p>

**Kind**: instance method of [<code>Wallet</code>](#Wallet)  

| Param | Type | Description |
| --- | --- | --- |
| kdfParams | <code>object</code> | <p>Scrypt params.</p> |
| recoveryKeypair | <code>Keypair</code> | <p>Recovery keypair.</p> |

<a name="Wallet.generate"></a>

### Wallet.generate(email, [accountId]) ⇒ [<code>Wallet</code>](#Wallet)
<p>Generate a new wallet.</p>

**Kind**: static method of [<code>Wallet</code>](#Wallet)  
**Returns**: [<code>Wallet</code>](#Wallet) - <p>The new wallet.</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| email | <code>string</code> |  | <p>User's email.</p> |
| [accountId] | <code>string</code> | <code>null</code> | <p>User's account ID.</p> |

<a name="Wallet.fromEncrypted"></a>

### Wallet.fromEncrypted(keychainData, kdfParams, salt, email, password)
<p>Decrypt a wallet obtained from a wallet server.</p>

**Kind**: static method of [<code>Wallet</code>](#Wallet)  

| Param | Type | Description |
| --- | --- | --- |
| keychainData | <code>object</code> | <p>Encrypted wallet seed.</p> |
| kdfParams | <code>object</code> | <p>Scrypt params used for encryption.</p> |
| salt | <code>string</code> | <p>Salt used for encryption.</p> |
| email | <code>string</code> | <p>User's email.</p> |
| password | <code>string</code> | <p>User's password.</p> |

<a name="Wallet.fromRecoverySeed"></a>

### Wallet.fromRecoverySeed(kdfParams, salt, email, recoverySeed)
<p>Restore recovery wallet from a recovery seed.</p>

**Kind**: static method of [<code>Wallet</code>](#Wallet)  

| Param | Type | Description |
| --- | --- | --- |
| kdfParams | <code>object</code> | <p>Scrypt params.</p> |
| salt | <code>string</code> | <p>Salt used for encryption.</p> |
| email | <code>string</code> | <p>User's email.</p> |
| recoverySeed | <code>string</code> | <p>User's recovery seed.</p> |

<a name="Wallet.deriveId"></a>

### Wallet.deriveId(email, password, kdfParams, salt) ⇒ <code>string</code>
<p>Derive the wallet ID.</p>

**Kind**: static method of [<code>Wallet</code>](#Wallet)  
**Returns**: <code>string</code> - <p>Wallet ID.</p>  

| Param | Type |
| --- | --- |
| email | <code>string</code> | 
| password | <code>string</code> | 
| kdfParams | <code>object</code> | 
| salt | <code>string</code> | 

