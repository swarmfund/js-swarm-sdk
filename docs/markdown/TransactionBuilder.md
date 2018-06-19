<a name="TransactionBuilder+TransactionBuilder"></a>

## TransactionBuilder.TransactionBuilder
**Kind**: instance class of <code>TransactionBuilder</code>  
<a name="new_TransactionBuilder+TransactionBuilder_new"></a>

### new exports.TransactionBuilder(sourceAccount, [opts])
<p>Transaction builder helps constructs a new <code>[Transaction](Transaction)</code> using the given account id</p>

<p>Operations can be added to the transaction via their corresponding builder methods, and
each returns the TransactionBuilder object so they can be chained together. After adding
the desired operations, call the <code>build()</code> method on the <code>TransactionBuilder</code> to return a fully
constructed <code>[Transaction](Transaction)</code> that can be signed. The returned transaction will contain
signature from the source account.</p>

<p>The following code example creates a new transaction with [createAccount](#Operation.createAccount) and
[payment](#Operation.payment) operations.
The Transaction's source account first funds <code>destinationA</code>, then sends
a payment to <code>destinationB</code>. The built transaction is then signed by <code>sourceKeypair</code>.</p>

<pre class="prettyprint source"><code>var transaction = new TransactionBuilder(source)
  .addOperation(Operation.createAccount({
            destination: destinationA,
            startingBalance: &quot;20&quot;
        }) // &lt;- funds and creates destinationA
        .addOperation(Operation.payment({
            destination: destinationB,
            amount: &quot;100&quot;
            asset: Asset.native()
        }) // &lt;- sends 100 XLM to destinationB
  .build();

transaction.sign(sourceKeypair);</code></pre>


| Param | Type | Description |
| --- | --- | --- |
| sourceAccount | <code>string</code> | <p>The source account for this transaction.</p> |
| [opts] | <code>object</code> |  |
| [opts.timebounds] | <code>object</code> | <p>The timebounds for the validity of this transaction.</p> |
| [opts.timebounds.minTime] | <code>string</code> | <p>64 bit unix timestamp</p> |
| [opts.timebounds.maxTime] | <code>string</code> | <p>64 bit unix timestamp</p> |
| [opts.memo] | [<code>Memo</code>](#Memo) | <p>The memo for the transaction</p> |

