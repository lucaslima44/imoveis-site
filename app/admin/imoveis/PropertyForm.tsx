"use client";

import { useState, ChangeEvent, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { Property } from "@/types";
import { Save, ArrowLeft, Upload, X, Star, Loader2, GripVertical, MapPin } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/Button";

// Função para formatar valor em reais (BRL)
function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// Função para converter valor formatado para número
function parseCurrency(value: string): number {
  const cleaned = value.replace(/[R$\s.]/g, "").replace(",", ".");
  return parseFloat(cleaned) || 0;
}

// Função para formatar CEP
function formatCEP(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length > 5) {
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  }
  return digits;
}

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

  // Inicializa sempre com as imagens do imóvel (garante que não sumam)
  const [images, setImages]           = useState<string[]>(() => initialData?.images ?? []);
  const [errors, setErrors]           = useState<Partial<Record<keyof FormData, string>>>({});
  const [saving, setSaving]           = useState(false);
  const [uploading, setUploading]     = useState(false);
  const [removing, setRemoving]       = useState<string | null>(null);
  const [globalError, setGlobalError] = useState("");
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState("");

  // Estado para o campo de valor formatado (inicializa com dados existentes)
  const [priceDisplay, setPriceDisplay] = useState(
    initialData?.price ? formatCurrency(initialData.price) : ""
  );

  // Estado para o campo de CEP
  const [cepDisplay, setCepDisplay] = useState("");

  // Função para buscar endereço via CEP (API dos Correios)
  async function fetchAddressByCEP(cep: string) {
    const cleanCEP = cep.replace(/\D/g, "");
    if (cleanCEP.length !== 8) return;

    setCepLoading(true);
    setCepError("");

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
      const data = await res.json();

      if (data.erro) {
        setCepError("CEP não encontrado.");
        return;
      }

      // Preenche automaticamente os campos
      if (data.logradouro) update("address", data.logradouro);
      if (data.bairro) update("neighborhood", data.bairro);
      if (data.localidade) update("city", data.localidade);
      if (data.uf) update("state", data.uf);
    } catch {
      setCepError("Erro ao buscar CEP. Preencha manualmente.");
    } finally {
      setCepLoading(false);
    }
  }

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    // Permite apenas dígitos
    const digits = value.replace(/\D/g, "");
    const numberValue = parseFloat(digits) || 0;
    
    setPriceDisplay(formatCurrency(numberValue));
    update("price", numberValue);
  }

  function handleCEPChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = formatCEP(e.target.value);
    setCepDisplay(value);
    
    // Busca automática quando completar 8 dígitos
    if (value.replace(/\D/g, "").length === 8) {
      fetchAddressByCEP(value);
    }
  }

  // Drag-to-reorder state
  const dragIndexRef  = useRef<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);

  function update(field: keyof FormData, value: unknown) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate(): boolean {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!form.title.trim())        errs.title        = "Título obrigatório.";
    if (!form.address.trim())      errs.address      = "Endereço obrigatório.";
    if (!form.neighborhood.trim()) errs.neighborhood = "Bairro obrigatório.";
    if (!form.city.trim())         errs.city         = "Cidade obrigatória.";
    if (!form.description.trim())  errs.description  = "Descrição obrigatória.";
    if (Number(form.price) <= 0)   errs.price        = "Valor deve ser maior que zero.";
    if (Number(form.area)  <= 0)   errs.area         = "Área deve ser maior que zero.";
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
          images,          // sempre envia as imagens atuais (incluindo ordem)
          featured: form.featured === true,
          price: Number(form.price),
          area: Number(form.area),
          bedrooms: Number(form.bedrooms),
          bathrooms: Number(form.bathrooms),
          parkingSpots: Number(form.parkingSpots),
        }),
      });

      if (res.ok) {
        window.location.href = "/admin/imoveis";
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
    const files = e.target.files;
    if (!files || files.length === 0 || !initialData?.id) return;

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    const validFiles: File[] = [];
    const errors: string[] = [];

    if (files.length > 12) {
      alert("Máximo de 12 fotos por vez.");
      e.target.value = "";
      return;
    }

    for (const file of Array.from(files)) {
      if (!allowed.includes(file.type)) {
        errors.push(`${file.name}: formato não permitido`);
        continue;
      }
      if (file.size > 7 * 1024 * 1024) {
        errors.push(`${file.name}: excede 7 MB`);
        continue;
      }
      validFiles.push(file);
    }

    if (errors.length > 0) {
      alert(`Alguns arquivos foram ignorados:\n${errors.join("\n")}`);
    }

    if (validFiles.length === 0) {
      e.target.value = "";
      return;
    }

    setUploading(true);

    // Envia cada foto individualmente
    for (const file of validFiles) {
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
          const d = await res.json();
          alert(`Erro ao enviar ${file.name}: ${d.error}`);
        }
      } catch {
        alert(`Erro de conexão ao enviar ${file.name}.`);
      }
    }

    setUploading(false);
    e.target.value = "";
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

  // ── Drag-to-reorder handlers ──────────────────────────────────────────────
  function handleDragStart(index: number) {
    dragIndexRef.current = index;
  }

  function handleDragEnter(index: number) {
    setDragOver(index);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault(); // necessário para permitir drop
  }

  function handleDrop(dropIndex: number) {
    const dragIndex = dragIndexRef.current;
    if (dragIndex === null || dragIndex === dropIndex) {
      setDragOver(null);
      dragIndexRef.current = null;
      return;
    }
    const newImages = [...images];
    const [dragged] = newImages.splice(dragIndex, 1);
    newImages.splice(dropIndex, 0, dragged);
    setImages(newImages);
    dragIndexRef.current = null;
    setDragOver(null);
  }

  function handleDragEnd() {
    dragIndexRef.current = null;
    setDragOver(null);
  }
  // ─────────────────────────────────────────────────────────────────────────

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
              onChange={(e) => {
                const value = Number(e.target.value) || 0;
                update("price", value);
                setPriceDisplay(formatCurrency(value));
              }}
              placeholder="Ex: 180000"
              min={0}
              step="0.01"
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
            <Field label="CEP" error={cepError}>
              <div className="relative">
                <Input
                  type="text"
                  value={cepDisplay}
                  onChange={handleCEPChange}
                  placeholder="Ex: 01234-567"
                  maxLength={9}
                />
                {cepLoading && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Loader2 size={16} className="animate-spin text-gray-400" />
                  </div>
                )}
                {!cepLoading && cepDisplay.replace(/\D/g, "").length === 8 && !cepError && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <MapPin size={16} className="text-green-500" />
                  </div>
                )}
              </div>
              <p className="text-gray-400 text-xs font-body mt-1">
                Digite o CEP para buscar automaticamente o endereço
              </p>
            </Field>
          </div>

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
          <h2 className="font-body text-xs font-semibold text-gray-500 uppercase tracking-[0.15em] mb-1 pb-3 border-b border-gray-100">
            Fotos
          </h2>
          <p className="font-body text-xs text-gray-400 mb-4 pt-3">
            Arraste as fotos para reordenar · A 1ª imagem é a capa do card.
          </p>

          {/* Botão de upload múltiplo */}
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
            {uploading ? "Enviando..." : "Adicionar Fotos"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              multiple
              className="sr-only"
              disabled={uploading}
              onChange={handlePhotoUpload}
            />
          </label>

          {/* Grid de fotos com drag-to-reorder */}
          {images.length === 0 ? (
            <p className="font-body text-sm text-gray-400">
              Nenhuma foto adicionada.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {images.map((url, i) => (
                <div
                  key={url}
                  draggable
                  onDragStart={() => handleDragStart(i)}
                  onDragEnter={() => handleDragEnter(i)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(i)}
                  onDragEnd={handleDragEnd}
                  className={`relative group cursor-grab active:cursor-grabbing transition-all duration-150 ${
                    dragOver === i
                      ? "ring-2 ring-gold-400 scale-[0.97] opacity-80"
                      : ""
                  }`}
                >
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <Image
                      src={url}
                      alt={`Foto ${i + 1}`}
                      fill
                      className="object-cover pointer-events-none"
                      sizes="200px"
                      unoptimized
                    />
                    {removing === url && (
                      <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                        <Loader2 size={16} className="animate-spin text-gray-600" />
                      </div>
                    )}
                  </div>

                  {/* Handle de drag (canto superior esquerdo) */}
                  <div className="absolute top-1.5 left-1.5 w-6 h-6 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical size={12} />
                  </div>

                  {/* Botão remover (canto superior direito) */}
                  <button
                    type="button"
                    onClick={() => handlePhotoRemove(url)}
                    disabled={removing === url}
                    className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 disabled:opacity-50"
                    title="Remover foto"
                  >
                    <X size={12} />
                  </button>

                  {/* Badge de posição */}
                  {i === 0 ? (
                    <span className="absolute bottom-1.5 left-1.5 text-[9px] bg-navy-900/80 text-cream-50 px-1.5 py-0.5 font-body uppercase tracking-wide">
                      Capa
                    </span>
                  ) : (
                    <span className="absolute bottom-1.5 left-1.5 text-[9px] bg-black/40 text-white px-1.5 py-0.5 font-body opacity-0 group-hover:opacity-100 transition-opacity">
                      {i + 1}ª foto
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          <p className="font-body text-xs text-gray-400 mt-3">
            JPG, PNG, WEBP ou AVIF · Máx 7 MB por foto · Máx 12 fotos por vez · Salve após reordenar para confirmar.
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
        <Button
          type="button"
          onClick={() => router.back()}
          variant="ghost"
          leftIcon={<ArrowLeft size={15} />}
        >
          Voltar
        </Button>

        <Button
          type="submit"
          loading={saving}
          leftIcon={<Save size={15} />}
        >
          {saving
            ? "Salvando..."
            : mode === "create"
            ? "Cadastrar Imóvel"
            : "Salvar Alterações"}
        </Button>
      </div>
    </form>
  );
}
