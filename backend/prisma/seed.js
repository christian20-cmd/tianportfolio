// backend/prisma/seed.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tools = [
  // Langages de base / Markup
  { label: "HTML5", iconName: "SiHtml5", color: "#E34F26" },
  { label: "CSS3", iconName: "SiCss", color: "#1572B6" },
  { label: "JavaScript", iconName: "SiJavascript", color: "#F7DF1E" },
  { label: "TypeScript", iconName: "SiTypescript", color: "#3178C6" },
  { label: "Sass", iconName: "SiSass", color: "#CC6699" },
  { label: "Less", iconName: "SiLess", color: "#1D365D" },
  { label: "WebAssembly", iconName: "SiWebassembly", color: "#654FF0" },
  { label: "Markdown", iconName: "SiMarkdown", color: "#000000" },
  { label: "jQuery", iconName: "SiJquery", color: "#0769AD" },

  // Frontend
  { label: "React", iconName: "SiReact", color: "#61DAFB" },
  { label: "ReactNative", iconName: "SiReact", color: "#61DAFB" },
  { label: "Angular", iconName: "SiAngular", color: "#DD0031" },
  { label: "Vue.js", iconName: "SiVuedotjs", color: "#4FC08D" },
  { label: "Svelte", iconName: "SiSvelte", color: "#FF3E00" },
  { label: "SolidJS", iconName: "SiSolid", color: "#2C4F7C" },
  { label: "Next.js", iconName: "SiNextdotjs", color: "#000000" },
  { label: "Nuxt.js", iconName: "SiNuxt", color: "#00DC82" },
  { label: "Gatsby", iconName: "SiGatsby", color: "#663399" },
  { label: "Remix", iconName: "SiRemix", color: "#000000" },
  { label: "Astro", iconName: "SiAstro", color: "#BC52EE" },
  { label: "Tailwind", iconName: "SiTailwindcss", color: "#06B6D4" },
  { label: "Bootstrap", iconName: "SiBootstrap", color: "#7952B3" },
  { label: "Material UI", iconName: "SiMui", color: "#0081CB" },
  { label: "Chakra UI", iconName: "SiChakraui", color: "#319795" },
  { label: "Ant Design", iconName: "SiAntdesign", color: "#0170FE" },
  { label: "Electron", iconName: "SiElectron", color: "#47848F" },

  // Backend
  { label: "Node.js", iconName: "SiNodedotjs", color: "#339933" },
  { label: "Express.js", iconName: "SiExpress", color: "#000000" },
  { label: "NestJS", iconName: "SiNestjs", color: "#E0234E" },
  { label: "Django", iconName: "SiDjango", color: "#092E20" },
  { label: "Flask", iconName: "SiFlask", color: "#000000" },
  { label: "FastAPI", iconName: "SiFastapi", color: "#009688" },
  { label: "Python", iconName: "SiPython", color: "#3776AB" },
  { label: "PHP", iconName: "SiPhp", color: "#777BB4" },
  { label: "Laravel", iconName: "SiLaravel", color: "#FF2D20" },
  { label: "Symfony", iconName: "SiSymfony", color: "#000000" },
  { label: "Ruby", iconName: "SiRuby", color: "#CC342D" },
  { label: "Ruby on Rails", iconName: "SiRubyonrails", color: "#CC0000" },
  { label: "Dotnet", iconName: "SiDotnet", color: "#512BD4" },
  { label: "Java", iconName: "SiOpenjdk", color: "#437291" },
  { label: "Spring", iconName: "SiSpring", color: "#6DB33F" },
  { label: "Spring Boot", iconName: "SiSpringboot", color: "#6DB33F" },
  { label: "Go", iconName: "SiGo", color: "#00ADD8" },
  { label: "Rust", iconName: "SiRust", color: "#000000" },
  { label: "Kotlin", iconName: "SiKotlin", color: "#7F52FF" },
  { label: "Deno", iconName: "SiDeno", color: "#000000" },
  { label: "Bun", iconName: "SiBun", color: "#000000" },
  { label: "Scala", iconName: "SiScala", color: "#DC322F" },
  { label: "Elixir", iconName: "SiElixir", color: "#4B275F" },
  { label: "Erlang", iconName: "SiErlang", color: "#A90533" },
  { label: "Haskell", iconName: "SiHaskell", color: "#5D4F85" },
  { label: "Clojure", iconName: "SiClojure", color: "#5881D8" },
  { label: "Perl", iconName: "SiPerl", color: "#39457E" },
  { label: "Lua", iconName: "SiLua", color: "#2C2D72" },
  { label: "Julia", iconName: "SiJulia", color: "#9558B2" },
  { label: "Solidity", iconName: "SiSolidity", color: "#363636" },
  { label: "C++", iconName: "SiCplusplus", color: "#00599C" },
  { label: "C", iconName: "SiC", color: "#A8B9CC" },

  // Mobile
  { label: "Flutter", iconName: "SiFlutter", color: "#02569B" },
  { label: "Dart", iconName: "SiDart", color: "#0175C2" },
  { label: "Swift", iconName: "SiSwift", color: "#F05138" },
  { label: "Xcode", iconName: "SiXcode", color: "#147EFB" },
  { label: "Android Studio", iconName: "SiAndroidstudio", color: "#3DDC84" },
  { label: "Android", iconName: "SiAndroid", color: "#3DDC84" },
  { label: "Ionic", iconName: "SiIonic", color: "#3880FF" },
  { label: "Cordova", iconName: "SiApachecordova", color: "#E8E8E8" },
  { label: "Capacitor", iconName: "SiCapacitor", color: "#119EFF" },
  { label: "Expo", iconName: "SiExpo", color: "#000020" },
  { label: "Tauri", iconName: "SiTauri", color: "#FFC131" },

  // Jeux / 3D
  { label: "Unity", iconName: "SiUnity", color: "#FFFFFF" },
  { label: "Unreal Engine", iconName: "SiUnrealengine", color: "#0E1128" },
  { label: "Godot Engine", iconName: "SiGodotengine", color: "#478CBF" },
  { label: "Blender", iconName: "SiBlender", color: "#F5792A" },
  { label: "Three.js", iconName: "SiThreedotjs", color: "#000000" },

  // Data / IA
  { label: "TensorFlow", iconName: "SiTensorflow", color: "#FF6F00" },
  { label: "PyTorch", iconName: "SiPytorch", color: "#EE4C2C" },
  { label: "Keras", iconName: "SiKeras", color: "#D00000" },
  { label: "Pandas", iconName: "SiPandas", color: "#150458" },
  { label: "NumPy", iconName: "SiNumpy", color: "#013243" },
  { label: "Scikit-learn", iconName: "SiScikitlearn", color: "#F7931E" },
  { label: "Jupyter", iconName: "SiJupyter", color: "#F37626" },
  { label: "Anaconda", iconName: "SiAnaconda", color: "#44A833" },
  { label: "OpenCV", iconName: "SiOpencv", color: "#5C3EE8" },

  // Databases
  { label: "MongoDB", iconName: "SiMongodb", color: "#47A248" },
  { label: "PostgreSQL", iconName: "SiPostgresql", color: "#4169E1" },
  { label: "MySQL", iconName: "SiMysql", color: "#4479A1" },
  { label: "SQLite", iconName: "SiSqlite", color: "#003B57" },
  { label: "Redis", iconName: "SiRedis", color: "#DC382D" },
  { label: "Firebase", iconName: "SiFirebase", color: "#FFCA28" },
  { label: "Supabase", iconName: "SiSupabase", color: "#3ECF8E" },
  { label: "Prisma", iconName: "SiPrisma", color: "#0EA5A4" },
  { label: "Elasticsearch", iconName: "SiElasticsearch", color: "#005571" },
  { label: "Cassandra", iconName: "SiApachecassandra", color: "#1287B1" },
  { label: "Neo4j", iconName: "SiNeo4J", color: "#4581C3" },
  { label: "MariaDB", iconName: "SiMariadb", color: "#003545" },
  { label: "Sequelize", iconName: "SiSequelize", color: "#52B0E7" },

  // Messaging / Streaming
  { label: "RabbitMQ", iconName: "SiRabbitmq", color: "#FF6600" },
  { label: "Kafka", iconName: "SiApachekafka", color: "#231F20" },

  // DevOps / Tools
  { label: "Git", iconName: "SiGit", color: "#F05032" },
  { label: "GitHub", iconName: "SiGithub", color: "#181717" },
  { label: "GitLab", iconName: "SiGitlab", color: "#FC6D26" },
  { label: "Bitbucket", iconName: "SiBitbucket", color: "#0052CC" },
  { label: "Docker", iconName: "SiDocker", color: "#2496ED" },
  { label: "Kubernetes", iconName: "SiKubernetes", color: "#326CE5" },
  { label: "Jenkins", iconName: "SiJenkins", color: "#D24939" },
  { label: "GitHub Actions", iconName: "SiGithubactions", color: "#2088FF" },
  { label: "CircleCI", iconName: "SiCircleci", color: "#343434" },
  { label: "Travis CI", iconName: "SiTravisci", color: "#3EAAAF" },
  { label: "Bitrise", iconName: "SiBitrise", color: "#683D87" },
  { label: "Fastlane", iconName: "SiFastlane", color: "#00F200" },
  { label: "Vagrant", iconName: "SiVagrant", color: "#1868F2" },
  { label: "Chef", iconName: "SiChef", color: "#F09820" },
  { label: "Puppet", iconName: "SiPuppet", color: "#FFAE1A" },
  { label: "Terraform", iconName: "SiTerraform", color: "#7B42BC" },
  { label: "Ansible", iconName: "SiAnsible", color: "#EE0000" },
  { label: "Vercel", iconName: "SiVercel", color: "#000000" },
  { label: "Netlify", iconName: "SiNetlify", color: "#00C7B7" },
  { label: "Cloudflare", iconName: "SiCloudflare", color: "#F38020" },
  { label: "Linux", iconName: "SiLinux", color: "#FCC624" },
  { label: "Nginx", iconName: "SiNginx", color: "#009639" },
  { label: "Apache", iconName: "SiApache", color: "#D22128" },

  // Build tools / package managers
  { label: "Webpack", iconName: "SiWebpack", color: "#8DD6F9" },
  { label: "Vite", iconName: "SiVite", color: "#646CFF" },
  { label: "Babel", iconName: "SiBabel", color: "#F9DC3E" },
  { label: "Rollup.js", iconName: "SiRollupdotjs", color: "#EC4A3F" },
  { label: "esbuild", iconName: "SiEsbuild", color: "#FFCF00" },
  { label: "Yarn", iconName: "SiYarn", color: "#2C8EBB" },
  { label: "npm", iconName: "SiNpm", color: "#CB3837" },
  { label: "pnpm", iconName: "SiPnpm", color: "#F69220" },
  { label: "Turborepo", iconName: "SiTurborepo", color: "#EF4444" },
  { label: "Nx", iconName: "SiNx", color: "#143055" },
  { label: "Gradle", iconName: "SiGradle", color: "#02303A" },
  { label: "Maven", iconName: "SiApachemaven", color: "#C71A36" },
  { label: "NuGet", iconName: "SiNuget", color: "#004880" },
  { label: "Composer", iconName: "SiComposer", color: "#885630" },
  { label: "CocoaPods", iconName: "SiCocoapods", color: "#EE3322" },
  { label: "Homebrew", iconName: "SiHomebrew", color: "#FBB040" },

  // Testing / Quality
  { label: "Jest", iconName: "SiJest", color: "#C21325" },
  { label: "Mocha", iconName: "SiMocha", color: "#8D6748" },
  { label: "Cypress", iconName: "SiCypress", color: "#17202C" },
  { label: "Selenium", iconName: "SiSelenium", color: "#43B02A" },
  { label: "Puppeteer", iconName: "SiPuppeteer", color: "#40B5A4" },
  { label: "Vitest", iconName: "SiVitest", color: "#6E9F18" },
  { label: "ESLint", iconName: "SiEslint", color: "#4B32C3" },
  { label: "Prettier", iconName: "SiPrettier", color: "#F7B93E" },
  { label: "Storybook", iconName: "SiStorybook", color: "#FF4785" },

  // State / Data
  { label: "Redux", iconName: "SiRedux", color: "#764ABC" },
  { label: "MobX", iconName: "SiMobx", color: "#FF9955" },
  { label: "Zustand", iconName: "Zustand", color: "#443E38" }, // pas d'icône dans aucun pack -> fallback générique côté frontend
  { label: "GraphQL", iconName: "SiGraphql", color: "#E535AB" },
  { label: "Apollo", iconName: "SiApollographql", color: "#311C87" },
  { label: "Socket.io", iconName: "SiSocketdotio", color: "#010101" },
  { label: "Swagger", iconName: "SiSwagger", color: "#85EA2D" },

  // Éditeurs / IDE
  { label: "Vim", iconName: "SiVim", color: "#019733" },
  { label: "Neovim", iconName: "SiNeovim", color: "#57A143" },
  { label: "GNU Emacs", iconName: "SiGnuemacs", color: "#7F5AB6" },
  { label: "Sublime Text", iconName: "SiSublimetext", color: "#FF9800" },
  { label: "IntelliJ IDEA", iconName: "SiIntellijidea", color: "#000000" },
  { label: "WebStorm", iconName: "SiWebstorm", color: "#000000" },
  { label: "Eclipse", iconName: "SiEclipseide", color: "#2C2255" },

  // UI / Design
  { label: "Figma", iconName: "SiFigma", color: "#F24E1E" },
  { label: "Sketch", iconName: "SiSketch", color: "#F7B500" },
  { label: "Adobe XD", iconName: "SiAdobexd", color: "#FF61F6" }, // -> mappé vers TbBrandAdobeXd dans le registry frontend
  { label: "Framer", iconName: "SiFramer", color: "#0055FF" },
  { label: "Lucide", iconName: "SiLucide", color: "#111827" },

  // Analytics / Monitoring
  { label: "Sentry", iconName: "SiSentry", color: "#FB4226" },
  { label: "Prometheus", iconName: "SiPrometheus", color: "#E6522C" },
  { label: "Grafana", iconName: "SiGrafana", color: "#F46800" },
  { label: "Google Analytics", iconName: "SiGoogleanalytics", color: "#F5C300" },
  { label: "Datadog", iconName: "SiDatadog", color: "#632CA6" },

  // Cloud
  { label: "GCP", iconName: "SiGooglecloud", color: "#4285F4" },
  { label: "DigitalOcean", iconName: "SiDigitalocean", color: "#0080FF" },
  // NB: AWS, Azure et Heroku n'ont plus d'icône dans Simple Icons (marque déposée retirée)

  // CMS / E-commerce
  { label: "WordPress", iconName: "SiWordpress", color: "#21759B" },
  { label: "Strapi", iconName: "SiStrapi", color: "#4945FF" },
  { label: "Contentful", iconName: "SiContentful", color: "#2478CC" },
  { label: "Sanity", iconName: "SiSanity", color: "#F03E2F" },
  { label: "Shopify", iconName: "SiShopify", color: "#7AB55C" },
  { label: "WooCommerce", iconName: "SiWoocommerce", color: "#96588A" },
  { label: "Webflow", iconName: "SiWebflow", color: "#4353FF" },

  // Paiement
  { label: "Stripe", iconName: "SiStripe", color: "#635BFF" },
  { label: "PayPal", iconName: "SiPaypal", color: "#00457C" },

  // Gestion de projet / Collaboration
  { label: "Jira", iconName: "SiJira", color: "#0052CC" },
  { label: "Trello", iconName: "SiTrello", color: "#0052CC" },
  { label: "Notion", iconName: "SiNotion", color: "#000000" },
  { label: "Discord", iconName: "SiDiscord", color: "#5865F2" },
  { label: "Confluence", iconName: "SiConfluence", color: "#172B4D" },

  // Utilities
  { label: "Lodash", iconName: "SiLodash", color: "#3492FF" },
  { label: "GSAP", iconName: "SiGsap", color: "#0FE84A" },
  { label: "Chart.js", iconName: "SiChartdotjs", color: "#FF6384" },
  { label: "D3.js", iconName: "SiD3", color: "#F9A03C" },
  { label: "Postman", iconName: "SiPostman", color: "#FF6C37" },
  { label: "Insomnia", iconName: "SiInsomnia", color: "#4000BF" },
];

async function main() {
  for (const tool of tools) {
    await prisma.tool.upsert({
      where: { label: tool.label },
      update: {
        iconName: tool.iconName,
        color: tool.color,
      },
      create: tool,
    });
  }

  console.log(`${tools.length} tools créés/vérifiés.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());