import { FaTrash, FaPlus, FaNotdef, FaGolang } from "react-icons/fa6";

import { IconType } from "react-icons";
import {
  SiReact,
  SiAngular,
  SiVuedotjs,
  SiSvelte,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiBootstrap,
  SiTailwindcss,
  SiSass,
  SiLess,
  SiRedux,
  SiNextdotjs,
  SiGatsby,
  SiJquery,
  SiWebpack,
  SiBabel,
  SiGraphql,
  SiApollographql,
  SiNuxtdotjs,
  SiElectron,
  SiFlutter,
  SiSwift,
  SiKotlin,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiFlask,
  SiRubyonrails,
  SiSpringboot,
  SiLaravel,
  SiPhp,
  SiPython,
  SiCsharp,
  SiDotnet,
  SiRust,
  SiElixir,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiMongodb,
  SiRedis,
  SiFirebase,
  SiDocker,
  SiKubernetes,
  SiAmazonaws,
  SiMicrosoftazure,
  SiGooglecloud,
  SiGit,
  SiGithub,
  SiGitlab,
  SiJenkins,
  SiCircleci,
  SiTravisci,
  SiTerraform,
  SiAnsible,
  SiChef,
  SiPuppet,
  SiJira,
  SiConfluence,
  SiTrello,
  SiSlack,
  SiNotion,
  SiFigma,
  SiAdobexd,
  SiSketch,
  SiInvision,
  SiVim,
  SiVisualstudiocode,
  SiIntellijidea,
  SiSublimetext,
  SiPycharm,
  SiXcode,
  SiAndroidstudio,
  SiUnity,
  SiUnrealengine,
  SiBlender,
  SiAutodesk,
  SiR,
  SiApachehadoop,
  SiApachespark,
  SiApachekafka,
  SiTableau,
  SiPowerbi,
  SiMaterialdesign,
  SiEclipseide,
  SiNestjs,
  SiJsonwebtokens,
  SiLinux,
  SiTypeform,
  SiNx,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { ISkill } from "../store/dtos/resume-profile.dto";

export const getIconByName = (name: string, size?: number,className?:string): any => {
  switch (name) {
    case "Nx-Monorepo":
      return <SiNx size={size} className={className}/>;
    case "Typeorm":
      return <SiTypeform size={size} className={className}/>;
    case "Linux":
      return <SiLinux size={size} className={className}/>;
    case "Jwt":
      return <SiJsonwebtokens size={size} className={className}/>;
    case "Nestjs":
      return <SiNestjs size={size} className={className}/>;
    case "React":
      return <SiReact size={size} className={className}/>;
    case "Angular":
      return <SiAngular size={size} className={className}/>;
    case "Vue.js":
      return <SiVuedotjs size={size} className={className}/>;
    case "Svelte":
      return <SiSvelte size={size} className={className}/>;
    case "HTML5":
      return <SiHtml5 size={size} className={className}/>;
    case "CSS3":
      return <SiCss3 size={size} className={className}/>;
    case "JavaScript":
      return <SiJavascript size={size} className={className}/>;
    case "TypeScript":
      return <SiTypescript size={size} className={className}/>;
    case "Bootstrap":
      return <SiBootstrap size={size} className={className}/>;
    case "Tailwind CSS":
      return <SiTailwindcss size={size} className={className}/>;
    case "Material-UI":
      return <SiMaterialdesign size={size} className={className}/>;
    case "SASS/SCSS":
      return <SiSass size={size} className={className}/>;
    case "Less":
      return <SiLess size={size} className={className}/>;
    case "Redux":
      return <SiRedux size={size} className={className}/>;
    case "Next.js":
      return <SiNextdotjs size={size} className={className}/>;
    case "Gatsby":
      return <SiGatsby size={size} className={className}/>;
    case "jQuery":
      return <SiJquery size={size} className={className}/>;
    case "Webpack":
      return <SiWebpack size={size} className={className}/>;
    case "Babel":
      return <SiBabel size={size} className={className}/>;
    case "GraphQL":
      return <SiGraphql size={size} className={className}/>;
    case "Apollo Client":
      return <SiApollographql size={size} className={className}/>;
    case "Vuex":
      return <SiVuedotjs size={size} className={className}/>;
    case "Nuxt.js":
      return <SiNuxtdotjs size={size} className={className}/>;
    case "Electron":
      return <SiElectron size={size} className={className}/>;
    case "Flutter":
      return <SiFlutter size={size} className={className}/>;
    case "Swift":
      return <SiSwift size={size} className={className}/>;
    case "Kotlin":
      return <SiKotlin size={size} className={className}/>;

    case "Java":
      return <FaJava size={size} className={className}/>;
    case "Node.js":
      return <SiNodedotjs size={size} className={className}/>;
    case "Express.js":
      return <SiExpress size={size} className={className}/>;
    case "Django":
      return <SiDjango size={size} className={className}/>;
    case "Flask":
      return <SiFlask size={size} className={className}/>;
    case "Ruby on Rails":
      return <SiRubyonrails size={size} className={className}/>;
    case "Spring Boot":
      return <SiSpringboot size={size} className={className}/>;
    case "Laravel":
      return <SiLaravel size={size} className={className}/>;
    case "PHP":
      return <SiPhp size={size} className={className}/>;
    case "Python":
      return <SiPython size={size} className={className}/>;
    case "C#":
      return <SiCsharp size={size} className={className}/>;
    case ".NET Core":
      return <SiDotnet size={size} className={className}/>;
    case "ASP.NET":
      return <SiDotnet size={size} className={className}/>;
    case "Go":
      return <FaGolang size={size} className={className}/>;
    case "Rust":
      return <SiRust size={size} className={className}/>;
    case "Elixir":
      return <SiElixir size={size} className={className}/>;
    case "PostgreSQL":
      return <SiPostgresql size={size} className={className}/>;
    case "MySQL":
      return <SiMysql size={size} className={className}/>;
    case "SQLite":
      return <SiSqlite size={size} className={className}/>;
    case "MongoDB":
      return <SiMongodb size={size} className={className}/>;
    case "Redis":
      return <SiRedis size={size} className={className}/>;
    case "Firebase":
      return <SiFirebase size={size} className={className}/>;
    case "Docker":
      return <SiDocker size={size} className={className}/>;
    case "Kubernetes":
      return <SiKubernetes size={size} className={className}/>;
    case "AWS":
      return <SiAmazonaws size={size} className={className}/>;
    case "Azure":
      return <SiMicrosoftazure size={size} className={className}/>;
    case "Google Cloud":
      return <SiGooglecloud size={size} className={className}/>;
    case "Git":
      return <SiGit size={size} className={className}/>;
    case "GitHub":
      return <SiGithub size={size} className={className}/>;
    case "GitLab":
      return <SiGitlab size={size} className={className}/>;
    case "Jenkins":
      return <SiJenkins size={size} className={className}/>;
    case "CircleCI":
      return <SiCircleci size={size} className={className}/>;
    case "Travis CI":
      return <SiTravisci size={size} className={className}/>;
    case "Terraform":
      return <SiTerraform size={size} className={className}/>;
    case "Ansible":
      return <SiAnsible size={size} className={className}/>;
    case "Chef":
      return <SiChef size={size} className={className}/>;
    case "Puppet":
      return <SiPuppet size={size} className={className}/>;
    case "Jira":
      return <SiJira size={size} className={className}/>;
    case "Confluence":
      return <SiConfluence size={size} className={className}/>;
    case "Trello":
      return <SiTrello size={size} className={className}/>;
    case "Slack":
      return <SiSlack size={size} className={className}/>;
    case "Notion":
      return <SiNotion size={size} className={className}/>;
    case "Figma":
      return <SiFigma size={size} className={className}/>;
    case "Adobe XD":
      return <SiAdobexd size={size} className={className}/>;
    case "Sketch":
      return <SiSketch size={size} className={className}/>;
    case "InVision":
      return <SiInvision size={size} className={className}/>;
    case "Vim":
      return <SiVim size={size} className={className}/>;
    case "Visual Studio Code":
      return <SiVisualstudiocode size={size} className={className}/>;
    case "IntelliJ IDEA":
      return <SiIntellijidea size={size} className={className}/>;
    case "Sublime Text":
      return <SiSublimetext size={size} className={className}/>;
    case "Eclipse":
      return <SiEclipseide size={size} className={className}/>;
    case "PyCharm":
      return <SiPycharm size={size} className={className}/>;
    case "Xcode":
      return <SiXcode size={size} className={className}/>;
    case "Android Studio":
      return <SiAndroidstudio size={size} className={className}/>;
    case "Unity":
      return <SiUnity size={size} className={className}/>;
    case "Unreal Engine":
      return <SiUnrealengine size={size} className={className}/>;
    case "Blender":
      return <SiBlender size={size} className={className}/>;
    case "AutoCAD":
      return <SiAutodesk size={size} className={className}/>;

    case "R":
      return <SiR size={size} className={className}/>;
    case "SAS":
      return <SiSass size={size} className={className}/>;
    case "Hadoop":
      return <SiApachehadoop size={size} className={className}/>;
    case "Spark":
      return <SiApachespark size={size} className={className}/>;
    case "Kafka":
      return <SiApachekafka size={size} className={className}/>;
    case "Tableau":
      return <SiTableau size={size} className={className}/>;
    case "Power BI":
      return <SiPowerbi size={size} className={className}/>;
    default:
      return <FaNotdef size={size} className={className}/>;
  }
}; 
export const skillsList: ISkill[] = [
  { name: "Nx-Monorepo", type: "other" },
  { name: "Typeorm", type: "backend" },
  { name: "Linux", type: "other" },
  { name: "Jwt", type: "backend" },
  { name: "Nestjs", type: "backend" },
  { name: "React", type: "frontend" },
  { name: "Angular", type: "frontend" },
  { name: "Vue.js", type: "frontend" },
  { name: "Svelte", type: "frontend" },
  { name: "HTML5", type: "frontend" },
  { name: "CSS3", type: "frontend" },
  { name: "JavaScript", type: "frontend" },
  { name: "TypeScript", type: "frontend" },
  { name: "Bootstrap", type: "frontend" },
  { name: "Tailwind CSS", type: "frontend" },
  { name: "Material-UI", type: "frontend" },
  { name: "SASS/SCSS", type: "frontend" },
  { name: "Less", type: "frontend" },
  { name: "Redux", type: "frontend" },
  { name: "Next.js", type: "frontend" },
  { name: "Gatsby", type: "frontend" },
  { name: "jQuery", type: "frontend" },
  { name: "Webpack", type: "frontend" },
  { name: "Babel", type: "frontend" },
  { name: "GraphQL", type: "frontend" },
  { name: "Apollo Client", type: "frontend" },
  { name: "Vuex", type: "frontend" },
  { name: "Nuxt.js", type: "frontend" },
  { name: "Electron", type: "frontend" },
  { name: "Flutter", type: "frontend" },
  { name: "Swift", type: "frontend" },
  { name: "Kotlin", type: "frontend" },
  { name: "Objective-C", type: "frontend" },
  { name: "Java", type: "backend" },
  { name: "Node.js", type: "backend" },
  { name: "Express.js", type: "backend" },
  { name: "Django", type: "backend" },
  { name: "Flask", type: "backend" },
  { name: "Ruby on Rails", type: "backend" },
  { name: "Spring Boot", type: "backend" },
  { name: "Laravel", type: "backend" },
  { name: "PHP", type: "backend" },
  { name: "Python", type: "backend" },
  { name: "C#", type: "backend" },
  { name: ".NET Core", type: "backend" },
  { name: "ASP.NET", type: "backend" },
  { name: "Go", type: "backend" },
  { name: "Rust", type: "backend" },
  { name: "Elixir", type: "backend" },
  { name: "GraphQL", type: "backend" },
  { name: "Apollo Server", type: "backend" },
  { name: "PostgreSQL", type: "backend" },
  { name: "MySQL", type: "backend" },
  { name: "SQLite", type: "backend" },
  { name: "MongoDB", type: "backend" },
  { name: "Redis", type: "backend" },
  { name: "Firebase", type: "backend" },
  { name: "Docker", type: "other" },
  { name: "Kubernetes", type: "other" },
  { name: "AWS", type: "other" },
  { name: "Azure", type: "other" },
  { name: "Google Cloud", type: "other" },
  { name: "Git", type: "other" },
  { name: "GitHub", type: "other" },
  { name: "GitLab", type: "other" },
  { name: "Jenkins", type: "other" },
  { name: "CircleCI", type: "other" },
  { name: "Travis CI", type: "other" },
  { name: "Terraform", type: "other" },
  { name: "Ansible", type: "other" },
  { name: "Chef", type: "other" },
  { name: "Puppet", type: "other" },
  { name: "Jira", type: "other" },
  { name: "Confluence", type: "other" },
  { name: "Trello", type: "other" },
  { name: "Slack", type: "other" },
  { name: "Notion", type: "other" },
  { name: "Figma", type: "other" },
  { name: "Adobe XD", type: "other" },
  { name: "Sketch", type: "other" },
  { name: "InVision", type: "other" },
  { name: "Vim", type: "other" },
  { name: "Visual Studio Code", type: "other" },
  { name: "IntelliJ IDEA", type: "other" },
  { name: "Sublime Text", type: "other" },
  { name: "Eclipse", type: "other" },
  { name: "PyCharm", type: "other" },
  { name: "Xcode", type: "other" },
  { name: "Android Studio", type: "other" },
  { name: "Unity", type: "other" },
  { name: "Unreal Engine", type: "other" },
  { name: "Blender", type: "other" },
  { name: "AutoCAD", type: "other" },
  { name: "MATLAB", type: "other" },
  { name: "R", type: "other" },
  { name: "SAS", type: "other" },
  { name: "Hadoop", type: "other" },
  { name: "Spark", type: "other" },
  { name: "Kafka", type: "other" },
  { name: "Tableau", type: "other" },
  { name: "Power BI", type: "other" },
];

export const groupSkillsByType = (skills: ISkill[]) => {
  return skills.reduce(
    (acc, skill) => {
      if (skill.type === "frontend") {
        acc.frontend.push(skill);
      } else if (skill.type === "backend") {
        acc.backend.push(skill);
      } else {
        acc.other.push(skill);
      }
      return acc;
    },
    { frontend: [], backend: [], other: [] } as {
      frontend: ISkill[];
      backend: ISkill[];
      other: ISkill[];
    }
  );
};
