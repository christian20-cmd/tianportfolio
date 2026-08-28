// src/data/projects.js
import {
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiTailwindcss,
  SiDotnet,
  SiMysql,
  SiExpress,
  SiPhp,
  SiHtml5,
  SiCss,
  SiVite,
  SiGsap,
} from "react-icons/si";

// --- Images GoodEyes ---
import goodeyesLogo from "../assets/goodeyes/logoW.png";
import goodeyesLogin from "../assets/goodeyes/login.png";
import goodeyesDashboard from "../assets/goodeyes/dashboard.png";
import goodeyesTraficReseau from "../assets/goodeyes/trafic_reseau.png";
import goodeyesAlerte from "../assets/goodeyes/alerte.png";
import goodeyesIpBloque from "../assets/goodeyes/ipbloque.png";
import goodeyesRapport from "../assets/goodeyes/rapport.png";

// --- Images 3A ---
import troisALogo from "../assets/3A/3ALogo.png";
import troisALogin from "../assets/3A/login.jpeg";
import troisADashboardClient from "../assets/3A/dashboardclient.jpeg";
import troisAListAvocatDispo from "../assets/3A/ListavocatDispo.jpeg";
import troisARdvAvocat from "../assets/3A/rdvavocat.jpeg";
import troisADashboardAvocat from "../assets/3A/dashboardavocat.jpeg";
import troisADisponibilitePageAvocat from "../assets/3A/disponibilitepageavocat.jpeg";

// --- Images N Studio ---
import nstudioLogo from "../assets/Nstudios/LogoNstudio.png";
import nstudioAccueil from "../assets/Nstudios/accueil.png";
import nstudioNstudio from "../assets/Nstudios/Nstudio.png";
import nstudioApropos from "../assets/Nstudios/Apropos.png";

// --- Images Books ---
import booksAdmin from "../assets/books/admin.png";
import booksAddbook from "../assets/books/addbook.png";
import booksSiteclient from "../assets/books/siteclient.png";

