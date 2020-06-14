import styled from "styled-components";

export default styled.table`
  border-collapse: collapse;
  margin-top: 24px;
  width: 100%;
  thead {
    tr {
      th {
        text-align: left;
        padding: 4px 0 4px 10px;
      }
    }
  }
  tbody {
    tr {
      td {
        border-bottom: 1px solid black;
        padding: 4px 0 4px 10px;
        font-size: 18px;
        a {
          text-decoration: none;
        }
      }
    }
  }
`;
