import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context";
import Table from "./Table";

interface IReposTableProps {}

export default function ReposTable() {
  const { repos } = useContext(Context);

  return (
    <>
      {repos.length && (
        <Table>
          <thead>
            <tr>
              <th>Repo name</th>
              <th>Stars</th>
              <th>Last update</th>
              <th>link to repo</th>
            </tr>
          </thead>
          <tbody>
            {repos.map((repo) => {
              return (
                <tr key={repo.id}>
                  <td className="link ">
                    <Link to={`/repo/${repo.id}`}>
                      {repo.owner.login}/{repo.name}
                    </Link>
                  </td>
                  <td>{repo.stargazers_count}</td>
                  <td>{new Date(repo.updated_at).toLocaleString("ru")}</td>
                  <td>
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
        </Table>
      )}
    </>
  );
}
