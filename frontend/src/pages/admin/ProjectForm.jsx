// src/pages/admin/ProjectForm.jsx
import { useEffect, useRef, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Plus,
  Pencil,
  Trash2,
  Image as ImageIcon,
  Search,
} from "lucide-react";
import { api, getImageUrl } from "../../lib/api";
import { getToolIcon } from "../../lib/toolsRegistry";

import ImageUploadField from "./ImageUploadField";
import MonitorFrame from "../../components/showcases/MonitorFrame";
import PhoneFrame from "../../components/showcases/PhoneFrame";
import SeamlessCardGallery from "../../components/showcases/SeamlessCardGallery";
import MobileShowcase from "../../components/showcases/MobileShowcase";
import DesktopShowcase from "../../components/showcases/DesktopShowcase";


const emptyProject = {
  slug: "",
  title: "",
  tagline: "",
  categorie: "",
  description: "",
  role: "",
  client: "",
  type: "web",
  status: "local",
  year: new Date().getFullYear(),
  image: "",
  link: "",
  downloadLink: "",
  inProgress: false,
  displayOrder: 0,
};

const emptyShotDraft = { image: "", titre: "", caption: "", traitement: [""] };

// Fonction pour nettoyer le slug
function cleanSlug(slug) {
  if (!slug) return slug;
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState(emptyProject);
  const [allTools, setAllTools] = useState([]);
  const [selectedToolIds, setSelectedToolIds] = useState([]);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [toolsModalOpen, setToolsModalOpen] = useState(false);
  const [toolSearch, setToolSearch] = useState("");

  // ═══ Captures d'écran ═══
  const [screenshots, setScreenshots] = useState([]);
  const [activeShotIndex, setActiveShotIndex] = useState(0);
  const [shotModalOpen, setShotModalOpen] = useState(false);
  const [editingShotIndex, setEditingShotIndex] = useState(null);
  const [shotDraft, setShotDraft] = useState(emptyShotDraft);

  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const laptopWrapRef = useRef(null);
  const asideRef = useRef(null);

  // ═══ Récupération des outils ═══
  useEffect(() => {
    api.getTools()
      .then(setAllTools)
      .catch((err) => {
        console.error('❌ Erreur récupération outils:', err);
        setError(err.message);
      });
  }, []);

  // ═══ Récupération du projet si édition ═══
  useEffect(() => {
    if (!isEditing) return;

    console.log(`🔍 Récupération du projet ID: ${id}`);

    api.getProjectById(id)
      .then((project) => {
        console.log('✅ Projet récupéré:', project);
        console.log('📸 Screenshots:', project.screenshots);

        setForm({
          slug: project.slug,
          title: project.title,
          tagline: project.tagline || "",
          categorie: project.categorie || "",
          description: project.description || "",
          role: project.role || "",
          client: project.client || "",
          type: project.type,
          status: project.status,
          year: project.year || "",
          image: project.image || "",
          link: project.link || "",
          downloadLink: project.downloadLink || "",
          inProgress: project.inProgress,
          displayOrder: project.displayOrder,
        });

        setSelectedToolIds(project.tools.map((t) => t.id));

        // Formater les screenshots pour le frontend
        const formattedScreenshots = (project.screenshots || []).map((s, i) => ({
          id: s.id ?? `existing-${i}`,
          image: s.image || s.src || "",
          titre: s.titre || "",
          caption: s.caption || "",
          traitement: s.traitement?.length ? s.traitement : [""],
          displayOrder: s.displayOrder || 0,
        }));

        console.log('📸 Screenshots formatés:', formattedScreenshots);
        setScreenshots(formattedScreenshots);
        if (formattedScreenshots.length > 0) {
          setActiveShotIndex(0);
        }
      })
      .catch((err) => {
        console.error('❌ Erreur chargement projet:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id, isEditing]);

  // ═══ Animation d'entrée ═══
  useLayoutEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.set(bgRef.current, { opacity: 0 });
      gsap.set(laptopWrapRef.current, { opacity: 0, scale: 0.95, y: 16 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(bgRef.current, { opacity: 1, duration: 0.4 }).to(
        laptopWrapRef.current,
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.4)" },
        "-=0.2"
      );

      if (asideRef.current) {
        gsap.set(asideRef.current, { opacity: 0 });
        tl.to(asideRef.current, { opacity: 1, duration: 0.5 }, "-=0.35");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [loading]);

  // ═══ Handlers formulaire ═══
  const handleChange = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const toggleTool = (toolId) => {
    setSelectedToolIds((prev) =>
      prev.includes(toolId) ? prev.filter((tid) => tid !== toolId) : [...prev, toolId]
    );
  };

  const handleCancel = () => navigate("/admin");

  // ═══ Navigation entre captures ═══
  const goToShot = (index) => {
    const count = screenshots.length;
    if (!count) return;
    setActiveShotIndex((index + count) % count);
  };
  const handlePrevShot = () => goToShot(activeShotIndex - 1);
  const handleNextShot = () => goToShot(activeShotIndex + 1);

  // ═══ Gestion des captures d'écran ═══
  const openAddShotModal = () => {
    setEditingShotIndex(null);
    setShotDraft({ ...emptyShotDraft, traitement: [""] });
    setShotModalOpen(true);
  };

  const openEditShotModal = (index) => {
    const s = screenshots[index];
    if (!s) return;
    setEditingShotIndex(index);
    setShotDraft({
      image: s.image || "",
      titre: s.titre || "",
      caption: s.caption || "",
      traitement: s.traitement?.length ? s.traitement : [""],
    });
    setShotModalOpen(true);
  };

  const closeShotModal = () => setShotModalOpen(false);

  const handleShotDraftChange = (field) => (e) => {
    setShotDraft((d) => ({ ...d, [field]: e.target.value }));
  };

  const updateTraitement = (i, value) => {
    setShotDraft((d) => {
      const next = [...d.traitement];
      next[i] = value;
      return { ...d, traitement: next };
    });
  };

  const addTraitementField = () => {
    setShotDraft((d) => ({ ...d, traitement: [...d.traitement, ""] }));
  };

  const removeTraitementField = (i) => {
    setShotDraft((d) => ({
      ...d,
      traitement: d.traitement.length > 1 ? d.traitement.filter((_, idx) => idx !== i) : d.traitement,
    }));
  };

  const saveShotDraft = () => {
    console.log('📸 saveShotDraft - shotDraft:', shotDraft);

    if (!shotDraft.image) {
      console.warn('⚠️ Pas d\'image dans le draft');
      setError("Veuillez ajouter une image");
      return;
    }

    // Nettoyer les données
    const cleaned = {
      image: shotDraft.image,
      titre: shotDraft.titre || "",
      caption: shotDraft.caption || "",
      traitement: shotDraft.traitement
        .map(t => t.trim())
        .filter(Boolean)
        .length > 0
          ? shotDraft.traitement.map(t => t.trim()).filter(Boolean)
          : [""],
    };

    console.log('📸 Screenshot nettoyé:', cleaned);

    if (editingShotIndex === null) {
      // Ajout
      const newScreenshots = [...screenshots, {
        id: `new-${Date.now()}`,
        ...cleaned
      }];
      console.log('📸 Nouveaux screenshots:', newScreenshots);
      setScreenshots(newScreenshots);
      setActiveShotIndex(newScreenshots.length - 1);
    } else {
      // Modification
      const updatedScreenshots = screenshots.map((s, i) =>
        i === editingShotIndex ? { ...s, ...cleaned } : s
      );
      console.log('📸 Screenshots mis à jour:', updatedScreenshots);
      setScreenshots(updatedScreenshots);
    }

    setShotModalOpen(false);
    setError(null);
  };

  const deleteShot = (index) => {
    console.log(`🗑️ Suppression screenshot ${index}`);
    setScreenshots((prev) => prev.filter((_, i) => i !== index));
    if (activeShotIndex >= screenshots.length - 1) {
      setActiveShotIndex(Math.max(0, screenshots.length - 2));
    }
  };

  // ═══ Soumission du formulaire ═══
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    console.log('📝 Soumission du formulaire');
    console.log('📸 Screenshots avant envoi:', screenshots);

    // Nettoyer le slug
    const cleanedSlug = cleanSlug(form.slug);
    const finalSlug = cleanedSlug || `project-${Date.now()}`;
    console.log(`🔍 Slug: "${form.slug}" -> nettoyé: "${finalSlug}"`);

    // Formater les screenshots pour l'API
    const formattedScreenshots = screenshots.map(s => ({
      image: s.image || "",
      titre: s.titre || "",
      caption: s.caption || "",
      traitement: s.traitement || [""],
    }));

    console.log('📸 Screenshots formatés pour API:', formattedScreenshots);

    // Le lien déployé ne s'applique que si le projet est en ligne ;
    // le lien de téléchargement ne s'applique qu'aux projets desktop/mobile en ligne.
    const isDeployed = form.status === "deployed";
    const isDownloadableType = form.type === "desktop" || form.type === "mobile";

    const payload = {
      slug: finalSlug,
      title: form.title,
      tagline: form.tagline || "",
      categorie: form.categorie || "",
      description: form.description || "",
      role: form.role || "",
      client: form.client || "",
      type: form.type || "web",
      status: form.status || "local",
      year: form.year ? Number(form.year) : null,
      image: form.image || null,
      link: isDeployed ? (form.link || null) : null,
      downloadLink: isDeployed && isDownloadableType ? (form.downloadLink || null) : null,
      inProgress: Boolean(form.inProgress),
      displayOrder: form.displayOrder || 0,
      toolIds: selectedToolIds || [],
      screenshots: formattedScreenshots,
    };

    console.log('📦 Payload final:', JSON.stringify(payload, null, 2));

    try {
      if (isEditing) {
        console.log(`📝 Mise à jour du projet ${id}`);
        const result = await api.updateProject(id, payload);
        console.log('✅ Mise à jour réussie:', result);
        console.log('📸 Screenshots dans la réponse:', result.screenshots);
      } else {
        console.log('📝 Création d\'un nouveau projet');
        const result = await api.createProject(payload);
        console.log('✅ Création réussie:', result);
        console.log('📸 Screenshots dans la réponse:', result.screenshots);
      }
      navigate("/admin");
    } catch (err) {
      console.error('❌ Erreur submit:', err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const previewTools = selectedToolIds
    .map((tid) => allTools.find((t) => t.id === tid))
    .filter(Boolean);

  // ═══ Outils filtrés par la recherche dans le modal ═══
  const filteredTools = allTools.filter((tool) =>
    tool.label.toLowerCase().includes(toolSearch.trim().toLowerCase())
  );

  const isMobileProject = form.type === "mobile";
  const clampedShotIndex = Math.min(activeShotIndex, Math.max(screenshots.length - 1, 0));
  const activeShot = screenshots[clampedShotIndex];
  const showcaseScreenshots = screenshots.map((s) => ({ ...s, src: s.image }));

  // ═══ Affichage conditionnel des champs liens ═══
  const isDeployed = form.status === "deployed";
  const isDownloadableType = form.type === "desktop" || form.type === "mobile";

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <p className="text-xs text-white/50 font-poppins">Chargement...</p>
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="fixed inset-0  bg-black overflow-hidden w-full h-full z-50"
    >
      {/* Watermark de fond */}
      <div ref={bgRef} className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="text-[17rem] md:text-[18rem] font-baloo font-bold text-white/5 select-none whitespace-nowrap">
          {"</tian>"}
        </span>
      </div>
        <button
          type="button"
          onClick={handleCancel}
          className="fixed left-6 top-6 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-sm transition-colors hover:text-white hover:border-white/40"
        >
          <ChevronLeft size={18} />
        </button>
  
      

      {/* Bouton menu mobile */}
      <button
        type="button"
        onClick={() => setPanelOpen((p) => !p)}
        aria-label={panelOpen ? "Fermer le panneau" : "Ouvrir le panneau"}
        className="fixed right-6 top-20 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-sm transition-colors hover:text-white hover:border-white/40 lg:hidden"
      >
        <span className="relative flex h-4 w-4 items-center justify-center">
          <Menu
            size={18}
            className={`absolute transition-all duration-300 ${
              panelOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
            }`}
          />
          <X
            size={18}
            className={`absolute transition-all duration-300 ${
              panelOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
            }`}
          />
        </span>
      </button>

      {/* Overlay mobile */}
      {panelOpen && (
        <div
          onClick={() => setPanelOpen(false)}
          className="fixed inset-0 z-10 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Conteneur principal */}
      <div className="flex h-full w-full ">
        {/* ═══ Moitié gauche : Zone frame + galerie ═══ */}
        {/* ═══ Moitié gauche : Zone frame + galerie ═══ */}
        <div className="flex-1 w-1/2 min-h-0 flex flex-col items-center justify-center text-center overflow-hidden">
          {activeShot?.titre && (
            <h2 className="text-xl font-borel text-white/80 ">{activeShot.titre}</h2>
          )}
            <div className="flex items-center justify-center w-full flex-1 min-h-0">
            {screenshots.length > 1 && (
                <button
                type="button"
                onClick={handlePrevShot}
                className="flex shrink-0 items-center justify-center text-white/60 transition-colors hover:text-[#88ce02]"
                >
                <ChevronLeft size={48} />
                </button>
            )}

            <div ref={laptopWrapRef} className="w-full max-w-4xl">
                {screenshots.length > 0 ? (
                // ═══════════════════════════════════════════════
                // LOGS POUR LE SHOWCASE
                // ═══════════════════════════════════════════════
                (() => {
                    console.log('📸 [RENDER] screenshots:', screenshots);
                    console.log('📸 [RENDER] showcaseScreenshots:', showcaseScreenshots);
                    console.log('📸 [RENDER] activeIndex:', clampedShotIndex);
                    console.log('📸 [RENDER] isMobileProject:', isMobileProject);

                    return isMobileProject ? (
                    <MobileShowcase screenshots={showcaseScreenshots} activeIndex={clampedShotIndex} />
                    ) : (
                    <DesktopShowcase screenshots={showcaseScreenshots} activeIndex={clampedShotIndex} />
                    );
                })()
                ) : (
                <EmptyShotFrame isMobile={isMobileProject} onAdd={openAddShotModal} />
                )}
            </div>

            {screenshots.length > 1 && (
                <button
                type="button"
                onClick={handleNextShot}
                className="flex shrink-0 items-center justify-center text-white/60 transition-colors hover:text-[#88ce02]"
                >
                <ChevronRight size={48} />
                </button>
            )}
            </div>

          {screenshots.length > 1 && (
            // APRÈS
            <SeamlessCardGallery
              images={screenshots.map((s) => getImageUrl(s.image))}
              activeIndex={clampedShotIndex}
              onSelect={setActiveShotIndex}
            />
          )}

          {/* Toolbar gestion des captures */}
          <div className="flex items-center gap-2 ">
            <button
              type="button"
              onClick={openAddShotModal}
              className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-poppins text-white/70 hover:text-white hover:border-white/40 transition-colors"
            >
              <Plus size={13} /> Ajouter une capture
            </button>

            {screenshots.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={() => openEditShotModal(clampedShotIndex)}
                  aria-label="Modifier la capture"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/60 hover:text-white hover:border-white/40 transition-colors"
                >
                  <Pencil size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => deleteShot(clampedShotIndex)}
                  aria-label="Supprimer la capture"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/60 hover:text-red-400 hover:border-red-400/40 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* ═══ Moitié droite : Panneau formulaire ═══ */}
        <div
          ref={asideRef}
          className={`fixed lg:static top-0 right-0 z-20 h-full font-poppins  max-w-[400px]  text-black flex flex-col gap-2  px-4 pt-8 shrink-0 justify-start bg-black/95 lg:bg-black/95 border-l border-white/10 overflow-y-auto overflow-x-hidden transition-transform duration-300 ease-out lg:translate-x-0 ${
            panelOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 w-full">
            <h1 className="text-xl font-borel font-bold text-center text-white mb-1">
              {isEditing ? "Modifier le projet" : "Nouveau projet"}
            </h1>

            {error && (
              <p className="text-[11px] text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-1.5 font-poppins">
                {error}
              </p>
            )}

            {/* Logo */}
            <div className="flex justify-center py-1">
              <div className="w-40">
                {isMobileProject ? (
                  <PhoneFrame>
                    <ImageUploadField
                      compact
                      value={form.image}
                      onChange={(url) => setForm((f) => ({ ...f, image: url }))}
                    />
                  </PhoneFrame>
                ) : (
                  <MonitorFrame>
                    <ImageUploadField
                      compact
                      value={form.image}
                      onChange={(url) => setForm((f) => ({ ...f, image: url }))}
                    />
                  </MonitorFrame>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <Field label="Titre">
                <input className="field-input" value={form.title} onChange={handleChange("title")} required />
              </Field>
              <Field label="Slug">
                <input
                  className="field-input"
                  value={form.slug}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Nettoyer automatiquement pendant la saisie
                    const cleaned = cleanSlug(value);
                    setForm((f) => ({ ...f, slug: cleaned }));
                  }}
                  placeholder="mon-projet-slug"
                />
                {form.slug && !/^[a-z0-9-]+$/.test(form.slug) && (
                  <p className="text-[10px] text-yellow-400 mt-1">
                    ⚠️ Le slug sera automatiquement nettoyé
                  </p>
                )}
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <Field label="Tagline">
                <input className="field-input" value={form.tagline} onChange={handleChange("tagline")} />
              </Field>
              <Field label="Catégorie">
                <input className="field-input" value={form.categorie} onChange={handleChange("categorie")} />
              </Field>
            </div>

            <Field label="Description">
              <textarea
                className=" resize-none w-full h-32 rounded-2xl bg-white/10 px-6 py-2.5 text-xs text-white font-poppins outline-none transition-colors"
                rows={2}
                value={form.description}
                onChange={handleChange("description")}
              />
            </Field>

            <div className="grid grid-cols-2 gap-2.5">
              <Field label="Rôle">
                <input className="field-input" value={form.role} onChange={handleChange("role")} />
              </Field>
              <Field label="Client">
                <input className="field-input" value={form.client} onChange={handleChange("client")} />
              </Field>
            </div>

            <div className="grid grid-cols-2  gap-2.5">
              <Field label="Type">
                <select className="field-input" value={form.type} onChange={handleChange("type")}>
                  <option value="web">Web</option>
                  <option value="desktop">Desktop</option>
                  <option value="mobile">Mobile</option>
                </select>
              </Field>
              <Field label="Statut">
                <select className="field-input" value={form.status} onChange={handleChange("status")}>
                  <option value="local">En local</option>
                  <option value="deployed">En ligne</option>
                </select>
              </Field>
            </div>

            <Field label="Année">
              <input
                type="number"
                className="field-input"
                value={form.year}
                onChange={handleChange("year")}
              />
            </Field>

            {/* Lien déployé/web : uniquement si le projet est en ligne */}
            {isDeployed && (
              <Field label="Lien (déployé/web)">
                <input className="field-input" value={form.link} onChange={handleChange("link")} />
              </Field>
            )}

            {/* Lien de téléchargement : uniquement si en ligne ET type desktop/mobile */}
            {isDeployed && isDownloadableType && (
              <Field label="Lien de téléchargement">
                <input className="field-input" value={form.downloadLink} onChange={handleChange("downloadLink")} />
              </Field>
            )}

            {/* Toggle "En cours de développement" */}
            <div className="flex items-center justify-between gap-3 py-1">
              <label className="flex items-center gap-3 text-[11px] font-poppins text-white/70 cursor-pointer select-none">
                <span
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors duration-300 ${
                    form.inProgress
                      ? "bg-orange-500 border-orange-500"
                      : "bg-white/5 border-white/15"
                  }`}
                  onClick={() =>
                    setForm((f) => ({ ...f, inProgress: !f.inProgress }))
                  }
                >
                  <input
                    type="checkbox"
                    checked={form.inProgress}
                    onChange={handleChange("inProgress")}
                    className="sr-only"
                  />
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
                      form.inProgress ? "translate-x-[18px]" : "translate-x-1"
                    }`}
                  />
                </span>
                En cours de développement
              </label>
            </div>

            {/* Outils utilisés */}
            <Field label="Outils utilisés">
              <button
                type="button"
                onClick={() => setToolsModalOpen(true)}
                className="field-input flex items-center justify-between gap-2 text-left"
              >
                <span className={selectedToolIds.length ? "text-white" : "text-white/40"}>
                  {selectedToolIds.length > 0
                    ? `${selectedToolIds.length} outil${selectedToolIds.length > 1 ? "s" : ""} sélectionné${
                        selectedToolIds.length > 1 ? "s" : ""
                      }`
                    : "Sélectionner des outils"}
                </span>
                <ChevronDown size={14} className="text-white/40 shrink-0" />
              </button>

              {previewTools.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {previewTools.map((tool) => {
                    const Icon = getToolIcon(tool.iconName);
                    return (
                      <span
                        key={tool.id}
                        className="flex items-center gap-1 text-[10px] font-poppins px-2 py-0.5 rounded-full border border-white/15 bg-white/5 text-white/70"
                      >
                        {Icon && <Icon size={11} style={{ color: tool.color }} />}
                        {tool.label}
                      </span>
                    );
                  })}
                </div>
              )}
            </Field>

            <div className="flex gap-2 rounded-t-2xl sticky bottom-0 bg-black py-8">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-2 text-[11px] font-poppins bg-white/5 rounded-full font-medium text-white/40 rounded-full0 hover:text-white transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-2 text-[11px] font-poppins font-semibold uppercase tracking-wide text-black bg-green-400 rounded-full hover:bg-green-300 transition-colors disabled:opacity-50"
              >
                {saving ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de sélection des outils */}
      {toolsModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          onClick={() => {
            setToolsModalOpen(false);
            setToolSearch("");
          }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-sm max-h-[70vh] flex flex-col gap-4 bg-neutral-950 border border-white/10 rounded-2xl p-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-baloo font-bold uppercase text-white/50">
                Outils utilisés
              </h2>
              <button
                type="button"
                onClick={() => {
                  setToolsModalOpen(false);
                  setToolSearch("");
                }}
                className="flex h-7 w-7 items-center justify-center rounded-full text-white hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Champ de recherche */}
            <div className="relative shrink-0">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                autoFocus
                value={toolSearch}
                onChange={(e) => setToolSearch(e.target.value)}
                placeholder="Rechercher un outil..."
                className="w-full rounded-full bg-white/5 border border-white/15 pl-8 pr-8 py-2 text-xs text-white font-poppins outline-none focus:border-white/40 transition-colors"
              />
              {toolSearch && (
                <button
                  type="button"
                  onClick={() => setToolSearch("")}
                  aria-label="Effacer la recherche"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 overflow-y-auto pr-1">
              {filteredTools.length > 0 ? (
                filteredTools.map((tool) => {
                  const Icon = getToolIcon(tool.iconName);
                  const active = selectedToolIds.includes(tool.id);
                  return (
                    <button
                      type="button"
                      key={tool.id}
                      onClick={() => toggleTool(tool.id)}
                      className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] font-poppins transition-colors ${
                        active
                          ? "border-white bg-white text-black"
                          : "border-white/15 bg-white/5 text-white"
                      }`}
                    >
                      {Icon && <Icon size={12} style={{ color: active ? tool.color : undefined }} />}
                      {tool.label}
                    </button>
                  );
                })
              ) : (
                <p className="text-[11px] text-white/30 font-poppins px-1 py-2">
                  Aucun outil trouvé pour « {toolSearch} »
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setToolsModalOpen(false);
                setToolSearch("");
              }}
              className="mt-auto py-2 text-[11px] font-poppins font-semibold uppercase tracking-wide text-black bg-green-400 rounded-full hover:bg-green-300 transition-colors"
            >
              Terminé
            </button>
          </div>
        </div>
      )}

      {/* Modal d'ajout / modification d'une capture d'écran */}
      {shotModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          onClick={closeShotModal}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-sm max-h-[80vh] overflow-y-auto flex flex-col  bg-neutral-950 border border-white/10 rounded-2xl p-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-borel font-bold text-white">
                {editingShotIndex === null ? "Ajouter une capture" : "Modifier la capture"}
              </h2>
              <button
                type="button"
                onClick={closeShotModal}
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            <ImageUploadField
            
              value={shotDraft.image}
              onChange={(url) => {
                console.log('📸 URL de l\'image:', url);
                setShotDraft((d) => ({ ...d, image: url }));
              }}
            />

            <Field label="Titre">
              <input className="field-input" value={shotDraft.titre} onChange={handleShotDraftChange("titre")} />
            </Field>

            <Field label="Description">
              <textarea
                className="field-input resize-none"
                rows={2}
                value={shotDraft.caption}
                onChange={handleShotDraftChange("caption")}
              />
            </Field>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                Traitements
              </p>
              <div className="flex flex-col gap-2">
                {shotDraft.traitement.map((t, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      className="field-input flex-1"
                      value={t}
                      placeholder={`Traitement ${i + 1}`}
                      onChange={(e) => updateTraitement(i, e.target.value)}
                    />
                    {shotDraft.traitement.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTraitementField(i)}
                        aria-label="Retirer ce traitement"
                        className="text-white/40 hover:text-red-400 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addTraitementField}
                className="mt-2 flex items-center gap-1 text-[11px] font-poppins text-white/50 hover:text-white transition-colors"
              >
                <Plus size={12} /> Ajouter un traitement
              </button>
            </div>

            <button
              type="button"
              onClick={saveShotDraft}
              disabled={!shotDraft.image}
              className="mt-2 py-2 text-[11px] font-poppins font-semibold uppercase tracking-wide text-black bg-green-400 rounded-full hover:bg-green-300 transition-colors disabled:opacity-50"
            >
              {editingShotIndex === null ? "Ajouter" : "Enregistrer"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

// ═══ Composants utilitaires ═══

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}

function EmptyShotFrame({ isMobile, onAdd }) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className={`group flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/15 bg-white/5 text-white/30 hover:text-white/60 hover:border-white/30 transition-colors ${
        isMobile
          ? "w-full max-w-[280px] aspect-[9/19] mx-auto rounded-[38px]"
          : "w-full max-w-3xl aspect-video mx-auto"
      }`}
    >
      <ImageIcon size={28} />
      <span className="text-[10px] font-poppins uppercase tracking-wide">
        Aucune capture — cliquez pour ajouter
      </span>
    </button>
  );
}