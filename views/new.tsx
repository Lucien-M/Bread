const React = require('react')
const Default = require('./layouts/default')

function New({ bakers}) {
  return (
    <Default>
      <h2>Add a new bread</h2>
      <div className="newButton">
        <a href="/breads"><button>Back to the index page</button></a>
      </div>
      <form action="/breads" method="POST">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          required
        />
        <label htmlFor="image">Image</label>
        <input
          type="text"
          name="image"
          id="image" />
        <label htmlFor="baker">Baker</label>
        <select name="baker" id="baker">
          {
            bakers.map((baker) =>{
              return(
                <option value={baker.id} key={baker.id}>{baker.name}</option>
              )
            })
          }
          {/* <option value="Rachel">Rachel</option>
          <option value="Monica">Monica</option>
          <option value="Joey">Joey</option>
          <option value="Chandler">Chandler</option>
          <option value="Ross">Ross</option>
          <option value="Phoebe">Phoebe</option> */}
        </select>
        <label htmlFor="hasGluten">Has Gluten?</label>
        <input
          type="checkbox"
          name="hasGluten"
          id="hasGluten"
          defaultChecked
        />
        <br />
        <input type="submit" />
      </form>
    </Default>
  )
}

module.exports = New
