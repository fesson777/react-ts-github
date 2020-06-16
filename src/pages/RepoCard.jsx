import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import { Link, useParams } from "react-router-dom";

export default function RepoCard() {
  const { loading, repos, getContributors, users } = useContext(Context);
  const [repo, setRepo] = useState({});
  const [contr, setContr] = useState("");

  const params = useParams();

  useEffect(() => {
    const { id } = params;
    if (id) {
      const repo = repos.find((repo) => repo.id === Number(id));
      if (repo) {
        setRepo(repo);
        const {
          name,
          owner: { login },
        } = repo;
        getContributors(name, login);
      }
    }
  }, [repos]); // eslint-disable-line react-hooks/exhaustive-deps

  let arr = [];
  useEffect(() => {
    if (users.length) {
      console.log("RepoCard -> users.length", users.length);
      users.map((user, i) => {
        if (i < 10) {
          return arr.push(user.login);
        }
        return "";
      });
      setContr(arr.join(", "));
    } else {
      setContr("");
    }
  }, [users]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <React.Fragment>
      <Link to="/" className="btn btn-primary">
        На главную
      </Link>
      {repo.owner ? (
        <div className="repo-card">
          <div className="card card-block-1">
            <p>
              Репозиторий: <strong>{repo.name}</strong>
            </p>
            <p>
              Звезды: <strong>{repo.stargazers_count}</strong>
            </p>
            <p>
              Последний коммит: {new Date(repo.updated_at).toLocaleString("ru")}
            </p>
          </div>
          <div className="card card-block-2">
            <div className="av">
              {repo.owner.avatar_url ? (
                <img
                  style={{ width: "150px" }}
                  src={repo.owner.avatar_url}
                  alt={"avatar"}
                />
              ) : null}
            </div>
            <div className="nick">
              <p>
                Nickname: <strong>{repo.owner.login}</strong>
                <br />
              </p>
              <a
                href={repo.owner.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.owner.html_url}
              </a>
            </div>
          </div>
          {repo.language ? (
            <div className="card card-block-3">
              <div>
                <p>Список используемых языков в репозитории: </p>
              </div>
              <div>
                <strong>{repo.language}</strong>
              </div>
            </div>
          ) : null}

          <div className="card card-block-4">
            <p>10 наиболее активных контрибьютеров: </p>
            <strong>{contr || <p>Контрибьютеров нет</p>}</strong>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}
