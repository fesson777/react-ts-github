import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context";

interface IReposTableProps {}

export default function ReposTable() {
  const { repos } = useContext(Context);

  useEffect(() => {
    // console.log("ReposTable -> repos", repos);
  }, []);
  return (
    <>
      {repos.length && (
        <table>
          <tbody>
            <tr>
              <th>Repo name</th>
              <th>Stars</th>
              <th>Last update</th>
              <th>link to repo</th>
            </tr>
            {repos.map((repo) => {
              return (
                <tr className="repo-tr" key={repo.id}>
                  <td className="repo repo-td-link ">
                    <Link to={`/repo/${repo.id}`}>
                      {repo.owner.login}/{repo.name}
                    </Link>
                  </td>
                  <td className="repo repo-td">{repo.stargazers_count}</td>
                  <td className="repo repo-td">
                    {new Date(repo.updated_at).toLocaleString("ru")}
                  </td>
                  <td className="repo repo-td">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Перейти
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
