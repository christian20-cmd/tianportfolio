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
  SiNodebb,
  SiExpressdotcom,
} from "react-icons/si";

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
    type: "Web",
    tools: [
      { icon: SiReact, label: "React", color: "#61DAFB" },
      { icon: SiDotnet, label: "Dotnet", color: "#339933" },
      { icon: SiPostgresql, label: "Postgresql", color: "#4169E1" },
      { icon: SiTailwindcss, label: "Tailwind", color: "#06B6D4" },
    ],
    year: "2026",
    image: "src/assets/goodeyes/logoW.png",
    status: "local",
    downloadLink: null,
    screenshots: [
      {
        src: "src/assets/goodeyes/login.png",
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
        src: "src/assets/goodeyes/dashboard.png",
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
        src: "src/assets/goodeyes/trafic_reseau.png",
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
        src: "src/assets/goodeyes/alerte.png",
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
        src: "src/assets/goodeyes/ipbloque.png",
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
        src: "src/assets/goodeyes/rapport.png",
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
    image: "src/assets/3A/3ALogo.png",
    status: "local",
    downloadLink: null,
    screenshots: [
      {
        src: "src/assets/3A/login.jpeg",
        titre: "Connexion",
        caption: "Accueil — recherche d'avocat par spécialité",
        traitement: [
          "Connexion client ou avocat via un compte unique",
        ],
      },
      {
        src: "src/assets/3A/dashboardclient.jpeg",
        titre: "Tableau de bord client",
        caption: "Suivi des rendez-vous pris par le client",
        traitement: [
          "Historique des rendez-vous passés et à venir",
          "Statut de chaque rendez-vous (confirmé, en attente, annulé)",
          "Accès rapide pour reprendre un nouveau rendez-vous",
        ],
      },
      {
        src: "src/assets/3A/ListavocatDispo.jpeg",
        titre: "Liste des avocats disponibles",
        caption: "Résultats de recherche filtrés par disponibilité",
        traitement: [
          "Liste des avocats disponibles selon les critères de recherche",
         
          "Accès direct à la prise de rendez-vous",
        ],
      },

      {
        src: "src/assets/3A/rdvavocat.jpeg",
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
        src: "src/assets/3A/dashboardavocat.jpeg",
        titre: "Tableau de bord avocat",
        caption: "Vue d'ensemble des rendez-vous de l'avocat",
        traitement: [
          "Liste des rendez-vous à venir",
          "Statistiques de rendez-vous (confirmés, annulés)",
          "Accès rapide à la gestion des disponibilités",
        ],
      },
      {
        src: "src/assets/3A/disponibilitepageavocat.jpeg",
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
    image: "src/assets/Nstudios/LogoNstudio.png",
    status: "local",
    downloadLink: null,
    screenshots: [
      {
        src: "/src/assets/Nstudios/accueil.png",
        titre: "Accueil",
        caption: "Page d'accueil avec présentation du studio, section vidéo et FAQ.",
        traitement: [
          "Hero avec vidéo de fond",
          "Section présentation",
          
        ],
      },
      {
        src: "/src/assets/Nstudios/Nstudio.png",
        titre: "N Studio",
        caption: "Galerie photo/vidéo et section audio présentant les réalisations du studio.",
        traitement: [
          "Galerie masonry",
          "Lecteur audio intégré",
          "FAQ interactive",
        ],
      },
      {
        src: "/src/assets/Nstudios/Apropos.png",
        titre: "A propos",
        caption: "Présentation détaillée des services : photo, vidéo, confection, conception, impression, avec statistiques et section contact.",
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
    image:
      "",
    status: "local",
    link: null,
    downloadLink: null,
    screenshots: [
      {
        src: "/src/assets/books/admin.png",
        titre: "Liste des livres — Administration",
        caption: "Interface d'administration permettant de visualiser, modifier, republier/dépublier et gérer la quantité en stock de chaque livre",
        traitement: [
          "Gestion du stock en temps réel",
        ],
      },
      {
        src: "/src/assets/books/addbook.png",
        titre: "Ajout de livre",
        caption: "Formulaire d'ajout d'un nouveau livre au catalogue avec upload d'image de couverture, gestion du prix, du stock et de la description",
        traitement: [
          "Formulaire modal",
          "upload image",
          "Validation des champs",
        ],
      },
      {
        src: "/src/assets/books/siteclient.png",
        titre: "Site Client",
        caption: "Vitrine publique du catalogue avec recherche, filtres par type, ajout au panier et formulaire de contact.",
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
    tagline: "Trouvez et gérez vos recherches de stage en un seul endroit",
    categorie: "Plateforme web",
    description:
      "Application web permettant aux étudiants de rechercher, suivre et gérer leurs candidatures de stage. Le parcours d'inscription intègre une authentification OAuth multi-étapes avec upload de photo de profil, validation du numéro de téléphone par opérateur, et un système de connexion sécurisé avec vérification d'email et code à 6 chiffres auto-soumis",
    role: "Développement frontend & intégration data",
    client: "Projet personnel",
    type: "web",
    tools: [
      { icon: SiReact, label: "React", color: "#DD0031" },
      { icon: SiVite, label: "vite", color: "#47A248" },
      { icon: SiGsap, label: "gsap", color: "#47A248" },
      { icon: SiNodebb, label: "node", color: "#47A248" },
      { icon: SiExpressdotcom, label: "express", color: "#47A248" },
      { icon: SiPostgresql, label: "postgresql", color: "#47A248" },
      { icon: SiTailwindcss, label: "tailwindcss", color: "#47A248" },
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