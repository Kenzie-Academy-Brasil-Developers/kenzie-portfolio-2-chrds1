import {
  Project as ProjectWrapper,
  ProjectTitle,
  ProjectStack,
  ProjectStackTech,
  ProjectLink,
  ProjectLinks,
} from "./style";

import { Text } from "@/styles/Text";
import { useEffect, useState } from "react";
import { FaGithub, FaShare } from "react-icons/fa";
import { userData } from "@/utils/userData";
import { ReposData } from "@/utils/ReposData";

interface ReposType {
  id: number;
  name: string;
  language: string;
  description: string;
  html_url: string;
  homepage: string;
  link: string;
}

export const Project = (): JSX.Element => {
  const [repositories, setRepositories] = useState<ReposType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://api.github.com/users/${userData.githubUser}/repos`
      );
      const json = await data.json();
      setRepositories(json);
      return json;
    };
    fetchData();
  }, []);

  const filterRepositories = repositories?.filter((item)=>item.name !== "chrds1")

  return (
    <>
      {filterRepositories?.map((repository) => (
        <ProjectWrapper key={repository.id}>
          <ProjectTitle
            as="h2"
            type="heading3"
            css={{ marginBottom: "$3" }}
            color="grey4"
          >
            {repository.name}
          </ProjectTitle>
          {
            ReposData.map((item, index)=>
              item.name === repository.name
              ?
              <div key={index}>
                <img src={item.img[0]} alt={item.name} style={{width:"100%"}}/>
                <Text type="body1" color="grey2">
                  {repository.description?.substring(0,150)}
                  ...
                </Text>
              </div>
              :
              <div key={index}>
              </div>
            )
          }

          {/*<ProjectStack>
            <Text type="body2" color="grey2">
              Linguagem:
            </Text>
            {repository.language ? (
              <ProjectStackTech>
                <Text color="grey2" type="body2">
                  {repository.language}
                </Text>
              </ProjectStackTech>
            ) : (
              <ProjectStackTech>
                <Text color="grey2" type="body2">
                  Not identified
                </Text>
              </ProjectStackTech>
            )}
          </ProjectStack>
            */}
          <ProjectLinks>
            <ProjectLink target="_blank" href={repository.html_url}>
              <FaGithub /> Github Code
            </ProjectLink>
            {ReposData.map((item, index)=>
              item.name === repository.name
              ?
              <ProjectLink key={index} target="_blank" href={item.link}>
                <FaShare /> Aplicação
              </ProjectLink>
              :
              ""
            )}
          </ProjectLinks>
        </ProjectWrapper>
      ))}
    </>
  );
};
