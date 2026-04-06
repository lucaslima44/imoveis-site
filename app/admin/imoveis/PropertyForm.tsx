"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Property } from "@/types";
import { Save, ArrowLeft, Upload, X, Star, Loader2 } from "lucide-react";
import Image from "next/image";

type FormData = Omit<Property, "id" | "images">;

const emptyForm: FormData = {
  title: "",
  type: "apartamento",
  contractType: "venda",
  price: 0,
  address: "",
  neighborhood: "",
  city: "São Paulo",
  state: "SP",
  bedrooms: 1,
  bathrooms: 1,
  parkingSpots: 0,
  area: 0,
  description: "",
  featured: false,
  status: "disponivel",
};

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block font-body text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-xs font-body mt-1">{error}</p>
      )}
    </div>
  );
}

function Input({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2.5 border border-gray-200 text-navy-900 text-sm font-body focus:outline-none focus:border-navy-900 transition-colors ${className}`}
    />
  );
}

function Select({
  className = "",
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full px-3 py-2.5 border border-gray-200 text-navy-900 text-sm font-body focus:outline-none focus:border-navy-900 transition-colors bg-white ${className}`}
    />
  );
}

export default function PropertyForm({
  initialData,
  mode,
}: {
  initialData?: Property;
  mode: "create" | "edit";
}) {
  const router = useRouter();

  const [form, setForm] = useState<FormData>(() => {
    if (!initialData) return emptyForm;
    const { id: _id, images: _images, ...rest } = initialData;
    return rest as FormData;
  });

  const [images, setImages]         = useState<string[]>(initialData?.images ?? []);
  const [errors, setErrors]         = useState<Partial<Record<keyof FormData, string>>>({});
  const [saving, setSaving]         = useState(false);
  const [uploading, setUploading]   = useState(false);
  const [removing, setRemoving]     = useState<string | null>(null);
  const [globalError, setGlobalError] = useState("");

  function update(field: keyof FormData, value: unknown) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate(): boolean {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!form.title.trim())        errs.title       = "Título obrigatório.";
    if (!form.address.trim())      errs.address     = "Endereço obrigatório.";
    if (!form.neighborhood.trim()) errs.neighborhood = "Bairro obrigatório.";
    if (!form.city.trim())         errs.city        = "Cidade obrigatória.";
    if (!form.description.trim())  errs.description  = "Descrição obrigatória.";
    if (Number(form.price) <= 0)   errs.price       = "Valor deve ser maior que zero.";
    if (Number(form.area)  <= 0)   errs.area        = "Área deve ser maior que zero.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setGlobalError("");
    try {
      const url =
        mode === "create"
          ? "/api/admin/imoveis"
          : `/api/admin/imoveis/${initialData!.id}`;

      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          images,
          featured: form.featured === true,
          price: Number(form.price),
          area: Number(form.area),
          bedrooms: Number(form.bedrooms),
          bathrooms: Number(form.bathrooms),
          parkingSpots: Number(form.parkingSpots),
        }),
      });

      if (res.ok) {
        router.push("/admin/imoveis");
        router.refresh();
      } else {
        const d = await res.json();
        setGlobalError(d.error ?? "Erro ao salvar.");
      }
    } catch {
      setGlobalError("Erro de conexão.");
    } finally {
      setSaving(false);
    }
  }

  async function handlePhotoUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !initialData?.id) return;

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!allowed.includes(file.type)) {
      alert("Use JPG, PNG, WEBP ou AVIF.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      alert("Máximo 8 MB por foto.");
      return;
    }

    setUploading(true);
    const fd = new FormData();
    fd.append("foto", file);

    try {
      const res = await fetch(
        `/api/admin/imoveis/${initialData.id}/fotos`,
        { method: "POST", body: fd }
      );
      if (res.ok) {
        const d = await res.json();
        setImages(d.property.images);
      } else {
        alert("Erro no upload da foto.");
      }
    } catch {
      alert("Erro de conexão.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handlePhotoRemove(url: string) {
    if (!initialData?.id) {
      setImages((i) => i.filter((x) => x !== url));
      return;
    }
    setRemoving(url);
    try {
      const res = await fetch(
        `/api/admin/imoveis/${initialData.id}/fotos`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        }
      );
      if (res.ok) {
        const d = await res.json();
        setImages(d.property.images);
      } else {
        alert("Erro ao remover foto.");
      }
    } catch {
      alert("Erro de conexão.");
    } finally {
      setRemoving(null);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ── Informações Básicas ── */}
      <div className="bg-white border border-gray-200 p-6">
        <h2 className="font-body text-xs font-semibold text-gray-500 uppercase tracking-[0.15em] mb-5 pb-3 border-b border-gray-100">
          Informações Básicas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Field label="Título *" error={errors.title}>
              <Input
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="Ex: Apartamento 2 dormitórios no Parque Fernanda"
                maxLength={200}
              />
            </Field>
          </div>

          <Field label="Tipo *">
            <Select
              value={form.type}
              onChange={(e) => update("type", e.target.value)}
            >
              <option value="apartamento">Apartamento</option>
              <option value="casa">Casa</option>
            </Select>
          </Field>

          <Field label="Tipo de negócio">
            <Select
              value={form.contractType ?? "venda"}
              onChange={(e) => update("contractType", e.target.value)}
            >
              <option value="venda">Venda</option>
              <option value="locacao">Locação / Aluguel</option>
              <option value="venda_locacao">Venda e Locação</option>
            </Select>
          </Field>

          <Field label="Valor (R$) *" error={errors.price}>
            <Input
              type="number"
              value={form.price || ""}
              onChange={(e) => update("price", Number(e.target.value))}
              placeholder="Ex: 280000"
              min={0}
            />
          </Field>

          <Field label="Área (m²) *" error={errors.area}>
            <Input
              type="number"
              value={form.area || ""}
              onChange={(e) => update("area", Number(e.target.value))}
              placeholder="Ex: 65"
              min={0}
            />
          </Field>

          <Field label="Quartos">
            <Input
              type="number"
              value={form.bedrooms}
              onChange={(e) => update("bedrooms", Number(e.target.value))}
              min={0}
              max={20}
            />
          </Field>

          <Field label="Banheiros">
            <Input
              type="number"
              value={form.bathrooms}
              onChange={(e) => update("bathrooms", Number(e.target.value))}
              min={0}
              max={20}
            />
          </Field>

          <Field label="Vagas de Garagem">
            <Input
              type="number"
              value={form.parkingSpots}
              onChange={(e) => update("parkingSpots", Number(e.target.value))}
              min={0}
              max={20}
            />
          </Field>

          <Field label="Status">
            <Select
              value={form.status ?? "disponivel"}
              onChange={(e) =>
                update("status", e.target.value as Property["status"])
              }
            >
              <option value="disponivel">Disponível</option>
              <option value="reservado">Reservado</option>
              <option value="vendido">Vendido</option>
            </Select>
          </Field>

          <div className="md:col-span-2 flex items-center gap-3 pt-2">
            <button
              type="button"
              role="switch"
              aria-checked={form.featured}
              onClick={() => update("featured", !form.featured)}
              className={`relative w-10 h-5 transition-colors duration-200 ${
                form.featured ? "bg-gold-500" : "bg-gray-200"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white transition-transform duration-200 ${
                  form.featured ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <Star
                size={14}
                className={form.featured ? "text-gold-500" : "text-gray-400"}
              />
              <span className="font-body text-sm text-gray-700">
                Exibir em destaque na Home
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Localização ── */}
      <div className="bg-white border border-gray-200 p-6">
        <h2 className="font-body text-xs font-semibold text-gray-500 uppercase tracking-[0.15em] mb-5 pb-3 border-b border-gray-100">
          Localização
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Field label="Endereço completo *" error={errors.address}>
              <Input
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="Ex: Estrada de Itapecerica, 5200, Bloco A, Apto 12"
              />
            </Field>
          </div>

          <Field label="Bairro *" error={errors.neighborhood}>
            <Input
              value={form.neighborhood}
              onChange={(e) => update("neighborhood", e.target.value)}
              placeholder="Ex: Parque Fernanda"
            />
          </Field>

          <Field label="Cidade *" error={errors.city}>
            <Input
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
            />
          </Field>

          <Field label="Estado">
            <Input
              value={form.state}
              onChange={(e) => update("state", e.target.value)}
              maxLength={2}
            />
          </Field>
        </div>
      </div>

      {/* ── Descrição ── */}
      <div className="bg-white border border-gray-200 p-6">
        <h2 className="font-body text-xs font-semibold text-gray-500 uppercase tracking-[0.15em] mb-5 pb-3 border-b border-gray-100">
          Descrição
        </h2>
        <Field label="Descrição do imóvel *" error={errors.description}>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={5}
            maxLength={2000}
            placeholder="Descreva o imóvel: características, diferenciais, o que está incluído..."
            className="w-full px-3 py-2.5 border border-gray-200 text-navy-900 text-sm font-body focus:outline-none focus:border-navy-900 transition-colors resize-none"
          />
          <p className="text-gray-400 text-xs font-body text-right mt-1">
            {form.description.length}/2000
          </p>
        </Field>
      </div>

      {/* ── Fotos (só no modo editar) ── */}
      {mode === "edit" && initialData && (
        <div className="bg-white border border-gray-200 p-6">
          <h2 className="font-body text-xs font-semibold text-gray-500 uppercase tracking-[0.15em] mb-5 pb-3 border-b border-gray-100">
            Fotos
          </h2>

          {/* Botão de upload */}
          <label
            className={`flex items-center gap-2 w-fit px-4 py-2.5 border-2 border-dashed cursor-pointer transition-colors text-sm font-body font-medium mb-5 ${
              uploading
                ? "border-gray-200 text-gray-400 cursor-not-allowed"
                : "border-gray-300 text-gray-600 hover:border-gold-400 hover:text-gold-600"
            }`}
          >
            {uploading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Upload size={15} />
            )}
            {uploading ? "Enviando..." : "Adicionar Foto"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="sr-only"
              disabled={uploading}
              onChange={handlePhotoUpload}
            />
          </label>

          {/* Grid de fotos */}
          {images.length === 0 ? (
            <p className="font-body text-sm text-gray-400">
              Nenhuma foto adicionada.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {images.map((url, i) => (
                <div key={url} className="relative group">
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <Image
                      src={url}
                      alt={`Foto ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="200px"
                      unoptimized
                    />
                    {removing === url && (
                      <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                        <Loader2 size={16} className="animate-spin text-gray-600" />
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePhotoRemove(url)}
                    disabled={removing === url}
                    className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 disabled:opacity-50"
                    title="Remover foto"
                  >
                    <X size={12} />
                  </button>

                  {i === 0 && (
                    <span className="absolute bottom-1.5 left-1.5 text-[9px] bg-navy-900/80 text-cream-50 px-1.5 py-0.5 font-body uppercase tracking-wide">
                      Capa
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          <p className="font-body text-xs text-gray-400 mt-3">
            JPG, PNG, WEBP ou AVIF · Máx 8 MB · A 1ª imagem é a capa do card.
          </p>
        </div>
      )}

      {mode === "create" && (
        <div className="bg-amber-50 border border-amber-200 px-4 py-3">
          <p className="font-body text-sm text-amber-700">
            💡 Após salvar, você poderá adicionar as fotos na tela de edição.
          </p>
        </div>
      )}

      {globalError && (
        <div className="bg-red-50 border border-red-200 px-4 py-3">
          <p className="font-body text-sm text-red-600">{globalError}</p>
        </div>
      )}

      {/* Ações */}
      <div className="flex items-center gap-3 justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-body text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft size={15} />
          Voltar
        </button>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-navy-900 text-cream-50 px-6 py-3 text-sm font-body font-medium tracking-wide hover:bg-gold-500 transition-colors duration-200 disabled:opacity-50"
        >
          {saving ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <Save size={15} />
          )}
          {saving
            ? "Salvando..."
            : mode === "create"
            ? "Cadastrar Imóvel"
            : "Salvar Alterações"}
        </button>
      </div>
    </form>
  );
}
