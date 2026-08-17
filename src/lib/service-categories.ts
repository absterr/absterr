export type ServiceCategory = {
  id: string;
  label: string;
  services: string[];
};

export const categories: ServiceCategory[] = [
  {
    id: "ai-automation",
    label: "AI & Automation",
    services: [
      "LLM integration",
      "Workflow automation",
      "Agentic workflows",
      "AI interfaces",
      "Tool calling",
      "RAG systems",
    ],
  },
  {
    id: "auth-payments",
    label: "Auth & Payments",
    services: [
      "Authentication",
      "Authorization",
      "OAuth integrations",
      "Payment integration",
      "Subscription systems",
      "Usage-based billing",
    ],
  },
  {
    id: "product-logic-interface",
    label: "Product Logic & Interface",
    services: [
      "Web applications",
      "Dashboards & Admin panels",
      "REST APIs",
      "Database design",
      "Interactive interfaces",
      "Real-time features",
    ],
  },
];
