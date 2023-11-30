export const translations = {
  global: {
    and: "and",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    noResults: "No results.",
    under_construction: "This page is under construction",
  },
  layout: {
    metadata: {
      title: "Accounting tools",
      description: "Accounting tools for small businesses",
    },
  },
  login: {
    title: "Login",
    description: "Enter your email below to log into your account",
    slogan: "Tools to quickly help you get your accounting in",
    registerButton: "Register",
    agreement: "By clicking continue, you agree to our",
    form: {
      email: "Email",
      emailPlaceholder: "Enter your email",
      emailDescription: "The email address you used to register",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      submit: "Continue",
      passwordError: "Password must be at least 2 characters",
    },
    alert: {
      title: "Error",
      error: "Error logging in. Please try again.",
    },
  },
  logout: {
    title: "Logout",
    description: "Are you sure you want to logout",
    button: "Logout",
  },
  register: {
    missingFields: "Missing fields",
    alreadyExists: "User already exists",
    doesntExist: "User doesn't exist",
    unauthorized: "Unauthorized",
  },
  ladingPage: {
    hero: {
      slogan: "Tools to quickly help you get your accounting in",
      description: "Accounting tools for small businesses",
      loginButton: "Login",
      registerButton: "Get started",
    },
    footer: {
      excerpt:
        "A proactive expert tax consultancy and accounting firm. We advise on optimal use of tax arrangements and create insight and overview in your accounting.",
      aboutUs: "About us",
      contact: "Contact",
      support: "Support",
      copyRight: "Copyright © {{year}} Admin by Khadija, All rights reserved.",
      terms:
        "KvKnummer is: 74388363 | Btw-nummer: NL002292190B32 | Terms and Conditions",
    },
    navbar: {
      getStarted: "Get started",
    },
  },
  admin: {
    navbar: {
      dashboard: "Overview",
      customers: "Customers",
      tools: "Tools",
      settings: "Settings",
      home: "Home",
      logout: "Logout",
    },
    overview: {
      title: "Overview",
    },
    customer: {
      title: "Customers",
      table: {
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        role: "Role",
        tools: "Tools",
        edit: "Edit",
      },
    },
    tools: {
      title: "Tools",
      table: {
        name: "Name",
        description: "Description",
        tags: "Tags",
        users: "Users",
        actions: "Actions",
      },
    },
    settings: {
      title: "Settings",
    },
  },
  notFound: {
    description: "Page not found",
    button: "Go back",
  },
  dashboard: {
    navbar: {
      home: "Home",
      settings: "Settings",
      admin: "Admin",
      logout: "Logout",
    },
  },
} as const;
