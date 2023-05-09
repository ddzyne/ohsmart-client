const pages = [
  {
    id: "home",
    name: "Home",
    slug: "",
    template: "generic",
    inMenu: true,
    menuTitle: "Home",
    content: "<p>DANS collaborates with the OH-SMART project to provide infrastructure for the deposit, preservation, processing and application of audiovisual materials collected by museums and research institutions. OH-SMART concentrates on oral histories - interviews conducted at art museums.</p>",
    action: {
      // link to an ID
      link: "deposit",
      text: "Deposit data",
    },
    logo: true,
  },
  {
    id: "deposit",
    name: "Deposit",
    slug: {
      en: "deposit",
      nl: "indienen",
    },
    template: "deposit",
    inMenu: true,
    menuTitle: {
      en: "Deposit",
      nl: "Indienen",
    },
  },
  {
    id: "about",
    name: {
      en: "About OH-SMArt",
      nl: "Over OH-SMArt",
    },
    slug: {
      en: "about",
      nl: "over",
    },
    template: "generic",
    inMenu: true,
    menuTitle: {
      en: "About",
      nl: "Over",
    },
    content: "<p>About the project...</p>",
  },
  {
    id: "search",
    name: "Search",
    slug: {
      en: "search",
      nl: "zoeken",
    },
    template: "generic",
    inMenu: true,
    menuTitle: {
      en: "Search",
      nl: "Zoeken",
    },
  },
  {
    id: "guide",
    name: "User guide",
    slug: {
      en: "guide",
      nl: "gids",
    },
    template: "generic",
    inMenu: true,
    menuTitle: {
      en: "User guide",
      nl: "Gebruikersgids",
    },
  },
  {
    id: "support",
    name: "Support",
    slug: {
      en: "support",
      nl: "ondersteuning",
    },
    template: "generic",
    inMenu: true,
    menuTitle: {
      en: "Support",
      nl: "Ondersteuning",
    },
  }
];

export default pages;