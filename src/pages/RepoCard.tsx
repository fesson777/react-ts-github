import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import { Link, useParams } from "react-router-dom";
import { Repo } from "../interfaces";

export default function RepoCard() {
  const { loading, repos } = useContext(Context);
  const [repo, setRepo] = useState({} as Repo);

  const params = useParams<{ id: string }>();

  useEffect(() => {
    const { id } = params;
    if (id) {
      const repo = repos.find((repo) => repo.id === Number(id));
      if (repo) {
        setRepo(repo);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <p>Загрузка...</p>;
  }
  // const {{id:{owner: {avatar_url}}}  } = repos;

  return (
    <React.Fragment>
      <Link to="/" className="btn btn-primary">
        На главную
      </Link>
      <div className="">
        <div className="">
          {/* <img style={{ width: "150px" }} src={avatar_url} alt={name} /> */}
          <div>{repo.name}</div>
          <div>{repo.stargazers_count}</div>
          <div>{repo.updated_at}</div>
        </div>
        <div className="col"></div>
      </div>
    </React.Fragment>
  );
}
