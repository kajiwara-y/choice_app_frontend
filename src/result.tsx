import React from "react"

type Props = {
  color?: string;
}

const Table: React.VFC<Props> = ({ color = "red" }) => {

  return (
    <div style={{ color }}>
      ...
    </div>
  );
};
export default Table;