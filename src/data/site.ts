export const site = {
  name: 'Ryan Tan',
  fullName: 'Ryan Tan Zheng Rong',
  title: 'Software engineer',
  tagline: 'I build quiet backend systems that stay calm when everything around them is retrying.',
  url: 'https://ryantanzr.github.io',
  email: 'ryantanzr.work@gmail.com',
  github: 'https://github.com/ryantanzr',
  linkedin: 'https://www.linkedin.com/in/rtzr/',
};

export const experience = [
  {
    role: 'Engineering Intern',
    org: 'Kredivo Group',
    place: 'Singapore',
    period: 'Jun 2026 – Present',
    points: [
      'Own end-to-end development in Go of 3 transaction micro-services (Biller, Partners, Merchant) across 4 regions: migrating VN merchant data, the seller app and its merchant dashboard; integrating 100+ PH vendors for billing products; and helping design cost-effective, scalable tech specs for fraud management.',
      'Lowered MTTR and MTTA by 20% by lifting statement coverage of 2 monorepos to 70%, redesigning 2 incident-response dashboards around golden metrics (p99, p95), and configuring Scalyr alerts to catch silent errors.',
      'Contributed to the org-wide toolkit: a semantic and contract test suite, stampede-resistant cache management on Redis, and an integration-agnostic outbox for event-driven systems.',
    ],
  },
  {
    role: 'Founding Engineer',
    org: 'Assistive Technologies',
    place: 'Singapore',
    period: 'Jun 2025 – Jun 2026',
    points: [
      'Engineered a serverless messaging app and a scalable, idempotent Medallion Architecture NLP pipeline for daily sentiment analysis, giving 50 families with special-needs children actionable developmental insights.',
      'Automated cross-platform delivery with CI/CD for iOS/Android and AWS serverless backends, canary deployments for near-zero-downtime releases, CloudWatch monitoring and automated rollbacks.',
      'Led a team of 8 developers refactoring the React Native codebase, cutting technical debt and reaching about 70% code coverage with unit tests and Maestro E2E tests.',
    ],
  },
  {
    role: 'Application Developer Intern',
    org: 'Accenture',
    place: 'Singapore',
    period: 'May 2024 – Aug 2024',
    points: [
      'Ran Medallion pipeline scripts as AWS Glue jobs, processing 700 tables from 12+ eServices into AWS Redshift for downstream consumption.',
    ],
  },
];

export const projects = [
  {
    name: 'Premium Subscription Reconciler',
    href: 'https://github.com/ryantanzr/Premium-Subscription-Reconciler',
    period: 'May 2026',
    stack: ['Go', 'MySQL', 'Event-time semantics', 'Locking'],
    summary: 'Keeps one canonical truth about who is entitled to what, even when store, carrier and marketplace events arrive duplicated, late or out of order.',
    blurb:
      'A multi-channel entitlement reconciler (store webhook, carrier poll, marketplace bulk revoke) that keeps a canonical truth despite at-least-once, late and out-of-order events. Idempotent state transitions via the inbox pattern, watermarking and pessimistic locking.',
  },
  {
    name: 'PeerPrep',
    href: 'https://github.com/ryantanzr/peerprep-g19',
    period: 'Jan – May 2026',
    stack: ['Python', 'MongoDB', 'Docker', 'Micro-services'],
    summary: 'Team project (five of us): a fault-tolerant question-bank service with optimistic locking, plus the data patterns and containers behind it.',
    blurb:
      'School project, team of 5. As data engineer I architected data patterns and containerisation, and built a fault-tolerant question-bank service whose REST API uses optimistic locking on versioned documents for safe concurrent writes.',
  },
];

export const skills = [
  ['Architectures', 'Micro-services, Pipe-and-Filter, Serverless'],
  ['Languages', 'Go, Java, Python, SQL'],
  ['AWS', 'Lambda, API Gateway, S3, Glue, Redshift, Step Functions, EventBridge, SNS'],
  ['DevOps', 'Datadog, Scalyr, CloudWatch, K6, SonarQube, Semgrep, SAM'],
  ['Databases', 'PostgreSQL, MySQL, Firebase, MongoDB, DynamoDB'],
  ['Tools', 'Docker, Redis, Airflow, RabbitMQ, Kafka, Spark, Maestro, Playwright'],
] as const;

// Small timeline on the home page. `mark` is the monogram shown on the seal;
// swap Seal for an <img> if you'd rather use real logos.
export const journey = [
  { mark: 'NU', tone: 'indigo', name: 'NUS', role: 'Computer Science', period: 'Aug 2023', note: 'Micro-services, formal methods, databases, testing.' },
  { mark: 'AC', tone: 'ink', name: 'Accenture', role: 'Application developer intern', period: 'May 2024', note: 'Glue pipelines moving 700 tables into Redshift.' },
  { mark: 'AT', tone: 'red', name: 'Assistive Technologies', role: 'Founding engineer', period: 'Jun 2025', note: 'Serverless messaging and insights for 50 families.' },
  { mark: 'H', tone: 'ink', name: 'Hult Prize', role: 'Founder-in-residence', period: '2026', note: 'Top 60 of 18,000 applicants worldwide.' },
  { mark: 'K', tone: 'red', name: 'Kredivo', role: 'Engineering intern', period: 'Jun 2026 · now', note: 'Go payment services across four regions.' },
] as const;
