/** Kontaktné údaje jedální TUKE. */

export type ManagementContact = {
  title: string;
  name: string;
  phone?: string;
  mobile?: string;
  email: string;
};

export type HoursEntry = {
  label: string;
  time: string;
};

export type CanteenContact = {
  name: string;
  address: string;
  manager: string;
  /** "Prevádzkarka" alebo "Prevádzkar" */
  managerLabel: string;
  phone: string;
  email: string;
  hours: HoursEntry[];
  /** Ak sa hodiny líšia v piatok */
  hoursFri?: HoursEntry[];
};

export const MANAGEMENT_CONTACTS: ManagementContact[] = [
  {
    title: "Vedúca úseku stravovacích služieb / Správa kreditu",
    name: "Ing. Aneta Jurik",
    phone: "+421 55 602 5813",
    mobile: "+421 917 751 407",
    email: "aneta.jurik@tuke.sk",
  },
];

export const CANTEEN_CONTACTS: CanteenContact[] = [
  {
    name: "Jedáleň Němcovej 1",
    address: "Němcovej 1, 040 01 Košice",
    manager: "Anna Compelová",
    managerLabel: "Prevádzkarka",
    phone: "+421 917 911 597",
    email: "anna.compelova@tuke.sk",
    hours: [
      { label: "Raňajky", time: "07:00 – 10:00" },
      { label: "Obedy", time: "11:00 – 14:00" },
    ],
  },
  {
    name: "Jedáleň Jedlíkova 7",
    address: "Jedlíkova 7, Košice",
    manager: "Viktória Takáčová",
    managerLabel: "Prevádzkarka",
    phone: "+421 917 911 622",
    email: "viktoria.takacova@tuke.sk",
    hours: [
      { label: "Raňajky", time: "07:00 – 10:00" },
      { label: "Obedy", time: "11:00 – 14:00" },
    ],
  },
  {
    name: "Bistro Urbánkova 2",
    address: "Urbánkova 2, 040 01 Košice",
    manager: "Renáta Zaťková",
    managerLabel: "Prevádzkarka",
    phone: "+421 917 911 598",
    email: "renata.zatkova@tuke.sk",
    hours: [
      { label: "Raňajky", time: "07:00 – 10:00" },
      { label: "Obedy", time: "11:00 – 14:00" },
    ],
  },
  {
    name: "Bistro ZP, Němcovej 9",
    address: "Němcovej 9, 040 01 Košice",
    manager: "Anna Vrtilková",
    managerLabel: "Prevádzkarka",
    phone: "+421 917 911 592",
    email: "anna.vrtilkova@tuke.sk",
    hours: [
      { label: "Raňajky", time: "07:00 – 10:00" },
      { label: "Výdaj jedál", time: "10:00 – 14:00" },
    ],
  },
  {
    name: "Jedáleň Budovateľská 31, Prešov",
    address: "Budovateľská 31, Prešov",
    manager: "Monika Thinschmidtová",
    managerLabel: "Prevádzkarka",
    phone: "+421 917 911 596",
    email: "monika.thinschmidtova@tuke.sk",
    hours: [
      { label: "Raňajky", time: "07:00 – 10:00" },
      { label: "Obedy", time: "10:30 – 13:30" },
    ],
  },
  {
    name: "Pizzéria Forte, Jedlíkova 7",
    address: "Jedlíkova 7, 040 01 Košice",
    manager: "Ladislav Szalay",
    managerLabel: "Prevádzkar",
    phone: "+421 917 911 600",
    email: "ladislav.szalay@tuke.sk",
    hours: [
      { label: "Raňajky", time: "07:00 – 10:00" },
      { label: "Bufet", time: "07:00 – 20:00" },
      { label: "Pizza", time: "11:00 – 19:00" },
    ],
    hoursFri: [
      { label: "Raňajky", time: "07:00 – 10:00" },
      { label: "Bufet", time: "07:00 – 16:00" },
      { label: "Pizza", time: "11:00 – 15:00" },
    ],
  },
  {
    name: "Libresso, Němcovej 7",
    address: "Němcovej 7, 040 01 Košice",
    manager: "Jana Bednáriková",
    managerLabel: "Prevádzkarka",
    phone: "+421 917 911 602",
    email: "jana.bednarikova@tuke.sk",
    hours: [
      { label: "Po – Št", time: "07:00 – 16:00" },
      { label: "Pi", time: "07:00 – 14:00" },
    ],
  },
];
