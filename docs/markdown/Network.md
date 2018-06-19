<a name="Network+Network"></a>

## Network.Network
**Kind**: instance class of <code>Network</code>  
<a name="new_Network+Network_new"></a>

### new exports.Network(networkPassphrase)
<p>The Network class provides helper methods to get the passphrase or id for different
stellar networks.  It also provides the [current](#Network.current) class method that returns the network
that will be used by this process for the purposes of generating signatures.</p>
<p>The test network is the default, but you can also override the default by using the <code>use</code>,
<code>usePublicNetwork</code> and <code>useTestNetwork</code> helper methods.</p>
<p>Creates a new <code>Network</code> object.</p>


| Param | Type | Description |
| --- | --- | --- |
| networkPassphrase | <code>string</code> | <p>Network passphrase</p> |