export const projects = [
  {
    number: "01",
    title: "GoodEyes",
    slug: "goodeyes",
    tagline: {
      fr: "Détection d'anomalies réseau",
      en: "Network anomaly detection",
    },
    categorie: {
      fr: "Cybersécurité & Supervision réseau",
      en: "Cybersecurity & Network monitoring",
    },
    description: {
      fr: "Système ASP.NET Core avec ML.NET pour surveiller le trafic réseau et détecter automatique les comportements anormaux(Instrusions, DDos, scans de ports, malwares). Génère des alertes en temps réel de produit ds rapports d'analyse des anomalies détectées.",
      en: "ASP.NET Core system with ML.NET to monitor network traffic and automatically detect abnormal behavior (Intrusions, DDoS, port scans, malware). Generates real-time alerts and produces analysis reports of detected anomalies.",
    },
    role: {
      fr: "Développement full-stack et Réseau",
      en: "Full-stack & Network development",
    },
    client: {
      fr: "Projet personnel",
      en: "Personal project",
    },
    type: "web",
    tools: [
      { icon: SiReact, label: "React", color: "#61DAFB" },
      { icon: SiDotnet, label: "Dotnet", color: "#339933" },
      { icon: SiPostgresql, label: "Postgresql", color: "#4169E1" },
      { icon: SiTailwindcss, label: "Tailwind", color: "#06B6D4" },
    ],
    year: "2026",
    image: goodeyesLogo,
    status: "local",
    downloadLink: null,
    screenshots: [
      {
        src: goodeyesLogin,
        titre: { fr: "Connexion", en: "Login" },
        caption: {
          fr: "Authentification sécurisée de l'administrateur",
          en: "Secure administrator authentication",
        },
        traitement: {
          fr: [
            "Authentification par identifiant et mot de passe",
            "Validation des champs côté client",
            "Redirection automatique vers le tableau de bord après connexion",
            "Gestion des erreurs de connexion (identifiants invalides)",
          ],
          en: [
            "Login/password authentication",
            "Client-side field validation",
            "Automatic redirect to the dashboard after login",
            "Login error handling (invalid credentials)",
          ],
        },
      },
      {
        src: goodeyesDashboard,
        titre: { fr: "Tableau de bord", en: "Dashboard" },
        caption: {
          fr: "Vue temps réel du trafic réseau",
          en: "Real-time view of network traffic",
        },
        traitement: {
          fr: [
            "Vue d'ensemble du trafic réseau en temps réel",
            "Indicateurs clés (connexions actives, alertes du jour, IP bloquées)",
            "Graphiques d'activité réseau sur les dernières 24h",
            "Accès rapide aux modules Alertes / IP bloquées / Rapports",
          ],
          en: [
            "Real-time overview of network traffic",
            "Key indicators (active connections, alerts today, blocked IPs)",
            "Network activity charts over the last 24h",
            "Quick access to Alerts / Blocked IPs / Reports modules",
          ],
        },
      },
      {
        src: goodeyesTraficReseau,
        titre: { fr: "Trafic réseau", en: "Network traffic" },
        caption: {
          fr: "Analyse détaillée du trafic entrant et sortant",
          en: "Detailed analysis of inbound and outbound traffic",
        },
        traitement: {
          fr: [
            "Visualisation du trafic réseau en temps réel",
            "Détection des pics d'activité suspects",
            "Segmentation du trafic par protocole et par IP source",
            "Historique consultable sur plusieurs périodes",
          ],
          en: [
            "Real-time network traffic visualization",
            "Detection of suspicious activity spikes",
            "Traffic segmentation by protocol and source IP",
            "Browsable history across multiple periods",
          ],
        },
      },
      {
        src: goodeyesAlerte,
        titre: { fr: "Alertes", en: "Alerts" },
        caption: {
          fr: "Système d'alertes automatiques sur intrusions détectées",
          en: "Automatic alert system for detected intrusions",
        },
        traitement: {
          fr: [
            "Génération automatique d'alertes sur comportement anormal",
            "Classification par type (Intrusion, DDoS, Malware, Scan de ports)",
            "Filtrage des alertes par gravité et par date",
            "Marquage des alertes comme traitées / ignorées",
          ],
          en: [
            "Automatic alert generation on abnormal behavior",
            "Classification by type (Intrusion, DDoS, Malware, Port scan)",
            "Alert filtering by severity and date",
            "Marking alerts as handled / ignored",
          ],
        },
      },
      {
        src: goodeyesIpBloque,
        titre: { fr: "IP bloquées", en: "Blocked IPs" },
        caption: {
          fr: "Gestion des adresses IP bloquées automatiquement ou manuellement",
          en: "Management of IP addresses blocked automatically or manually",
        },
        traitement: {
          fr: [
            "Liste des IP bloquées avec motif et date de blocage",
            "Blocage manuel d'une IP via recherche",
            "Déblocage d'une IP en un clic",
            "Filtrage par statut (bloquées / débloquées / toutes)",
          ],
          en: [
            "List of blocked IPs with reason and block date",
            "Manual IP blocking via search",
            "One-click IP unblocking",
            "Filtering by status (blocked / unblocked / all)",
          ],
        },
      },
      {
        src: goodeyesRapport,
        titre: { fr: "Rapport", en: "Report" },
        caption: {
          fr: "Rapport d'analyse exportable des anomalies",
          en: "Exportable anomaly analysis report",
        },
        traitement: {
          fr: [
            "Génération de rapports périodiques des anomalies détectées",
            "Export au format PDF",
            "Filtrage par période et par type d'anomalie",
            "Visualisation graphique des tendances",
          ],
          en: [
            "Periodic reports of detected anomalies",
            "Export to PDF format",
            "Filtering by period and anomaly type",
            "Graphical trend visualization",
          ],
        },
      },
    ],
  },
  {
    number: "02",
    title: "3A",
    slug: "3a",
    tagline: {
      fr: "Gestion de rendez vous aux avocats",
      en: "Appointment scheduling for lawyers",
    },
    categorie: {
      fr: "Legal Tech & Prise de rendez-vous",
      en: "Legal Tech & Appointment booking",
    },
    description: {
      fr: "Page d'accueil statique pour présenter un produit.",
      en: "Static homepage presenting a product.",
    },
    role: {
      fr: "Développement mobile & backend",
      en: "Mobile & backend development",
    },
    client: {
      fr: "Projet école",
      en: "School project",
    },
    type: "mobile",
    tools: [
      { icon: SiReact, label: "ReactNative", color: "#61DAFB" },
      { icon: SiTailwindcss, label: "Tailwind", color: "#06B6D4" },
      { icon: SiMysql, label: "MySQL", color: "#4169E1" },
      { icon: SiNodedotjs, label: "Node.js", color: "#339933" },
      { icon: SiExpress, label: "Express.js", color: "#000" },
    ],
    year: "2026",
    image: troisALogo,
    status: "local",
    downloadLink: null,
    screenshots: [
      {
        src: troisALogin,
        titre: { fr: "Connexion", en: "Login" },
        caption: {
          fr: "Accueil — recherche d'avocat par spécialité",
          en: "Home — search for a lawyer by specialty",
        },
        traitement: {
          fr: ["Connexion client ou avocat via un compte unique"],
          en: ["Client or lawyer login via a single account"],
        },
      },
      {
        src: troisADashboardClient,
        titre: { fr: "Tableau de bord client", en: "Client dashboard" },
        caption: {
          fr: "Suivi des rendez-vous pris par le client",
          en: "Tracking of appointments booked by the client",
        },
        traitement: {
          fr: [
            "Historique des rendez-vous passés et à venir",
            "Statut de chaque rendez-vous (confirmé, en attente, annulé)",
            "Accès rapide pour reprendre un nouveau rendez-vous",
          ],
          en: [
            "History of past and upcoming appointments",
            "Status of each appointment (confirmed, pending, cancelled)",
            "Quick access to book a new appointment",
          ],
        },
      },
      {
        src: troisAListAvocatDispo,
        titre: { fr: "Liste des avocats disponibles", en: "List of available lawyers" },
        caption: {
          fr: "Résultats de recherche filtrés par disponibilité",
          en: "Search results filtered by availability",
        },
        traitement: {
          fr: [
            "Liste des avocats disponibles selon les critères de recherche",
            "Accès direct à la prise de rendez-vous",
          ],
          en: [
            "List of available lawyers based on search criteria",
            "Direct access to appointment booking",
          ],
        },
      },
      {
        src: troisARdvAvocat,
        titre: { fr: "Prise de rendez-vous", en: "Booking an appointment" },
        caption: {
          fr: "Prise de rendez-vous avec calendrier interactif",
          en: "Appointment booking with an interactive calendar",
        },
        traitement: {
          fr: [
            "Sélection d'un créneau via calendrier interactif",
            "Confirmation instantanée de la réservation",
            "Notification envoyée à l'avocat et au client",
            "Annulation ou modification du rendez-vous",
          ],
          en: [
            "Time-slot selection via interactive calendar",
            "Instant booking confirmation",
            "Notification sent to the lawyer and the client",
            "Appointment cancellation or modification",
          ],
        },
      },
      {
        src: troisADashboardAvocat,
        titre: { fr: "Tableau de bord avocat", en: "Lawyer dashboard" },
        caption: {
          fr: "Vue d'ensemble des rendez-vous de l'avocat",
          en: "Overview of the lawyer's appointments",
        },
        traitement: {
          fr: [
            "Liste des rendez-vous à venir",
            "Statistiques de rendez-vous (confirmés, annulés)",
            "Accès rapide à la gestion des disponibilités",
          ],
          en: [
            "List of upcoming appointments",
            "Appointment statistics (confirmed, cancelled)",
            "Quick access to availability management",
          ],
        },
      },
      {
        src: troisADisponibilitePageAvocat,
        titre: { fr: "Disponibilités avocat", en: "Lawyer availability" },
        caption: {
          fr: "Gestion des créneaux disponibles par l'avocat",
          en: "Management of time slots available for the lawyer",
        },
        traitement: {
          fr: [
            "Ajout et retrait de créneaux disponibles",
            "Vue calendrier des disponibilités",
            "Blocage automatique des créneaux déjà réservés",
          ],
          en: [
            "Adding and removing available slots",
            "Calendar view of availability",
            "Automatic blocking of already-booked slots",
          ],
        },
      },
    ],
  },
  {
    number: "03",
    title: "N Studio",
    slug: "nstudio",
    tagline: {
      fr: "Studio photo, vidéo & son",
      en: "Photo, video & audio studio",
    },
    categorie: {
      fr: "Site Vitrine d'entreprise",
      en: "Corporate showcase website",
    },
    description: {
      fr: "Site vitrine développé pour N Studio, un studio de production photo, vidéo et audio basé à Fianarantsoa. Le site présente les services (photo, vidéo, confection, conception, impression), une galerie de réalisations, une section audio interactive et une FAQ. Interface sombre et moderne réalisée avec React, Tailwind CSS et GSAP pour les animations.",
      en: "Showcase website built for N Studio, a photo, video, and audio production studio based in Fianarantsoa. The site presents the services (photo, video, crafting, design, printing), a gallery of past work, an interactive audio section, and an FAQ. Dark, modern interface built with React, Tailwind CSS, and GSAP for the animations.",
    },
    role: {
      fr: "Développement frontend",
      en: "Frontend development",
    },
    client: {
      fr: "NIZANAKOLONA Studio",
      en: "NIZANAKOLONA Studio",
    },
    type: "web",
    tools: [
      { icon: SiReact, label: "ReactNative", color: "#61DAFB" },
      { icon: SiTailwindcss, label: "Tailwind", color: "#06B6D4" },
    ],
    year: "2025",
    image: nstudioLogo,
    status: "local",
    downloadLink: null,
    screenshots: [
      {
        src: nstudioAccueil,
        titre: { fr: "Accueil", en: "Home" },
        caption: {
          fr: "Page d'accueil avec présentation du studio, section vidéo et FAQ.",
          en: "Homepage with studio presentation, video section, and FAQ.",
        },
        traitement: {
          fr: ["Hero avec vidéo de fond", "Section présentation"],
          en: ["Hero with background video", "Presentation section"],
        },
      },
      {
        src: nstudioNstudio,
        titre: { fr: "N Studio", en: "N Studio" },
        caption: {
          fr: "Galerie photo/vidéo et section audio présentant les réalisations du studio.",
          en: "Photo/video gallery and audio section showcasing the studio's work.",
        },
        traitement: {
          fr: ["Galerie masonry", "Lecteur audio intégré", "FAQ interactive"],
          en: ["Masonry gallery", "Built-in audio player", "Interactive FAQ"],
        },
      },
      {
        src: nstudioApropos,
        titre: { fr: "A propos", en: "About" },
        caption: {
          fr: "Présentation détaillée des services : photo, vidéo, confection, conception, impression, avec statistiques et section contact.",
          en: "Detailed presentation of services: photo, video, crafting, design, printing, with statistics and a contact section.",
        },
        traitement: {
          fr: [
            "Carte Services animées ",
            "Statistiques (+5ans, +20 clients)",
            "Call-to-actions",
          ],
          en: [
            "Animated Services cards",
            "Statistics (+5 years, +20 clients)",
            "Call-to-actions",
          ],
        },
      },
    ],
  },
  {
    number: "04",
    title: "Books",
    slug: "books",
    tagline: {
      fr: "Gestion et vente de livres en ligne",
      en: "Online book management & sales",
    },
    categorie: {
      fr: "Application Web / e-commerce",
      en: "Web application / e-commerce",
    },
    description: {
      fr: "Books est une application complète de gestion de librairie composée de deux interfaces : un administrateur permettant d'ajouter, modifier, publier/dépublier et gérer le stock des livres, et un site client permettant aux visiteurs de parcourir le catalogue, rechercher par titre/auteur/type, consulter les disponibilités et ajouter des livres au panier. L'ensemble propose une gestion de stock en temps réel, un système de recherche et de filtres par catégorie, ainsi qu'un formulaire de contact.",
      en: "Books is a complete bookstore management application made up of two interfaces: an admin panel for adding, editing, publishing/unpublishing, and managing book stock, and a client site letting visitors browse the catalog, search by title/author/type, check availability, and add books to a cart. The whole system offers real-time stock management, a search system with category filters, and a contact form.",
    },
    role: {
      fr: "Développement full-stack",
      en: "Full-stack development",
    },
    client: {
      fr: "Projet Commandé par un client",
      en: "Client-commissioned project",
    },
    type: "web",
    tools: [
      { icon: SiPhp, label: "php", color: "#3776AB" },
      { icon: SiMysql, label: "mysql", color: "#4169E1" },
      { icon: SiHtml5, label: "html", color: "#E34F26" },
      { icon: SiCss, label: "css", color: "#6924CE" },
    ],
    year: "2023",
    image: null,
    status: "local",
    link: null,
    downloadLink: null,
    screenshots: [
      {
        src: booksAdmin,
        titre: { fr: "Liste des livres — Administration", en: "Book list — Admin" },
        caption: {
          fr: "Interface d'administration permettant de visualiser, modifier, republier/dépublier et gérer la quantité en stock de chaque livre",
          en: "Admin interface for viewing, editing, republishing/unpublishing, and managing the stock quantity of each book",
        },
        traitement: {
          fr: ["Gestion du stock en temps réel"],
          en: ["Real-time stock management"],
        },
      },
      {
        src: booksAddbook,
        titre: { fr: "Ajout de livre", en: "Add a book" },
        caption: {
          fr: "Formulaire d'ajout d'un nouveau livre au catalogue avec upload d'image de couverture, gestion du prix, du stock et de la description",
          en: "Form for adding a new book to the catalog, with cover image upload, price, stock, and description management",
        },
        traitement: {
          fr: ["Formulaire modal", "upload image", "Validation des champs"],
          en: ["Modal form", "Image upload", "Field validation"],
        },
      },
      {
        src: booksSiteclient,
        titre: { fr: "Site Client", en: "Client site" },
        caption: {
          fr: "Vitrine publique du catalogue avec recherche, filtres par type, ajout au panier et formulaire de contact.",
          en: "Public catalog showcase with search, type filters, add-to-cart, and a contact form.",
        },
        traitement: {
          fr: [
            "Hero avec présentation",
            "Catalogue filtrage",
            "Panier",
            "Formulaire de contact",
          ],
          en: [
            "Hero with presentation",
            "Filterable catalog",
            "Shopping cart",
            "Contact form",
          ],
        },
      },
    ],
  },
  {
    number: "05",
    title: "StageConnect",
    slug: "stageconnect",
    tagline: {
      fr: "Recherche de stage en un seul endroit",
      en: "Internship search in one place",
    },
    categorie: {
      fr: "Plateforme web",
      en: "Web platform",
    },
    description: {
      fr: "Application web permettant aux étudiants de rechercher, suivre et gérer leurs candidatures de stage. Le parcours d'inscription intègre une authentification OAuth multi-étapes avec upload de photo de profil, validation du numéro de téléphone par opérateur, et un système de connexion sécurisé avec vérification d'email et code à 6 chiffres auto-soumis",
      en: "Web application allowing students to search for, track, and manage their internship applications. The signup flow includes multi-step OAuth authentication with profile picture upload, phone number validation by carrier, and a secure login system with email verification and an auto-submitted 6-digit code.",
    },
    role: {
      fr: "Développement full-stack",
      en: "Full-stack development",
    },
    client: {
      fr: "Projet personnel",
      en: "Personal project",
    },
    type: "web",
    tools: [
      { icon: SiReact, label: "ReactNative", color: "#61DAFB" },
      { icon: SiTailwindcss, label: "Tailwind", color: "#06B6D4" },
      { icon: SiVite, label: "vite", color: "#9C4AF8" },
      { icon: SiGsap, label: "gsap", color: "#47A248" },
      { icon: SiNodedotjs, label: "Node.js", color: "#339933" },
      { icon: SiExpress, label: "Express.js", color: "#000" },
      { icon: SiPostgresql, label: "Postgresql", color: "#4169E1" },
    ],
    year: "2026",
    image: null,
    inProgress: true,
    status: "local",
    link: null,
    downloadLink: null,
    screenshots: [],
  },
];