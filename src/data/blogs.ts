export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  featured?: boolean;
  seoTitle: string;
  seoDescription: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      paragraphs: string[];
      bullets?: string[];
    }[];
  };
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-i-structure-scalable-nestjs-applications",
    title: "How I Structure Scalable NestJS Applications",
    excerpt:
      "A practical look at how I organize modules, business logic, and APIs in NestJS projects that need to stay maintainable as they grow.",
    category: "NestJS",
    date: "April 2026",
    readingTime: "6 min read",
    featured: true,
    seoTitle: "How I Structure Scalable NestJS Applications | Lazar Panović",
    seoDescription:
      "A practical guide to structuring scalable NestJS applications with clear modules, business logic, validation, and maintainable backend architecture.",
    content: {
      intro:
        "When a NestJS project is small, almost any structure can feel good enough. The real challenge starts when the application grows, business rules become more complex, and multiple modules begin to depend on each other. My goal is always to keep the structure simple enough to move fast, but clear enough to scale.",
      sections: [
        {
          heading: "Start with the domain, not the framework",
          paragraphs: [
            "I try not to structure backend code around technical folders alone. Instead of thinking first about controllers, services, and DTOs, I start from the business domains the application actually has.",
            "That usually leads to modules that represent real product concepts: invoices, users, reports, billing periods, or integrations. NestJS works especially well when modules match the language of the business.",
          ],
          bullets: [
            "One module should solve one clear business problem",
            "Shared code should stay minimal and intentional",
            "Cross-module dependencies should be explicit",
          ],
        },
        {
          heading: "Keep business logic out of controllers",
          paragraphs: [
            "Controllers should stay thin. Their job is to receive the request, validate input, and delegate to the service layer. Once controllers start containing conditionals, mapping, and domain rules, they become harder to maintain and test.",
            "I prefer services that are focused, readable, and close to the language of the product. That keeps the application easier to extend when requirements change.",
          ],
        },
        {
          heading: "Separate data access from orchestration",
          paragraphs: [
            "In larger applications, a service often does too much if it is responsible for both database access and workflow orchestration. A better pattern is to keep persistence logic predictable and let higher-level services coordinate the flow.",
            "This becomes especially useful in reporting, background jobs, or integrations where one use case touches multiple tables or external systems.",
          ],
          bullets: [
            "Repositories or query-oriented services for data access",
            "Application services for orchestration",
            "Clear boundaries between read-heavy and write-heavy flows",
          ],
        },
        {
          heading: "Validation and DTOs should reduce ambiguity",
          paragraphs: [
            "DTOs are not just there to satisfy decorators. They are a contract. Clear DTOs with strong validation reduce ambiguity between frontend and backend, improve API reliability, and make refactoring safer.",
            "I try to keep DTOs expressive and close to actual use cases rather than creating generic payload shapes that become confusing over time.",
          ],
        },
        {
          heading: "Structure for future changes",
          paragraphs: [
            "The best backend structure is not the most clever one. It is the one that makes the next change easier. When I structure NestJS applications, I am always thinking about the next module, the next feature, the next integration, and the next developer reading the code.",
            "A scalable NestJS application is usually the result of small, disciplined decisions repeated consistently.",
          ],
        },
      ],
    },
  },
  {
    slug: "working-with-postgresql-and-mssql-in-real-backend-projects",
    title: "Working with PostgreSQL and MSSQL in Real Backend Projects",
    excerpt:
      "What changes when you work with both PostgreSQL and MSSQL in production systems, and what I pay attention to when building database-driven applications.",
    category: "Databases",
    date: "April 2026",
    readingTime: "7 min read",
    seoTitle:
      "Working with PostgreSQL and MSSQL in Real Backend Projects | Lazar Panović",
    seoDescription:
      "A practical look at working with PostgreSQL and MSSQL in backend systems, including schema design, query differences, and real-world tradeoffs.",
    content: {
      intro:
        "On paper, SQL databases can look interchangeable. In real projects, they are not. PostgreSQL and MSSQL are both strong choices, but the details matter a lot when application logic, reporting, migrations, and performance become part of everyday development.",
      sections: [
        {
          heading: "The schema is only the beginning",
          paragraphs: [
            "A good schema is not just normalized and technically correct. It has to support how the product behaves, how data is queried, and how reporting is built on top of it.",
            "When working with PostgreSQL and MSSQL, I try to think beyond the table design itself and look at the full path of the data through the application.",
          ],
        },
        {
          heading: "Type differences matter more than expected",
          paragraphs: [
            "One of the first places where cross-database work becomes real is in column types. Date handling, booleans, decimals, and default values can behave differently enough to create bugs if they are treated as identical.",
            "In backend systems that use ORMs, it helps to stay aware of what the ORM abstracts well and where database-specific behavior still needs attention.",
          ],
          bullets: [
            "Numeric precision should be explicit",
            "Date and timezone handling should be deliberate",
            "Default values should be checked on both sides",
          ],
        },
        {
          heading: "Queries are shaped by the product, not only the database",
          paragraphs: [
            "In reporting-heavy systems, the database is not just storing records. It is powering summaries, comparisons, grouped views, and operational workflows.",
            "That means the quality of query design often matters just as much as the schema itself. Readability, predictable joins, and careful indexing usually pay off more than premature optimization.",
          ],
        },
        {
          heading: "Database work is product work",
          paragraphs: [
            "What I like about database-driven applications is that the data model often reveals the real complexity of the business. If the schema is confusing, the product usually becomes confusing too.",
            "Good database work is not separate from product thinking. It is one of the strongest forms of it.",
          ],
        },
      ],
    },
  },
  {
    slug: "building-full-stack-products-with-nextjs-and-nestjs",
    title: "Building Full Stack Products with Next.js and NestJS",
    excerpt:
      "Why I like the combination of Next.js and NestJS for modern product development, and how I think about the connection between frontend, backend, and data.",
    category: "Full Stack",
    date: "April 2026",
    readingTime: "6 min read",
    seoTitle:
      "Building Full Stack Products with Next.js and NestJS | Lazar Panović",
    seoDescription:
      "Why Next.js and NestJS work well together for full stack product development, from frontend delivery to API architecture and backend logic.",
    content: {
      intro:
        "A strong full stack product is not just a frontend connected to an API. The real value comes from how well the layers fit together: UI, routing, validation, backend logic, data, and product behavior. That is why I like the combination of Next.js and NestJS.",
      sections: [
        {
          heading: "Frontend and backend should speak the same language",
          paragraphs: [
            "When a frontend and backend evolve separately, friction appears quickly. The API shape becomes unclear, validation gets duplicated, and product behavior starts to feel inconsistent.",
            "With Next.js and NestJS, I like keeping the boundaries clear while still thinking about the full user flow end-to-end.",
          ],
        },
        {
          heading:
            "Next.js works best when the UI reflects real product structure",
          paragraphs: [
            "A frontend becomes easier to maintain when routing, views, and components follow the actual structure of the product instead of becoming a collection of disconnected screens.",
            "That is especially important in dashboards, internal tools, and data-heavy applications where user flows depend on backend behavior.",
          ],
        },
        {
          heading: "NestJS gives structure to backend complexity",
          paragraphs: [
            "On the backend side, NestJS gives a strong foundation for module boundaries, validation, services, integrations, and long-term maintainability.",
            "That becomes especially useful when the application grows beyond simple CRUD and starts to include reporting, jobs, auth flows, and more advanced business rules.",
          ],
        },
        {
          heading: "The best full stack work happens in the seams",
          paragraphs: [
            "The interesting part of full stack development is often not the frontend alone or the backend alone. It is the seam between them: data contracts, loading flows, validation, error handling, and how the product actually feels to use.",
            "That is where I try to spend the most attention when building modern web applications.",
          ],
        },
      ],
    },
  },
];
