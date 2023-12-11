export const translations = {
  global: {
    and: "and",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    noResults: "No results.",
    under_construction: "This page is under construction",
    read_more: "Read more",
  },
  layout: {
    metadata: {
      title: "FEM Financial Services | Accounting tools",
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
  newOrder: {
    missingFields: "Missing fields",
    errorCreatingOrder: "Error creating order",
    incomeTaxOrderDescription: "Income tax calculation order",
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
      copyRight:
        "Copyright © {{year}} FEM Financial Services, All rights reserved.",
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
      confirm_leave:
        "Are you sure you want to leave? Your changes won't be saved.",
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
      entrepreneur_deduction: "Entrepreneur's deduction",
      profit_exemption: "Mkb-Profit exemption",
      wage: "Wage",
      taxable_income: "Taxable income",
      income_tax: "Income tax (Tracks 1 to 4)",
      general_tax_credit: "General tax credit",
      labor_discount: "Labor discount",
      tax_credits: "Tax credits",
      income_tax_due: "Income tax to be paid",
      health_insurance: "Health Insurance Act contribution to be paid",
      calculate: "Calculate",
    },
    info: {
      entrepreneur_deduction:
        "You can receive a business deduction if you are an entrepreneur and have profits from your business. For most components of the entrepreneur's deduction, you must meet the hours criterion.",
      mkb_deduction:
        "The Mkb profit exemption is a deduction from your profit. You receive this exemption if you are an entrepreneur. You will not receive an Mkb profit exemption on the profit you have made as a co-titleholder.",
      income_tax:
        "You can have 3 taxable incomes: in box 1, in box 2 and in box 3. You calculate how much tax you have to pay by applying the rates to the taxable incomes. You then reduce the tax amount you have calculated by 1 or more tax credits.",
      general_tax_credit:
        "The general tax credit is a discount on your income tax and national insurance contributions. This means you pay less tax and premiums. Everyone is entitled to the general tax credit.",
      labor_discount:
        "The employment tax credit is the tax credit you receive if you work. We calculate the labor tax credit on the labor income. Do you have an employer? Then he already takes the employment tax credit into account when calculating the payroll tax. If you file a tax return, you do not have to apply for the labor tax credit separately. We calculate this automatically.",
      health_insurance:
        "Your employer or benefits agency usually pays employer levies under the Healthcare Insurance Act (Zvw). But there are also situations in which you pay an income-related Zvw contribution (Zvw contribution) yourself. You will then receive a Zvw assessment or a provisional Zvw assessment.",
      starter_deduction:
        "The starter's deduction is an increase in the self-employed deduction. You will receive the starter's deduction a maximum of 3 times in the first 5 years that you are an entrepreneur. The following conditions apply",
    },
    dialog: {
      title: "Calculate your income tax now",
      description: "Calculate your income tax now",
      error: "Something went wrong with the calculation. Please try again.",
    },
  },
} as const;
