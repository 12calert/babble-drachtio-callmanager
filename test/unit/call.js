const expect = require( "chai" ).expect
const callstore = require( "../../lib/call.js" )
const srf = require( "../mock/srf.js" )

describe( "call.js", function() {

  it( `set remote name and id`, async function() {
    let srfscenario = new srf.srfscenario()

    let newcallcalled = false
    srfscenario.options.em.on( "call.new", ( /*newcall*/ ) => {
      newcallcalled = true
    } )

    let call = await new Promise( ( resolve ) => {
      srfscenario.oncall( async ( call ) => { resolve( call ) } )
      srfscenario.inbound()
    } )

    call.setremotename("foo")
    call.setremoteid("123456789")

    expect(call._remote.name).equals("foo")
    expect(call._remote.id).equals("123456789")

    // TODO we set the remote id using "setremoteid", but getter returns it as "user" 
    // the names mismatch and can be confusing, we might consider some polishing here?
    expect(call.remote.name).equals("foo")
    expect(call.remote.user).equals("123456789")
} )

} )
