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
      title: "Admin by Khadija | Accounting tools",
      description: "Accounting tools for businesses",
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
    welcome: "Welcome back, {{name}}",
  },
  customer: {
    edit: {
      form: {
        email: "Email",
        emailPlaceholder: "Enter their email",
        emailDescription: "The email address you used to register",
        firstName: "First name",
        firstNamePlaceholder: "Enter their first name",
        firstNameDescription: "Their first name",
        lastName: "Last name",
        lastNamePlaceholder: "Enter their last name",
        lastNameDescription: "Their last name",
        role: "Role",
        roleDescription:
          "The role of the user. Admins have full access to the dashboard.",
        rolePlaceholder: "Select a role for the user",
        submit: "Update",
      },
      toast: {
        success: "Customer updated successfully",
        error: "Error updating customer",
      },
    },
  },
  toolAccess: {
    toast: {
      success: "Tool access updated successfully",
      error: "Error updating tool access",
    },
    description:
      "Manage tool access for this user. This is a list of all tools in the system.",
  },
  role: {
    admin: "Admin",
    user: "User",
  },
  incomeTaxTool: {
    title: "Income Tax",
    description: `This is possible for entrepreneurs and self-employed people without employees (self-employed).
      it can sometimes be complicated to determine how much money they need
      reserve for income tax. This tool provides an estimate to
      to help you with this. Although the tool does not cover all aspects and a
      provides simplified calculation for ease of use, it is one step
      forward compared to simply 'keep 40% aside'.`,
    details: {
      title: "Details",
      form: {
        revenue: {
          label: "Revenue",
          placeholder: "Enter your revenue",
          description: "Your total revenue",
        },
        year: {
          label: "Year",
          placeholder: "Enter the year",
          description: "The year to calculate for",
        },
        hours_worked: {
          question: "Have you worked more than 1225 hours on your business?",
        },
        starter_deduction: {
          question: "Are you eligible for the starter deduction?",
        },
        salaried: {
          question: "Did you have a salaried job?",
        },
        annual_salary: {
          label: "Annual salary",
          placeholder: "Enter your annual salary",
          description: "Your annual salary",
        },
        tax_withheld: {
          label: "Tax withheld",
          placeholder: "Enter your tax withheld",
          description: "Your tax withheld",
        },
      },
    },
    result: {
      title: "Result",
      business_income: "Income from business",
      entrepreneur_deduction: "Sub: Entrepreneur's deduction",
      profit_exemption: "Sub: Mkb-Profit exemption",
      wage: "Add: Wage",
      taxable_income: "Taxable income",
      income_tax: "Income tax (Tracks 1 to 4)",
      general_tax_credit: "General tax credit",
      labor_discount: "Labor discount",
      tax_credits: "Sub: Tax credits",
      income_tax_due: "Income tax to be paid",
      health_insurance: "Health Insurance Act contribution to be paid",
    },
  },
} as const;
