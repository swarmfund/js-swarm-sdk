<a name="Transaction+Transaction"></a>

## Transaction.Transaction
**Kind**: instance class of <code>Transaction</code>  
<a name="new_Transaction+Transaction_new"></a>

### new exports.Transaction(envelope)
<p>A new Transaction object is created from a transaction envelope or via [TransactionBuilder](TransactionBuilder).
Once a Transaction has been created from an envelope, its attributes and operations
should not be changed. You should only add signers (using [sign](#Transaction+sign)) to a Transaction object before
submitting to the network or forwarding on to additional signers.</p>


| Param | Type | Description |
| --- | --- | --- |
| envelope | <code>string</code> \| <code>xdr.TransactionEnvelope</code> | <p>The transaction envelope object or base64 encoded string.</p> |

