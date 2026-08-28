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
    tagline: "Détection d'anomalies réseau",
    categorie: "Cybersécurité & Supervision réseau",
    description:
      "Système ASP.NET Core avec ML.NET pour surveiller le trafic réseau et détecter automatique les comportements anormaux(Instrusions, DDos, scans de ports, malwares). Génère des alertes en temps réel de produit ds rapports d'analyse des anomalies détectées.",
    role: "Développement full-stack et Réseau",
    client: "Projet personnel",
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
        titre: "Connexion",
        caption: "Authentification sécurisée de l'administrateur",
        traitement: [
          "Authentification par identifiant et mot de passe",
          "Validation des champs côté client",
          "Redirection automatique vers le tableau de bord après connexion",
          "Gestion des erreurs de connexion (identifiants invalides)",
        ],
      },
      {
        src: goodeyesDashboard,
        titre: "Tableau de bord",
        caption: "Vue temps réel du trafic réseau",
        traitement: [
          "Vue d'ensemble du trafic réseau en temps réel",
          "Indicateurs clés (connexions actives, alertes du jour, IP bloquées)",
          "Graphiques d'activité réseau sur les dernières 24h",
          "Accès rapide aux modules Alertes / IP bloquées / Rapports",
        ],
      },
      {
        src: goodeyesTraficReseau,
        titre: "Trafic réseau",
        caption: "Analyse détaillée du trafic entrant et sortant",
        traitement: [
          "Visualisation du trafic réseau en temps réel",
          "Détection des pics d'activité suspects",
          "Segmentation du trafic par protocole et par IP source",
          "Historique consultable sur plusieurs périodes",
        ],
      },
      {
        src: goodeyesAlerte,
        titre: "Alertes",
        caption: "Système d'alertes automatiques sur intrusions détectées",
        traitement: [
          "Génération automatique d'alertes sur comportement anormal",
          "Classification par type (Intrusion, DDoS, Malware, Scan de ports)",
          "Filtrage des alertes par gravité et par date",
          "Marquage des alertes comme traitées / ignorées",
        ],
      },
      {
        src: goodeyesIpBloque,
        titre: "IP bloquées",
        caption: "Gestion des adresses IP bloquées automatiquement ou manuellement",
        traitement: [
          "Liste des IP bloquées avec motif et date de blocage",
          "Blocage manuel d'une IP via recherche",
          "Déblocage d'une IP en un clic",
          "Filtrage par statut (bloquées / débloquées / toutes)",
        ],
      },
      {
        src: goodeyesRapport,
        titre: "Rapport",
        caption: "Rapport d'analyse exportable des anomalies",
        traitement: [
          "Génération de rapports périodiques des anomalies détectées",
          "Export au format PDF",
          "Filtrage par période et par type d'anomalie",
          "Visualisation graphique des tendances",
        ],
      },
    ],
  },
  {
    number: "02",
    title: "3A",
    slug: "3a",
    tagline: "Gestion de rendez vous aux avocats",
    categorie: "Legal Tech & Prise de rendez-vous",
    description: "Page d'accueil statique pour présenter un produit.",
    role: "Développement mobile & backend",
    client: "Projet école",
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
        titre: "Connexion",
        caption: "Accueil — recherche d'avocat par spécialité",
        traitement: ["Connexion client ou avocat via un compte unique"],
      },
      {
        src: troisADashboardClient,
        titre: "Tableau de bord client",
        caption: "Suivi des rendez-vous pris par le client",
        traitement: [
          "Historique des rendez-vous passés et à venir",
          "Statut de chaque rendez-vous (confirmé, en attente, annulé)",
          "Accès rapide pour reprendre un nouveau rendez-vous",
        ],
      },
      {
        src: troisAListAvocatDispo,
        titre: "Liste des avocats disponibles",
        caption: "Résultats de recherche filtrés par disponibilité",
        traitement: [
          "Liste des avocats disponibles selon les critères de recherche",
          "Accès direct à la prise de rendez-vous",
        ],
      },
      {
        src: troisARdvAvocat,
        titre: "Prise de rendez-vous",
        caption: "Prise de rendez-vous avec calendrier interactif",
        traitement: [
          "Sélection d'un créneau via calendrier interactif",
          "Confirmation instantanée de la réservation",
          "Notification envoyée à l'avocat et au client",
          "Annulation ou modification du rendez-vous",
        ],
      },
      {
        src: troisADashboardAvocat,
        titre: "Tableau de bord avocat",
        caption: "Vue d'ensemble des rendez-vous de l'avocat",
        traitement: [
          "Liste des rendez-vous à venir",
          "Statistiques de rendez-vous (confirmés, annulés)",
          "Accès rapide à la gestion des disponibilités",
        ],
      },
      {
        src: troisADisponibilitePageAvocat,
        titre: "Disponibilités avocat",
        caption: "Gestion des créneaux disponibles par l'avocat",
        traitement: [
          "Ajout et retrait de créneaux disponibles",
          "Vue calendrier des disponibilités",
          "Blocage automatique des créneaux déjà réservés",
        ],
      },
    ],
  },
  {
    number: "03",
    title: "N Studio",
    slug: "nstudio",
    tagline: "Studio photo, vidéo & son",
    categorie: "Site Vitrine d'entreprise",
    description:
      "Site vitrine développé pour N Studio, un studio de production photo, vidéo et audio basé à Fianarantsoa. Le site présente les services (photo, vidéo, confection, conception, impression), une galerie de réalisations, une section audio interactive et une FAQ. Interface sombre et moderne réalisée avec React, Tailwind CSS et GSAP pour les animations.",
    role: "Développement frontend",
    client: "NIZANAKOLONA Studio",
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
        titre: "Accueil",
        caption: "Page d'accueil avec présentation du studio, section vidéo et FAQ.",
        traitement: ["Hero avec vidéo de fond", "Section présentation"],
      },
      {
        src: nstudioNstudio,
        titre: "N Studio",
        caption: "Galerie photo/vidéo et section audio présentant les réalisations du studio.",
        traitement: ["Galerie masonry", "Lecteur audio intégré", "FAQ interactive"],
      },
      {
        src: nstudioApropos,
        titre: "A propos",
        caption:
          "Présentation détaillée des services : photo, vidéo, confection, conception, impression, avec statistiques et section contact.",
        traitement: [
          "Carte Services animées ",
          "Statistiques (+5ans, +20 clients)",
          "Call-to-actions",
        ],
      },
    ],
  },
  {
    number: "04",
    title: "Books",
    slug: "books",
    tagline: "Gestion et vente de livres en ligne",
    categorie: "Application Web / e-commerce",
    description:
      "Books est une application complète de gestion de librairie composée de deux interfaces : un administrateur permettant d'ajouter, modifier, publier/dépublier et gérer le stock des livres, et un site client permettant aux visiteurs de parcourir le catalogue, rechercher par titre/auteur/type, consulter les disponibilités et ajouter des livres au panier. L'ensemble propose une gestion de stock en temps réel, un système de recherche et de filtres par catégorie, ainsi qu'un formulaire de contact.",
    role: "Développement full-stack",
    client: "Projet Commandé par un client",
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
        titre: "Liste des livres — Administration",
        caption:
          "Interface d'administration permettant de visualiser, modifier, republier/dépublier et gérer la quantité en stock de chaque livre",
        traitement: ["Gestion du stock en temps réel"],
      },
      {
        src: booksAddbook,
        titre: "Ajout de livre",
        caption:
          "Formulaire d'ajout d'un nouveau livre au catalogue avec upload d'image de couverture, gestion du prix, du stock et de la description",
        traitement: ["Formulaire modal", "upload image", "Validation des champs"],
      },
      {
        src: booksSiteclient,
        titre: "Site Client",
        caption:
          "Vitrine publique du catalogue avec recherche, filtres par type, ajout au panier et formulaire de contact.",
        traitement: [
          "Hero avec présentation",
          "Catalogue filtrage",
          "Panier",
          "Formulaire de contact",
        ],
      },
    ],
  },
  {
    number: "05",
    title: "StageConnect",
    slug: "stageconnect",
    tagline: "Recherche de stage en un seul endroit",
    categorie: "Plateforme web",
    description:
      "Application web permettant aux étudiants de rechercher, suivre et gérer leurs candidatures de stage. Le parcours d'inscription intègre une authentification OAuth multi-étapes avec upload de photo de profil, validation du numéro de téléphone par opérateur, et un système de connexion sécurisé avec vérification d'email et code à 6 chiffres auto-soumis",
    role: "Développement full-stack",
    client: "Projet personnel",
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