import React from "react";
import styled from "styled-components";

function Loader() {
  return (
    <div>
      <p>Загрузка...</p>
    </div>
  );
}
export default styled(Loader)`
div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: red;
}
`
