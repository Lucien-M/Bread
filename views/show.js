"use strict";
const React = require('react');
const Default = require('./layouts/default');
function show({ bread, id }) {
    return (<Default>
      <h3>{bread.name}</h3>
      <a href={`/breads/${bread.id}/edit`}><button>Edit</button></a>

      <p>
        and it
        {bread.hasGluten
            ? <span> does </span>
            : <span> does NOT </span>}
        have gluten.
      </p>

      <img src={bread.image} alt={bread.name}/>
      <p>{bread.getBakedBy()}</p>
      <form action={`/breads/${bread.id}?_method=DELETE`} method="POST">
        <input type='submit' value="DELETE"/>
      </form>

      <li><a href="/breads">Go home</a></li>
    </Default>);
}
module.exports = show;
