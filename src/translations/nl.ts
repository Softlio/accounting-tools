export const translations = {
  global: {
    and: "en",
    terms: "Algemene voorwaarden",
    privacy: "Privacybeleid",
    noResults: "Geen resultaten.",
    under_construction: "Deze pagina is onder constructie",
    read_more: "Lees meer",
    yes: "Ja",
    no: "Nee",
  },
  layout: {
    metadata: {
      title: "FEM Financial Services | Boekhoudtools",
      description: "Boekhoudtools voor bedrijven",
    },
  },
  login: {
    title: "Inloggen",
    description:
      "Voer hieronder uw e-mailadres in om in te loggen op uw account",
    slogan: "Tools om u snel te helpen bij uw boekhouding",
    registerButton: "Registreren",
    agreement: "Door verder te gaan, gaat u akkoord met onze",
    form: {
      email: "E-mail",
      emailPlaceholder: "Voer uw e-mailadres in",
      emailDescription:
        "Het e-mailadres dat u heeft gebruikt om te registreren",
      password: "Wachtwoord",
      passwordPlaceholder: "Voer uw wachtwoord in",
      submit: "Doorgaan",
      passwordError: "Wachtwoord moet minimaal 2 tekens bevatten",
    },
    alert: {
      title: "Fout",
      error: "Fout bij het inloggen. Probeer het opnieuw.",
    },
  },
  logout: {
    title: "Uitloggen",
    description: "Weet u zeker dat u wilt uitloggen?",
    button: "Uitloggen",
  },
  register: {
    missingFields: "Ontbrekende velden",
    alreadyExists: "Gebruiker bestaat al",
    doesntExist: "Gebruiker bestaat niet",
    unauthorized: "Onbevoegd",
  },
  newOrder: {
    missingFields: "Ontbrekende velden",
    errorCreatingOrder: "Fout bij het maken van bestelling",
    incomeTaxOrderDescription:
      "Beschrijving inkomstenbelastingberekening bestelling",
  },
  landingPage: {
    hero: {
      slogan: "Tools om u snel te helpen bij uw boekhouding",
      description: "Boekhoudtools voor kleine bedrijven",
      loginButton: "Inloggen",
      registerButton: "Aan de slag",
    },
    footer: {
      excerpt:
        "Een proactief adviesbureau voor belastingadvies en accountancy. We adviseren over optimaal gebruik van belastingregelingen en creëren inzicht en overzicht in uw boekhouding.",
      aboutUs: "Over ons",
      contact: "Contact",
      support: "Ondersteuning",
      copyRight:
        "Auteursrecht © {{year}} FEM Financial Services, Alle rechten voorbehouden.",
      terms:
        "KvKnummer is: 74388363 | Btw-nummer: NL002292190B32 | Algemene voorwaarden",
    },
    navbar: {
      getStarted: "Aan de slag",
    },
  },
  admin: {
    navbar: {
      dashboard: "Overzicht",
      customers: "Klanten",
      tools: "Tools",
      settings: "Instellingen",
      home: "Home",
      logout: "Uitloggen",
    },
    overview: {
      title: "Overzicht",
    },
    customer: {
      title: "Klanten",
      table: {
        firstName: "Voornaam",
        lastName: "Achternaam",
        email: "E-mail",
        role: "Rol",
        tools: "Tools",
        edit: "Bewerken",
        pending: "In afwachting",
        active: "Actief",
      },
    },
    tools: {
      title: "Tools",
      table: {
        name: "Naam",
        description: "Omschrijving",
        tags: "Tags",
        users: "Gebruikers",
        actions: "Acties",
      },
    },
    settings: {
      title: "Instellingen",
    },
  },
  notFound: {
    description: "Pagina niet gevonden",
    button: "Ga terug",
  },
  dashboard: {
    navbar: {
      home: "Home",
      settings: "Instellingen",
      admin: "Admin",
      logout: "Uitloggen",
    },
    welcome: "Welkom terug, {{name}}",
  },
  customer: {
    edit: {
      form: {
        email: "E-mail",
        emailPlaceholder: "Voer hun e-mailadres in",
        emailDescription:
          "Het e-mailadres dat ze hebben gebruikt om zich te registreren",
        firstName: "Voornaam",
        firstNamePlaceholder: "Voer hun voornaam in",
        firstNameDescription: "Hun voornaam",
        lastName: "Achternaam",
        lastNamePlaceholder: "Voer hun achternaam in",
        lastNameDescription: "Hun achternaam",
        role: "Rol",
        roleDescription:
          "De rol van de gebruiker. Beheerders hebben volledige toegang tot het dashboard.",
        rolePlaceholder: "Selecteer een rol voor de gebruiker",
        submit: "Bijwerken",
      },
      toast: {
        success: "Klant succesvol bijgewerkt",
        error: "Fout bij het bijwerken van klant",
      },
      confirm_leave:
        "Weet u zeker dat u wilt vertrekken? Uw wijzigingen worden niet opgeslagen.",
    },
    add: {
      title: "Klant toevoegen",
      form: {
        firstName: "Voornaam",
        lastName: "Achternaam",
        email: "E-mail",
        password: "Wachtwoord",
        passwordConfirmation: "Bevestig wachtwoord",
        role: {
          label: "Rol",
          user: "Gebruiker",
          admin: "Beheerder",
        },
        submit: "Toevoegen",
      },
    },
    invite: {
      form: {
        submit: "Uitnodigen",
      },
      missingFields: "Ontbrekende velden",
      success: "Klant succesvol uitgenodigd",
      error: "Fout bij het uitnodigen van klant",
      title: "Klant uitnodigen",
      alreadyExists: "Gebruiker bestaat al",
    },
    delete: {
      error: "Fout bij het verwijderen van klant",
      success: "Klant succesvol verwijderd",
      label: "Verwijderen",
      title: "Klant verwijderen",
      description: "Weet u zeker dat u deze klant wilt verwijderen?",
    },
  },
  toolAccess: {
    toast: {
      success: "Tooltoegang succesvol bijgewerkt",
      error: "Fout bij het bijwerken van tooltoegang",
    },
    description:
      "Beheer de tooltoegang voor deze gebruiker. Dit is een lijst van alle tools in het systeem.",
  },
  role: {
    admin: "Beheerder",
    user: "Gebruiker",
  },
  incomeTaxTool: {
    title: "Inkomstenbelasting",
    description: `Dit is mogelijk voor ondernemers en zelfstandigen zonder personeel (zzp'ers). 
    Het kan soms ingewikkeld zijn om te bepalen hoeveel geld ze moeten reserveren voor inkomstenbelasting.
    Deze tool geeft een schatting om u hiermee te helpen. Hoewel de tool niet alle aspecten behandelt en een vereenvoudigde berekening biedt voor het gemak,
    is het een stap vooruit vergeleken met simpelweg '40% apart houden'.`,
    details: {
      title: "Details",
      form: {
        revenue: {
          label: "Omzet",
          placeholder: "Voer uw omzet in",
          description: "Uw totale omzet",
        },
        year: {
          label: "Jaar",
          placeholder: "Voer het jaar in",
          description: "Het jaar waarvoor berekend moet worden",
        },
        hours_worked: {
          question: "Heeft u meer dan 1225 uur aan uw bedrijf gewerkt?",
        },
        starter_deduction: {
          question: "Komt u in aanmerking voor de startersaftrek?",
        },
        salaried: {
          question: "Had u een betaalde baan?",
        },
        annual_salary: {
          label: "Jaarsalaris",
          placeholder: "Voer uw jaarsalaris in",
          description: "Uw jaarsalaris",
        },
        tax_withheld: {
          label: "Ingehouden belasting",
          placeholder: "Voer uw ingehouden belasting in",
          description: "Uw ingehouden belasting",
        },
      },
    },
    result: {
      title: "Resultaat",
      business_income: "Inkomen uit onderneming",
      entrepreneur_deduction: "Ondernemersaftrek",
      profit_exemption: "MKB-Winstvrijstelling",
      wage: "Salaris",
      taxable_income: "Belastbaar inkomen",
      income_tax: "Inkomstenbelasting (Schaal 1 tot 4)",
      general_tax_credit: "Algemene heffingskorting",
      labor_discount: "Arbeidskorting",
      tax_credits: "Belastingkortingen",
      income_tax_due: "Te betalen inkomstenbelasting",
      health_insurance: "Te betalen bijdrage Zorgverzekeringswet",
      calculate: "Berekenen",
    },
    info: {
      entrepreneur_deduction:
        "Je kunt een ondernemersaftrek ontvangen als je een ondernemer bent en winst maakt met je bedrijf. Voor de meeste onderdelen van de ondernemersaftrek moet je voldoen aan het urencriterium.",
      mkb_deduction:
        "De MKB-winstvrijstelling is een aftrek van je winst. Je ontvangt deze vrijstelling als je een ondernemer bent. Je ontvangt geen MKB-winstvrijstelling over de winst die je hebt gemaakt als medegerechtigde.",
      income_tax:
        "Je kunt 3 soorten belastbaar inkomen hebben: in box 1, in box 2 en in box 3. Je berekent hoeveel belasting je moet betalen door de tarieven toe te passen op de belastbare inkomens. Vervolgens verlaag je het berekende belastingbedrag met 1 of meer belastingkortingen.",
      general_tax_credit:
        "De algemene heffingskorting is een korting op je inkomstenbelasting en premies volksverzekeringen. Dit betekent dat je minder belasting en premies betaalt. Iedereen heeft recht op de algemene heffingskorting.",
      labor_discount:
        "De arbeidskorting is de belastingkorting die je ontvangt als je werkt. We berekenen de arbeidskorting op het arbeidsinkomen. Heb je een werkgever? Dan houdt hij al rekening met de arbeidskorting bij het berekenen van de loonheffing. Als je aangifte doet, hoef je niet apart de arbeidskorting aan te vragen. Dit berekenen we automatisch.",
      health_insurance:
        "Meestal betaalt je werkgever of uitkeringsinstantie werkgeversheffingen op grond van de Zorgverzekeringswet (Zvw). Maar er zijn ook situaties waarin je zelf een inkomensafhankelijke Zvw-bijdrage (Zvw-bijdrage) betaalt. Dan krijg je een Zvw-beschikking of een voorlopige Zvw-beschikking.",
      starter_deduction:
        "De startersaftrek is een verhoging van de zelfstandigenaftrek. Je ontvangt de startersaftrek maximaal 3 keer in de eerste 5 jaar dat je ondernemer bent. De volgende voorwaarden zijn van toepassing",
    },
    dialog: {
      title: "Bereken nu je inkomstenbelasting",
      description: "Bereken nu je inkomstenbelasting",
      error: "Er is iets misgegaan bij de berekening. Probeer het opnieuw.",
      error_revenue:
        "Voer een geldige omzet in, de omzet moet boven 0 en onder 1.000.000.000 liggen.",
      error_email: "Voer een geldig e-mailadres in",
      item_description:
        "Betaal €10,00 om je inkomstenbelasting te berekenen en de resultaten te downloaden. In een mooi PDF-formaat met alle details en informatie.",
      name: "Naam",
    },
    pdf: {
      results: {
        title: "Resultaten",
        description:
          "Resultaten van de inkomstenbelastingberekening. Ga naar de volgende pagina voor meer details.",
        details: {
          title: "Details",
          revenue: "Omzet",
          year: "Jaar",
          hours_worked: "Gewerkte uren",
          starter_deduction: "Startersaftrek",
          salaried: "In loondienst",
          annual_salary: "Jaarsalaris",
          tax_withheld: "Ingehouden belasting",
        },
        result: {
          title: "Resultaat",
          business_income: "Inkomen uit onderneming",
          entrepreneur_deduction: "Ondernemersaftrek",
          profit_exemption: "MKB-winstvrijstelling",
          wage: "Salaris",
          taxable_income: "Belastbaar inkomen",
          income_tax: "Inkomstenbelasting (Schaal 1 tot 4)",
          general_tax_credit: "Algemene heffingskorting",
          labor_discount: "Arbeidskorting",
          tax_credits: "Belastingkortingen",
          income_tax_due: "Te betalen inkomstenbelasting",
          health_insurance: "Bijdrage Zorgverzekeringswet",
        },
      },
      moreInfo: {
        title: "Meer informatie",
        description: "Meer informatie over de inkomstenbelastingberekening.",
      },
      so: "FEM Financial Services - https://femfinancialservices.nl",
      otherSource: {
        title: "Andere bronnen",
        description:
          "Andere bronnen die zijn gebruikt om de inkomstenbelastingberekening uit te voeren. Of bronnen die u kunnen helpen met uw inkomstenbelasting.",
      },
      otherSources: [
        "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/hoe_werkt_inkomstenbelasting/aangifte_doen/",
      ],
    },
    email: {
      preview: "Bedankt voor uw bestelling bij FEM Financial Services",
      thankYou: "Bedankt voor uw bestelling bij",
      name: "FEM Financial Services",
      description:
        "Bedankt voor uw bestelling bij FEM Financial Services. Zodra de betaling is ontvangen, zal de knop hieronder worden geactiveerd om uw PDF te downloaden.",
      questions:
        "Als u vragen heeft, neem dan contact met ons op via info@femfinancialservice.nl",
      goodBye: "Met vriendelijke groet",
      subject: "Bedankt voor uw bestelling bij FEM Financial Services",
    },
    print: "Opslaan",
    noRevenueError: "Voer een geldige omzet in",
  },
  orderPages: {
    moreTools: "Bekijk onze andere tools of diensten",
    goBack: "Ga terug",
    incomeTax: {
      title: "Bedankt voor de aankoop van de inkomstenbelastingberekening",
      description:
        "Bedankt voor uw bestelling. Controleer uw e-mail voor de downloadlink en bestelgegevens.",
      button: "Downloaden",
    },
  },
  downloadPages: {
    goBack: "Ga terug",
    incomeTax: {
      notPaid: {
        title: "Deze bestelling is nog niet betaald",
        description:
          "Betaal alstublieft voor deze bestelling voordat u het bestand downloadt. U kunt voor deze bestelling betalen door op de onderstaande knop te klikken.",
        payNow: "Nu betalen",
      },
      paid: {
        title: "Bedankt voor de aankoop van de inkomstenbelastingberekening",
        description:
          "Bedankt voor uw bestelling. Klik op de onderstaande knop om het bestand te downloaden.",
        button: "Downloaden",
      },
    },
  },
  noTools: {
    description:
      "Je hebt geen gereedschap beschikbaar. Neem contact op met de beheerder om toegang te krijgen tot tools. Of ga naar de gereedschapswinkel om gereedschap te kopen.",
    title: "Geen tools beschikbaar",
  },
  dialog: {
    firstLogin: {
      title: "Welkom bij FEM Financial Services Tools",
      description:
        "Welkom bij FEM Financial Services. We hopen dat u onze tools nuttig vindt. Als u vragen heeft, neem dan gerust contact met ons op.",
      newPasswordExplanation:
        "U moet uw wachtwoord wijzigen voordat u doorgaat.",
    },
  },
  firstLogin: {
    password: "Wachtwoord",
    confirmPassword: "Bevestig wachtwoord",
    save: "Opslaan",
    missingFields: "Ontbrekende velden",
    passwordsDontMatch: "Wachtwoorden komen niet overeen",
    error: "Er is een fout opgetreden",
  },
  invite: {
    email: {
      preview: "U bent uitgenodigd voor FEM Financial Services",
      thankYou: "Bedankt voor het inschrijven voor FEM Financial Services",
      description:
        "U bent uitgenodigd voor FEM Financial Services. Klik op de onderstaande knop om in te loggen en uw account te activeren. Met uw tijdelijke wachtwoord kunt u inloggen en uw wachtwoord wijzigen.",
      name: "FEM Financial Services",
      subject: "U bent uitgenodigd voor FEM Financial Services",
    },
  },
} as const;
