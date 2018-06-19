<a name="Keypair+Keypair"></a>

## Keypair.Keypair
**Kind**: instance class of <code>Keypair</code>  
<a name="new_Keypair+Keypair_new"></a>

### new exports.Keypair(keys)
<p><code>Keypair</code> represents public (and secret) keys of the account.</p>
<p>Use more convenient methods to create <code>Keypair</code> object:</p>
<ul>
<li><code>[fromAccountId](#Keypair.fromAccountId)</code></li>
<li><code>[fromSecret](#Keypair.fromSecret)</code></li>
<li><code>[random](#Keypair.random)</code></li>
</ul>


| Param | Type | Description |
| --- | --- | --- |
| keys | <code>object</code> |  |
| keys.publicKey | <code>string</code> | <p>Raw public key</p> |
| [keys.secretSeed] | <code>string</code> | <p>Raw secret key seed.</p> |

