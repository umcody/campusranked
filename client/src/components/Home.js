import React from "react";

function createLink(item) {
  return <a href={"/ranked/" + item.url}>{item.name}</a>;
}

function Home(props) {
  const list = props.options.map((item) => (
    <li>
      <a href={"/ranked/" + item.url}>{item.name}</a>
    </li>
  ));

  //   const fuse = new Fuse(props.searchBody, options);

  return (
    <div id="home">
      <p>Most popular:</p>
      {list}
      <p>Frequently visited:</p>
      {list}
      <p>Featured:</p>
      {list}
    </div>
  );
}

export default Home;
